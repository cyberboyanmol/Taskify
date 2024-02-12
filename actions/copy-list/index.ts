"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/prisma-client";
import { revalidatePath } from "next/cache";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { CopyList } from "./schema";
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
  let list;
  try {
    const listToCopy = await db.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      include: {
        cards: true,
      },
    });

    if (!listToCopy) {
      return { error: "list not found 😔" };
    }

    const lastList = await db.list.findFirst({
      where: {
        boardId,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });

    const newListOrder = lastList ? lastList.order + 1 : 1;
    list = await db.list.create({
      data: {
        boardId: listToCopy.boardId,
        title: `${listToCopy.title} - Copy`,
        order: newListOrder,
        cards: {
          createMany: {
            data: listToCopy.cards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order,
              parentCardId: card.id,
            })),
          },
        },
      },
      include: {
        cards: true,
        board: true,
      },
    });

    await createAuditLog({
      entityId: list.id,
      entityType: ENTITY_TYPE.LIST,
      entityTitle: [list.title, listToCopy.title, list.board.title, boardId],
      action: ACTION.COPIED,
    });

    // new List Name
    const newListTitle = list.title;
    const boardTitle = list.board.title;

    // creating the logs for all new copied cards
    list.cards.map(async (card) => {
      await createAuditLog({
        entityId: card.id,
        entityType: ENTITY_TYPE.CARD,
        action: ACTION.COPIED,
        entityTitle: [
          card.title,
          card.parentCardId as string,
          newListTitle,
          boardTitle,
          boardId,
        ],
      });
    });
  } catch (error) {
    return {
      error: "Failed to copy list..",
    };
  }

  revalidatePath(`/b/${boardId}`);
  return { data: list };
};

export const copyList = CreateSafeAction(CopyList, handler);
