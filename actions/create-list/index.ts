"use server";
import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/prisma-client";
import { revalidatePath } from "next/cache";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { CreateList } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, boardId } = data;
  let list;

  try {
    const board = await db.board.findUnique({
      where: {
        id: boardId,
        orgId,
      },
    });
    if (!board) {
      return { error: "Board not found 👎🏻" };
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

    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await db.list.create({
      data: {
        title,
        boardId,
        order: newOrder,
      },
      include: {
        board: true,
      },
    });

    await createAuditLog({
      entityId: list.id,
      entityTitle: [list.title, list.board.title, boardId],
      action: ACTION.CREATE,
      entityType: ENTITY_TYPE.LIST,
    });
  } catch (error) {
    return {
      error: "Failed to create list 😔.",
    };
  }

  revalidatePath(`/b/${boardId}`);
  return {
    data: list,
  };
};

export const createList = CreateSafeAction(CreateList, handler);
