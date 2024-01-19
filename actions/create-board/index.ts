"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/prisma-client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();
  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title } = data;

  let board;
  try {
    board = await db.board.create({
      data: {
        title,
      },
    });
  } catch (err) {
    return {
      error: "Failed to create board",
    };
  }
};
