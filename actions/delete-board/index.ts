"use server";
import { auth } from "@clerk/nextjs";
import { InputType } from "./types";
import { db } from "@/lib/prisma-client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { DeleteBoard } from "./schema";

const handler = async (data: InputType) => {
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

  revalidatePath(`/organization/${orgId}`);
  redirect(`/organization/${orgId}`);
};

export const deleteBoard = CreateSafeAction(DeleteBoard, handler);
