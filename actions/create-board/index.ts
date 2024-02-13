"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/prisma-client";
import { revalidatePath } from "next/cache";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { hasAvailableCount, incrementAvailableCount } from "@/lib/org-limit";
import { checkStripeSubscription } from "@/lib/stripe-subscription";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  const isPro = await checkStripeSubscription();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const canCreateBoard = await hasAvailableCount();

  if (!canCreateBoard && !isPro) {
    return {
      error:
        "You have reached your limit of free boards. Please upgrade to create more.",
    };
  }
  const { title, image } = data;
  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split("|");

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageLinkHTML ||
    !imageUserName
  ) {
    return {
      error: "Missing Fields. Failed to create board.",
    };
  }
  let board;
  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName,
      },
    });

    if (!isPro) {
      await incrementAvailableCount();
    }
    await createAuditLog({
      entityTitle: [board.title, board.id],
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
    });
  } catch (err) {
    return {
      error: "Failed to create board",
    };
  }

  revalidatePath(`/b/${board.id}`);
  return { data: board };
};

export const createBoard = CreateSafeAction(CreateBoard, handler);
