import { useCardModalStore } from "@/hooks/use-card-modal";
import { cn } from "@/lib/utils";
import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@prisma/client";

interface CardItemProps {
  index: number;
  data: Card;
}

export const CardItem = ({ index, data }: CardItemProps) => {
  const onOpen = useCardModalStore((state) => state.onOpen);
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided, snapshot) => (
        <>
          <div
            onClick={() => onOpen(data.id)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={cn(
              " border-2 border-transparent hover:border-black py-2 px-3 text-sm  bg-white rounded-md shadow-card",
              snapshot.isDragging ? "opacity-70" : "opacity-100"
            )}
            role="button"
          >
            {data.title}
          </div>
        </>
      )}
    </Draggable>
  );
};
