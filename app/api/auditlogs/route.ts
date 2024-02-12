import { db } from "@/lib/prisma-client";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { userId, orgId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!orgId) {
      redirect("/select-org");
    }

    const auditLogs = await db.auditLog.findMany({
      where: {
        orgId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(auditLogs);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
