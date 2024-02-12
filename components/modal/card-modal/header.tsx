import { updateCard } from "@/actions/update-card";
import { FormTextArea } from "@/components/form/form-textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { Layout } from "lucide-react";
import { useParams } from "next/navigation";
import {
  ElementRef,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface HeaderProps {
  data: CardWithList;
}

export const Header = ({ data }: HeaderProps) => {
  const queryClient = useQueryClient();
  const params = useParams();
  const textAreaRef = useRef<ElementRef<"textarea">>(null);
  const formRef = useRef<ElementRef<"form">>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(data.title);

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const { execute } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });
      toast.success(`Renamed to "${data.title}"`);
      setTitle(data.title);
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const onTextAreaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
      disableEditing();
    }
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };
  const onOutSideClick = () => {
    disableEditing();
    formRef.current?.requestSubmit();
  };
  useOnClickOutside(textAreaRef, onOutSideClick);
  useOnClickOutside(formRef, onOutSideClick);
  useEventListener("keydown", onKeyDown);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textAreaRef.current?.focus();
    });
  };
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = params.boardId[0] as string;
    // console.log({ title, boardId });
    execute({
      id: data.id,
      boardId,
      title,
    });
  };
  return (
    <div className="flex items-start gap-x-3 mb-6  w-full">
      <Layout className="h-6 w-6 mt-1 text-neutral-700" />
      <div className="w-full">
        {isEditing ? (
          <form ref={formRef} action={onSubmit}>
            <FormTextArea
              id="title"
              ref={textAreaRef}
              onBlur={onBlur}
              onKeyDown={onTextAreaKeyDown}
              className="font-semibold  h-auto  text-xl px-1 py-0.5 text-neutral-700 bg-transparent  border-transparent relative -left-1.5 w-[95%]
            focus-visible:bg-white focus-visible:border-black focus-visible:border-2 mb-1.5 modalInputScrollbar
             shadow-none
            "
              defaultValue={title}
            />
          </form>
        ) : (
          <div
            role="button"
            onClick={enableEditing}
            className="font-semibold   text-xl px-1 py-0.5 text-neutral-700    relative -left-1.5 w-[95%] mb-1.5 
         "
          >
            {title}
          </div>
        )}
        <p className="text-sm text-muted-foreground">
          in list <span className="underline">{data.list.title}</span>
        </p>
      </div>
    </div>
  );
};

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="flex items-start gap-x-3 mb-6 w-full">
      <Skeleton className="h-6 w-6 mt-2 bg-neutral-200" />
      <div>
        <Skeleton className="w-24 h-6 mb-1 bg-neutral-200" />
        <Skeleton className="w-12 h-4 bg-neutral-200" />
      </div>
    </div>
  );
};
