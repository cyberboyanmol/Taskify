"use server";
import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/prisma-client";
import { revalidatePath } from "next/cache";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { DeleteCard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId } = data;

  let card;
  try {
    card = await db.card.delete({
      where: {
        id,
        list: {
          boardId,
          board: {
            orgId,
          },
        },
      },
      include: {
        list: {
          include: {
            board: true,
          },
        },
      },
    });

    await createAuditLog({
      entityId: card.id,
      entityTitle: [
        card.title,
        card.list.title,
        card.list.board.title,
        boardId,
      ],
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.DELETE,
    });
  } catch (error) {
    return {
      error: "Failed to delete card.",
    };
  }

  revalidatePath(`/b/${boardId}`);
  return { data: card };
};

export const deleteCard = CreateSafeAction(DeleteCard, handler);
