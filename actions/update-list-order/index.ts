"use server";
import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/prisma-client";
import { revalidatePath } from "next/cache";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { UpdateListOrder } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { items, boardId } = data;
  let updatedLists;

  try {
    const transaction = items.map((list) =>
      db.list.update({
        where: {
          id: list.id,
          boardId,
          board: {
            orgId,
          },
        },
        data: {
          order: list.order,
        },
      })
    );

    updatedLists = await db.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to reorder.",
    };
  }
  revalidatePath(`/b/${boardId}`);
  return {
    data: updatedLists,
  };
};

export const updateListOrder = CreateSafeAction(UpdateListOrder, handler);
