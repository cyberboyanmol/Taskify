import { ListWithCards } from "@/types";
import { ListWrapper } from "./list-wrapper";
import { ListHeader } from "./list-header";
import { ElementRef, useRef, useState } from "react";
import { CardForm } from "./card-form";
import { cn } from "@/lib/utils";
import { CardItem } from "./card-item";
// import { Draggable, Droppable } from "react-beautiful-dnd";
import { Draggable, Droppable } from "@hello-pangea/dnd";
interface ListItemProps {
  data: ListWithCards;
  index: number;
}

export const ListItem = ({ index, data }: ListItemProps) => {
  const textAreaRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const disableEditing = () => {
    setIsEditing(false);
  };
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textAreaRef.current?.focus();
    });
  };

  const windowHeight = window.innerHeight;
  const headerHeight = 240;
  const formHeight = isEditing ? 100 : 0;
  const availableHeight = windowHeight - headerHeight - formHeight;
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided, snapshot) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={cn(
            "shrink-0 h-full w-[272px] select-none list ",
            snapshot.isDragging ? "opacity-70" : "opacity-100"
          )}
        >
          <div
            {...provided.dragHandleProps}
            className="w-full  rounded-lg bg-[#f1f2f4] shadow-md pb-2"
          >
            <ListHeader onAddCard={enableEditing} data={data} />
            <div
              style={{ maxHeight: `${availableHeight}px` }}
              className="overflow-y-auto Scrollable"
            >
              <Droppable droppableId={data.id} type="card">
                {(provided) => (
                  <ol
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={cn(
                      "mx-1 h-full px-1 py-0.5 flex flex-col gap-y-2",
                      data.cards.length > 0 ? "mt-2" : "mt-0"
                    )}
                  >
                    {data.cards.map((card, index) => (
                      <CardItem index={index} key={card.id} data={card} />
                    ))}
                    {provided.placeholder}
                  </ol>
                )}
              </Droppable>
            </div>
            <CardForm
              ref={textAreaRef}
              enableEditing={enableEditing}
              disableEditing={disableEditing}
              isEditing={isEditing}
              listId={data.id}
            />
          </div>
        </li>
      )}
    </Draggable>
  );
};
