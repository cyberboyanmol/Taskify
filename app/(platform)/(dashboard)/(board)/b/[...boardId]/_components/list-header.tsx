import { updateList } from "@/actions/update-list";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { ListWithCards } from "@/types";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
import { ListOptions } from "./list-options";

interface ListHeaderProps {
  //   onAddCard: () => void;
  data: ListWithCards;
}

export const ListHeader = ({ data }: ListHeaderProps) => {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const disableEditing = () => {
    setIsEditing(false);
  };
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      //   inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };
  const onBlur = () => {
    formRef.current?.requestSubmit();
  };
  useEventListener("keydown", onKeyDown);

  const { execute, fieldErrors } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Renamed to "${data.title}"`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    if (title === data.title) {
      return disableEditing();
    }
    execute({
      title,
      boardId,
      id,
    });
    // console.log({ title, boardId, id });
  };

  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-center gap-x-2">
      {isEditing ? (
        <form ref={formRef} action={onSubmit}>
          <input hidden id={"id"} name="id" value={data.id} />
          <input hidden id="boardId" name="boardId" value={data.boardId} />
          <FormInput
            onBlur={onBlur}
            id="title"
            ref={inputRef}
            errors={fieldErrors}
            placeholder="Enter list title.."
            defaultValue={title}
            className="text-sm h-7 px-[7px] py-1 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
          />
          <button hidden type="submit"></button>
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full  text-sm px-2.5 py-1 h-7 font-medium border-transparent"
        >
          {title}
        </div>
      )}

      <ListOptions onAddCard={() => {}} data={data} />
    </div>
  );
};
