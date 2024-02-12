"use client";

import { ActivityItem } from "@/components/activity-item";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { AuditLog } from "@prisma/client";
import { useParams } from "next/navigation";
export const ActivityList = () => {
  const params = useParams();

  console.log(params);
  const {
    data: auditLogs,
    isLoading,
    isFetching,
  } = useQuery<AuditLog[]>({
    queryKey: ["auditlogs"],
    queryFn: () => fetcher(`/api/auditlogs/${params.organizationId}`),
  });
  if (isLoading || isFetching) {
    return (
      <ol className="space-y-4 mt-4">
        <Skeleton className="w-[80%] h-14" />
        <Skeleton className="w-[50%] h-14" />
        <Skeleton className="w-[70%] h-14" />
        <Skeleton className="w-[80%] h-14" />
        <Skeleton className="w-[75%] h-14" />
      </ol>
    );
  }
  const windowHeight = window.innerHeight;
  const headerHeight = 190;
  const availableHeight = windowHeight - headerHeight;
  return (
    <ol
      className="space-y-4 overflow-y-scroll scrollbar-none"
      style={{ maxHeight: `${availableHeight}px` }}
    >
      <p className="hidden last:block text-xs text-center text-muted-foreground">
        No activity found in this organization
      </p>
      {auditLogs?.map((log) => (
        <ActivityItem page={true} key={log.id} data={log} />
      ))}
    </ol>
  );
};

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className="space-y-4 mt-4">
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[50%] h-14" />
      <Skeleton className="w-[70%] h-14" />
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[75%] h-14" />
    </ol>
  );
};
