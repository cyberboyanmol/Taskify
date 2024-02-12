"use server";
import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/prisma-client";
import { revalidatePath } from "next/cache";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { UpdateCardOrder } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const {
    items,
    boardId,
    previousListTitle,
    newListTitle,
    movedCardId,
    movedCardTitle,
    boardTitle,
  } = data;
  let updatedCards;

  console.log(previousListTitle, newListTitle, movedCardId);
  try {
    const transaction = items.map((card) =>
      db.card.update({
        where: {
          id: card.id,
          list: {
            boardId,
            board: {
              orgId,
            },
          },
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      })
    );

    updatedCards = await db.$transaction(transaction);
    // previoud list title and new list title

    if (movedCardId) {
      await createAuditLog({
        entityId: movedCardId as string,
        entityTitle: [
          movedCardTitle,
          newListTitle,
          previousListTitle,
          boardTitle,
          boardId,
        ] as string[],
        action: ACTION.MOVED,
        entityType: ENTITY_TYPE.CARD,
      });
    }
  } catch (error) {
    return {
      error: "Failed to reorder.",
    };
  }
  revalidatePath(`/b/${boardId}`);
  return {
    data: updatedCards,
  };
};

export const updateCardOrder = CreateSafeAction(UpdateCardOrder, handler);
