import { db } from "@/lib/prisma-client";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";

import React from "react";
import { BoardNavbar } from "./_components/board-navbar";

export async function generateMetadata({
  params,
}: {
  params: {
    boardId: string[];
  };
}) {
  const { orgId } = auth();
  if (!orgId) {
    return {
      title: "Board",
    };
  }
  const board = await db.board.findUnique({
    where: {
      id: params.boardId[0],
      orgId,
    },
  });
  return {
    title: board?.title || "Board",
  };
}

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    boardId: string[];
  };
}) => {
  const { orgId } = auth();
  if (!orgId) {
    redirect("/select-org");
  }

  const board = await db.board.findUnique({
    where: {
      orgId,
      id: params.boardId[0],
    },
  });
  if (!board) {
    notFound();
  }
  return (
    <div className=" relative h-full">
      <div
        style={{ backgroundImage: `url(${board.imageFullUrl})` }}
        className="fixed inset-0 bg-no-repeat bg-cover bg-center "
      />
      <div className="fixed inset-0 bg-black/10" />
      <BoardNavbar data={board} />
      <main className="relative pt-28   h-full">{children}</main>
    </div>
  );
};

export default BoardIdLayout;
