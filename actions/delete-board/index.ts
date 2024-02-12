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

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

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
