"use server";
import { currentUser } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { absoluteUrl } from "@/lib/utils";
import { db } from "@/lib/prisma-client";
import { stripe } from "@/lib/stripe";
import { revalidatePath } from "next/cache";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { StripeSubscription } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  const user = await currentUser();

  if (!userId || !orgId || !user) {
    return {
      error: "Unauthorized",
    };
  }
  const settingsUrl = absoluteUrl(`/organization/${orgId}`);

  let redirectUrl = "";
  try {
    const orgSubscription = await db.orgSubscription.findUnique({
      where: {
        orgId,
      },
    });

    if (orgSubscription && orgSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: orgSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });
      redirectUrl = stripeSession.url;
    } else {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
          {
            price_data: {
              currency: "USD",
              product_data: {
                name: "Orgaflow",
                description: "Unlimited boards for your organization",
              },
              unit_amount: 2000,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          orgId,
        },
      });
      redirectUrl = stripeSession.url || "";
    }
  } catch (error) {
    // console.log(error);
    return {
      error: "Something went wrong!",
    };
  }

  revalidatePath(`/organization/${orgId}`);
  return { data: redirectUrl };
};

export const stripeSubscription = CreateSafeAction(StripeSubscription, handler);
