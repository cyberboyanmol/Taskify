"use client";
import { updateBoard } from "@/actions/update-board";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAction } from "@/hooks/use-action";
import { Board } from "@prisma/client";
import { MoreHorizontal, Trash2, Wallpaper } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { BoardBackground } from "./board-background";
import { deleteBoard } from "@/actions/delete-board";

interface BoardOptionsProps {
  data: Board;
}

export const BoardOptions = ({ data }: BoardOptionsProps) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onComplete: () => {
      toast.success("Board deleted successfully");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = () => {
    execute({ id: data.id });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="h-auto w-auto p-2 " variant={"transparent"}>
          <MoreHorizontal className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-2">
          <SheetTitle className="text-center">Menu</SheetTitle>
          <SheetDescription className="text-center">
            {" "}
            Make changes to your Board here.
          </SheetDescription>
        </SheetHeader>
        <Separator className="w-full mb-2" />
        <div className="space-y-2">
          <BoardBackground data={data} />
          <Button
            variant="ghost"
            onClick={onDelete}
            disabled={isLoading}
            className="rounded-md  w-full h-auto p-2 px-5 justify-start font-medium text-md"
          >
            <Trash2 className="w-5 h-5 mr-2" />
            Delete this board
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
