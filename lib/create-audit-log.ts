import { auth, currentUser } from "@clerk/nextjs";

import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { db } from "./prisma-client";

interface AuditLogProps {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string[];
  action: ACTION;
}

export const createAuditLog = async ({
  entityId,
  entityTitle,
  entityType,
  action,
}: AuditLogProps) => {
  try {
    const { orgId } = auth();

    const user = await currentUser();

    if (!user || !orgId) {
      throw new Error("User not found!");
    }

    /*
     * Here for Card entityTitle [cardName,currentListName,previousListName]
     * Here for List entityTitle [ListName]
     * Here for Board entityTitle [BoardName]
     */ await db.auditLog.create({
      data: {
        orgId,
        entityId,
        entityType,
        entityTitle: entityTitle,
        action,
        userId: user.id,
        userImage: user?.imageUrl,
        userName: `${user?.firstName} ${user?.lastName}`,
      },
    });
  } catch (error) {
    console.log(`[AUDIT_LOG_ERROR] ${error}`);
  }
};
