"use server";
import { auth } from "@clerk/nextjs";
import { ReturnType, InputType } from "./types";
import { db } from "@/lib/prisma-client";
import { revalidatePath } from "next/cache";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { UpdateBoard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, id, image } = data;

  let board;
  if (title) {
    try {
      board = await db.board.update({
        where: {
          id,
          orgId,
        },
        data: {
          title,
        },
      });
      await createAuditLog({
        entityId: board.id,
        entityTitle: [board.title, board.id, "title"],
        entityType: ENTITY_TYPE.BOARD,
        action: ACTION.UPDATE,
      });
    } catch (error) {
      return {
        error: "Failed to update board title.",
      };
    }
  }

  if (image) {
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
        error: "Missing Fields. Failed to update board image.",
      };
    }
    try {
      board = await db.board.update({
        where: {
          id,
          orgId,
        },
        data: {
          imageId,
          imageThumbUrl,
          imageFullUrl,
          imageLinkHTML,
          imageUserName,
        },
      });
      await createAuditLog({
        entityId: board.id,
        entityTitle: [board.title, board.id, "background image"],
        entityType: ENTITY_TYPE.BOARD,
        action: ACTION.UPDATE,
      });
    } catch (error) {
      return {
        error: "Failed to update board image.",
      };
    }
  }
  revalidatePath(`/board/${id}`);
  return { data: board };
};

export const updateBoard = CreateSafeAction(UpdateBoard, handler);
