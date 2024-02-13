"use server";
import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/prisma-client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { DeleteBoard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { decrementAvailableCount } from "@/lib/org-limit";
import { checkStripeSubscription } from "@/lib/stripe-subscription";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  const isPro = await checkStripeSubscription();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id } = data;

  let board;

  try {
    board = await db.board.delete({
      where: {
        id,
        orgId,
      },
    });

    if (!isPro) {
      await decrementAvailableCount();
    }
  } catch (error) {
    return {
      error: "Failed to Delete Board.",
    };
  }

  await createAuditLog({
    entityId: board.id,
    entityTitle: [board.title],
    entityType: ENTITY_TYPE.BOARD,
    action: ACTION.DELETE,
  });
  revalidatePath(`/organization/${orgId}`);
  redirect(`/organization/${orgId}`);
};

export const deleteBoard = CreateSafeAction(DeleteBoard, handler);
