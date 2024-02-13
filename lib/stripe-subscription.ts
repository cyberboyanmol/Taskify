import { auth } from "@clerk/nextjs";
import { db } from "./prisma-client";
const DAY_IN_MILLISECONDS = 86_400_000;

export const checkStripeSubscription = async () => {
  const { orgId } = auth();
  if (!orgId) {
    return false;
  }

  const orgSubscription = await db.orgSubscription.findUnique({
    where: {
      orgId,
    },
    select: {
      stripeCurrentPeriodEnd: true,
      stripePriceId: true,
      stripeCustomerId: true,
      stripeSubscriptionId: true,
    },
  });

  if (!orgSubscription) {
    return false;
  }

  const isValid =
    orgSubscription.stripePriceId &&
    orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MILLISECONDS >
      Date.now();
  return !!isValid;
};
