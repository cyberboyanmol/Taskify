import { useCardModalStore } from "@/hooks/use-card-modal";
import { cn } from "@/lib/utils";
import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@prisma/client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
interface CardItemProps {
  data: Card;
}

export const CardItem = ({ data }: CardItemProps) => {
  const onOpen = useCardModalStore((state) => state.onOpen);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: data.id,
    data: {
      type: "card",
      card: data,
      listId: data.listId,
    },
    // disabled: editMode,
  });

  // const style = {
  //   transition,
  //   transform: CSS.Transform.toString(transform),
  // };

  return (
    <li
      ref={setNodeRef}
      // style={style}
      {...attributes}
      {...listeners}
      onClick={() => onOpen(data.id)}
      className={cn(
        " border-2 list-none border-transparent hover:border-black py-2 px-3 text-sm  bg-white rounded-md shadow-card"
      )}
      role="button"
    >
      {data.title}
    </li>
  );
};
