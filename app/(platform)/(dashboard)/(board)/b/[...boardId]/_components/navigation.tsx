"use client";
import { Board } from "@prisma/client";
import { BoardNavbar } from "./board-navbar";
import { ElementRef, useRef, useState } from "react";
import { ChevronsLeft } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";
interface NavigationProps {
  data: Board;
  children: React.ReactNode;
}
export const Navigation = ({ data, children }: NavigationProps) => {
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [isResetting, setIsResetting] = useState(false);
  //   useEffect(() => {
  //     if (isMobile) {
  //       collapse();
  //     } else {
  //       resetWidth();
  //     }
  //   }, [isMobile]);

  //   useEffect(() => {
  //     if (isMobile) {
  //       collapse();
  //     }
  //   }, [pathname, isMobile]);

  //   const handleMouseDown = (
  //     event: React.MouseEvent<HTMLDivElement, MouseEvent>
  //   ) => {
  //     event.preventDefault();
  //     event.stopPropagation();

  //     isResizingRef.current = true;
  //     document.addEventListener("mousemove", handleMouseMove);
  //     document.addEventListener("mouseup", handleMouseUp);
  //   };

  //   const handleMouseMove = (event: MouseEvent) => {
  //     if (!isResizingRef.current) return;
  //     let newWidth = event.clientX;

  //     if (newWidth < 240) newWidth = 240;
  //     if (newWidth > 480) newWidth = 480;

  //     if (sidebarRef.current && navbarRef.current) {
  //       sidebarRef.current.style.width = `${newWidth}px`;
  //       navbarRef.current.style.setProperty("left", `${newWidth}px`);
  //       navbarRef.current.style.setProperty(
  //         "width",
  //         `calc(100% - ${newWidth}px)`
  //       );
  //     }
  //   };

  //   const handleMouseUp = () => {
  //     isResizingRef.current = false;
  //     document.removeEventListener("mousemove", handleMouseMove);
  //     document.removeEventListener("mouseup", handleMouseUp);
  //   };

  //   const resetWidth = () => {
  //     if (sidebarRef.current && navbarRef.current) {
  //       setIsCollapsed(false);
  //       setIsResetting(true);

  //       sidebarRef.current.style.width = isMobile ? "100%" : "240px";
  //       navbarRef.current.style.setProperty(
  //         "width",
  //         isMobile ? "0" : "calc(100% - 240px)"
  //       );
  //       navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
  //       setTimeout(() => setIsResetting(false), 300);
  //     }
  //   };

  //   const collapse = () => {
  //     if (sidebarRef.current && navbarRef.current) {
  //       setIsCollapsed(true);
  //       setIsResetting(true);

  //       sidebarRef.current.style.width = "0";
  //       navbarRef.current.style.setProperty("width", "100%");
  //       navbarRef.current.style.setProperty("left", "0");
  //       setTimeout(() => setIsResetting(false), 300);
  //     }
  //   };

  return (
    <div className="flex w-full h-full flex-1 items-start">
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex  w-64 flex-col z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          //   onClick={collapse}
          role="button"
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>

        <div className="w-full h-full bg-white">fhfghfghfgh</div>
        <div
          //   onMouseDown={handleMouseDown}
          //   onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "w-[calc(100%-256px)] flex flex-col h-full",
          //   isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        <BoardNavbar data={data} />
        <main className="w-full relative    h-full">{children}</main>
      </div>
    </div>
  );
};
