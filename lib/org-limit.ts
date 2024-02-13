import { auth } from "@clerk/nextjs";
import { db } from "./prisma-client";
import { MAX_FREE_BOARDS } from "@/constants";

export const incrementAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error("Unauthorized");
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });

  if (orgLimit) {
    await db.orgLimit.update({
      where: {
        orgId,
      },
      data: {
        count: orgLimit.count + 1,
      },
    });
  } else {
    await db.orgLimit.create({
      data: { orgId, count: 1 },
    });
  }
};

export const decrementAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error("Unauthorized");
  }
  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });

  if (orgLimit) {
    await db.orgLimit.update({
      where: { orgId },
      data: { count: orgLimit.count > 0 ? orgLimit.count - 1 : 0 },
    });
  }
};

export const hasAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error("Unauthorized");
  }
  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });

  if (!orgLimit || orgLimit.count < MAX_FREE_BOARDS) {
    return true;
  } else {
    return false;
  }
};

export const getAvailableboardCount = async () => {
  const { orgId } = auth();
  if (!orgId) {
    throw new Error("Unauthorized");
  }

  const orgLImit = await db.orgLimit.findUnique({
    where: { orgId },
  });

  if (!orgLImit) {
    return 0;
  }
  return orgLImit.count;
};
