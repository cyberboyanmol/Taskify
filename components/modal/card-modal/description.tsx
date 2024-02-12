import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/types";
import { AlignLeft } from "lucide-react";
import React, { ElementRef, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FormSubmit } from "@/components/form/form-submit";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.core.css";
import { useEventListener } from "usehooks-ts";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";
import { toast } from "sonner";
import { DescriptionContent } from "./descriptionContent";
import { cn } from "@/lib/utils";

interface DescriptionProps {
  data: CardWithList;
}

export const modules = {
  toolbar: {
    container: [
      [{ header: [false, 1, 2, 3, 4, 5, 6] }],
      ["bold", "italic", "underline", "blockquote", "code", "code-block"],
      [{ color: [] }],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }],
      ["link"],
    ],
  },
  clipboard: {
    matchVisual: true,
  },
};

export const Description = ({ data }: DescriptionProps) => {
  const queryClient = useQueryClient();
  const params = useParams();
  const [description, setDescription] = useState(data.description);
  const [isEditing, setIsEditing] = useState(false);
  const textAreaRef = useRef<ReactQuill | null>(null);
  const formRef = useRef<ElementRef<"form">>(null);

  const disableEditing = () => {
    setIsEditing(false);
  };
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textAreaRef.current?.focus();
    });
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      disableEditing();
    }
  };
  useEventListener("keydown", onKeyDown);

  const { execute } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });

      toast.success(`Card "${data.title}" updated`);
      disableEditing();
      setDescription(data.description);
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const onSubmit = (formData: FormData) => {
    const description = textAreaRef?.current?.value as string;
    const boardId = params.boardId[0] as string;

    console.log({ description, boardId });
    execute({
      boardId,
      id: data.id,
      description,
    });
  };

  return (
    <div className="flex  items-start gap-x-3 w-full">
      <AlignLeft
        className={cn(
          "h-6 w-6   text-neutral-700",
          description ? "mt-1" : "mt-0"
        )}
      />
      <div className="w-full">
        <div className="flex items-center justify-between   ">
          <p className="font-semibold text-neutral-700 mb-2 ">Description</p>
          {description !== "" && description && !isEditing && (
            <Button
              variant={"gray"}
              size={"sm"}
              className="text-semibold mb-2 focus:ring-transparent"
              onClick={enableEditing}
            >
              Edit
            </Button>
          )}
        </div>
        {isEditing ? (
          <form ref={formRef} action={onSubmit} className="space-y-2">
            <ReactQuill
              modules={modules}
              theme="snow"
              className="w-full mt-2 focus-visible:border-black focus-visible:border-2"
              id="description"
              placeholder="Add a more detailed description."
              defaultValue={description || undefined}
              ref={textAreaRef}
            />
            <div className="flex items-start gap-x-2">
              <FormSubmit>Save</FormSubmit>
              <Button
                type="button"
                onClick={disableEditing}
                size="sm"
                variant="ghost"
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            onClick={enableEditing}
            className="min-h-[78px] w-full bg-neutral-100 text-sm font-normal rounded-md py-3 px-4"
          >
            {description ? (
              <DescriptionContent description={description} />
            ) : (
              "Add a more detailed description.."
            )}
          </div>
        )}
      </div>
    </div>
  );
};

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-[78px]  bg-neutral-200" />
      </div>
    </div>
  );
};
