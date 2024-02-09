"use server";
import { auth } from "@clerk/nextjs";
import { ReturnType, InputType } from "./types";
import { db } from "@/lib/prisma-client";
import { revalidatePath } from "next/cache";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { UpdateBoard } from "./schema";

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
    } catch (error) {
      return {
        error: "Failed to update board image.",
      };
    }
  }
  revalidatePath(`/b/${id}`);
  return { data: board };
};

export const updateBoard = CreateSafeAction(UpdateBoard, handler);
