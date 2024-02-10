"use server";
import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/prisma-client";
import { revalidatePath } from "next/cache";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { DeleteList } from "./schema";

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
    const isListExist = await db.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
    });

    if (!isListExist) {
      return {
        error: "List not found",
      };
    }
    list = await db.list.delete({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
    });
  } catch (error) {
    return {
      error: "Failed to delete list 👎🏻.",
    };
  }
  revalidatePath(`/b/${boardId}`);
  return { data: list };
};
export const deleteList = CreateSafeAction(DeleteList, handler);
