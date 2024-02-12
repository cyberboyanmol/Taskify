import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ENTITY_TYPE } from "@prisma/client";
import { db } from "@/lib/prisma-client";

export async function GET(
  request: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const auditLogs = await db.auditLog.findMany({
      where: {
        orgId,
        entityId: params.cardId,
        entityType: ENTITY_TYPE.CARD,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    return NextResponse.json(auditLogs);
  } catch (error) {
    return new NextResponse("INTERNAL ERROR", { status: 500 });
  }
}
