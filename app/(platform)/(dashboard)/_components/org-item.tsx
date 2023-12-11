"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Image from "next/image";

import { Activity, Layout, Settings, CreditCard } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
export type Organization = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
};

interface OrgItemProps {
  isActive: boolean;
  organization: Organization;
  isExpanded: boolean;
  onExpand: (id: string) => void;
}
export const OrgItem = ({
  isActive,
  onExpand,
  isExpanded,
  organization,
}: OrgItemProps) => {
  const routes = [
    {
      label: "Boards",
      icon: <Layout className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}`,
    },
    {
      label: "Activity",
      icon: <Activity className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: "Settings",
      icon: <Settings className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/settings`,
    },
    {
      label: "Billing",
      icon: <CreditCard className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/billing`,
    },
  ];

  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);

  const onClick = (href: string) => {
    router.push(href);
  };
  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          "flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10  transition text-start no-underline hover:no-underline",
          isActive && !isExpanded && "bg-sky-500/10  text-sky-700"
        )}
      >
        <div className="flex items-center gap-x-2 ">
          <div className="w-7 h-7 relative">
            <Image
              fill
              src={organization.imageUrl}
              className="rounded-sm object-cover"
              alt={organization.name}
            />
          </div>
          <span className="font-medium text-sm">{organization.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-neutral-700">
        {routes.map((route) => {
          return (
            <Button
              key={route.label}
              size={"sm"}
              variant={"ghost"}
              onClick={() => onClick(route.href)}
              className={cn(
                "w-full font-normal justify-start pl-10 mb-1",
                pathname === route.href && "bg-sky-500/10 text-sky-700"
              )}
            >
              {route.icon}
              {route.label}
            </Button>
          );
        })}
      </AccordionContent>
    </AccordionItem>
  );
};

OrgItem.Skeleton = function SkeletonOrgItem() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="w-10 h-10 realtive shrink-0">
        <Skeleton className="h-full w-full relative" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
};
