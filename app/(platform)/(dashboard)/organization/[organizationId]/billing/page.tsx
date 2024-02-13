import React from "react";
import { Info } from "../_components/info";
import { checkStripeSubscription } from "@/lib/stripe-subscription";
import { Separator } from "@/components/ui/separator";
import { SubscriptionButton } from "./_components/subscription-button";

const BillingPage = async () => {
  const isPro = await checkStripeSubscription();
  return (
    <div className="w-full">
      <Info isPro={isPro} />
      <Separator className="my-2" />
      <div className="w-full flex justify-center">
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  );
};

export default BillingPage;
