import { db } from "@/lib/prisma-client";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { ListContainer } from "./_components/list-container";
import { cn } from "@/lib/utils";

interface BoardIdPageProps {
  params: {
    boardId: string[];
  };
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId[0],
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
      board: true,
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className={cn("h-full p-4  ")}>
      <ListContainer boardId={params.boardId[0]} data={lists} />
    </div>
  );
};

export default BoardIdPage;
