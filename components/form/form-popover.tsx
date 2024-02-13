"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";

import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { createBoard } from "@/actions/create-board";

import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { ElementRef, useRef } from "react";
import { useRouter } from "next/navigation";
import { FormPicker } from "./form-picker";
import { useSubscription } from "@/hooks/use-subscription-modal";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  align?: "start" | "center" | "end";
}
export const FormPopover: React.FC<FormPopoverProps> = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
}) => {
  const subscription = useSubscription();
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);
  const { fieldErrors, execute } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success("Board created!");
      closeRef.current?.click();
      router.push(`/b/${data.id}/${data.title.replaceAll(" ", "-")}`);
    },
    onError: (error) => {
      toast.error(error);
      subscription.onOpen();
    },
  });
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;
    execute({ title, image });
  };
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3 "
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4 ">
          Create board
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            variant={"ghost"}
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>

        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormPicker id="image" errors={fieldErrors} />
            <FormInput
              id="title"
              label="Board title"
              type="text"
              errors={fieldErrors}
            />
          </div>
          <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
