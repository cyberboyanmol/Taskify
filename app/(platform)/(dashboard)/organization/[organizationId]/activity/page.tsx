import React, { Suspense } from "react";
import { Info } from "../_components/info";
import { Separator } from "@/components/ui/separator";
import { ActivityList } from "./_components/activity-list";
import { checkStripeSubscription } from "@/lib/stripe-subscription";

const ActivityPage = async () => {
  const isPro = await checkStripeSubscription();
  return (
    <div className="w-full">
      <Info isPro={isPro} />
      <Separator className="my-2" />
      <Suspense fallback={<p>loading...</p>}>
        <ActivityList />
      </Suspense>
    </div>
  );
};

export default ActivityPage;
