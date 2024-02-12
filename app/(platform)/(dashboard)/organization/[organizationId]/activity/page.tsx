import React, { Suspense } from "react";
import { Info } from "../_components/info";
import { Separator } from "@/components/ui/separator";
import { ActivityList } from "./_components/activity-list";

const ActivityPage = () => {
  return (
    <div className="w-full">
      <Info isPro={false} />
      <Separator className="my-2" />
      <Suspense fallback={<p>loading...</p>}>
        <ActivityList />
      </Suspense>
    </div>
  );
};

export default ActivityPage;
