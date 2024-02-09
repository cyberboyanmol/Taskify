"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Board } from "@prisma/client";
import Image from "next/image";
import { FormPicker } from "@/components/form/form-picker";
import { FormSubmit } from "@/components/form/form-submit";
import { ElementRef, useRef } from "react";
import { useAction } from "@/hooks/use-action";
import { updateBoard } from "@/actions/update-board";
import { toast } from "sonner";

interface BoardBackgroundProps {
  data: Board;
}

export const BoardBackground = ({ data }: BoardBackgroundProps) => {
  const popovercloseRef = useRef<ElementRef<"button">>(null);

  const { fieldErrors, execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board Background updated`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const onSubmit = (formData: FormData) => {
    const image = formData.get("image") as string;
    execute({
      image,
      id: data.id,
    });
    popovercloseRef.current?.click();
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-md   w-full h-auto p-2 px-5 justify-start font-medium text-md"
        >
          <div className="relative rounded-sm mr-2 w-5 h-5">
            <Image
              fill
              src={data.imageThumbUrl}
              className="w-full rounded-sm h-full "
              alt="Board Background"
            />
          </div>
          Change Background
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start">
        <form action={onSubmit}>
          <FormPicker errors={fieldErrors} id="image" />
          <FormSubmit className="w-full">Save</FormSubmit>
        </form>
        <PopoverClose className="hidden" ref={popovercloseRef}></PopoverClose>
      </PopoverContent>
    </Popover>
  );
};
