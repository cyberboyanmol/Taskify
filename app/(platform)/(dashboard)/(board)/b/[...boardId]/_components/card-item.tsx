import { cn } from "@/lib/utils";
import { Draggable } from "@hello-pangea/dnd";
// import { Draggable } from "react-beautiful-dnd";
import { Card } from "@prisma/client";

interface CardItemProps {
  index: number;
  data: Card;
}

export const CardItem = ({ index, data }: CardItemProps) => {
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided, snapshot) => (
        <>
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={cn(
              "truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm  bg-white rounded-md shadow-card",
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
