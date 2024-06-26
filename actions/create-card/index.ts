"use server";
import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/prisma-client";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { CreateCard } from "./schema";
import { revalidatePath } from "next/cache";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { title, listId, boardId } = data;

  let card;

  try {
    const list = await db.list.findUnique({
      where: {
        id: listId,
        boardId,
        board: {
          orgId,
        },
      },
      include: {
        board: true,
      },
    });
    if (!list) {
      return {
        error: "List not found",
      };
    }

    const lastCard = await db.card.findFirst({
      where: {
        id: listId,
        list: {
          boardId,
        },
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });

    const newCardOrder = lastCard ? lastCard.order + 1 : 1;
    card = await db.card.create({
      data: {
        title,
        listId,
        order: newCardOrder,
      },
    });

    await createAuditLog({
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      entityTitle: [card.title, list.title, list.board.title, boardId],
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: "Failed to create card.",
    };
  }
  revalidatePath(`/b/${boardId}`);
  return { data: card };
};

export const createCard = CreateSafeAction(CreateCard, handler);
