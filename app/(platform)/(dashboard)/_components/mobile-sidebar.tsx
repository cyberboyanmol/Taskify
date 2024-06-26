"use client";
import { useMobileSidebarStore } from "@/hooks/use-mobile-sidebar";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";
export const MobileSidebar = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, onOpen, onClose } = useMobileSidebarStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Button
        variant={"ghost"}
        size={"sm"}
        onClick={() => onOpen()}
        className="block md:hidden mr-2"
      >
        <Menu className="h-4 w-4" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side={"left"} className="p-2 pt-10 ">
          <Sidebar storageKey="mobile-sidebar-state" />
        </SheetContent>
      </Sheet>
    </>
  );
};
