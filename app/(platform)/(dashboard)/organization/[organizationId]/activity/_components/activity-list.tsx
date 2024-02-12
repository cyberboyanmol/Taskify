"use client";

import { ActivityItem } from "@/components/activity-item";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { AuditLog } from "@prisma/client";
export const ActivityList = () => {
  const {
    data: auditLogs,
    isLoading,
    isFetching,
  } = useQuery<AuditLog[]>({
    queryKey: ["auditlogs"],
    queryFn: () => fetcher(`/api/auditlogs`),
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
  return (
    <ol className="space-y-4">
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
