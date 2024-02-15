import { ListWithCards } from "@/types";
import { ListWrapper } from "./list-wrapper";
import { ListHeader } from "./list-header";
import { ElementRef, useMemo, useRef, useState } from "react";
import { CardForm } from "./card-form";
import { cn } from "@/lib/utils";
import { CardItem } from "./card-item";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, List } from "@prisma/client";
interface ListItemProps {
  data: ListWithCards;
  children: React.ReactNode;
}

export const ListItem = ({ data, children }: ListItemProps) => {
  const textAreaRef = useRef<ElementRef<"textarea">>(null);
  const cardsId = data.cards.map((card) => card.id);

  // const cardsId = useMemo(() => {
  //   return data.cards.map((card) => card.id);
  // }, [data]);
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
      type: "list",
      list: data,
    },
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  const windowHeight = window.innerHeight;
  const headerHeight = 240;
  const formHeight = isEditing ? 100 : 0;
  const availableHeight = windowHeight - headerHeight - formHeight;

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      style={style}
      className={cn("shrink-0 h-full list-none w-[272px] select-none list ")}
    >
      <div
        {...listeners}
        className="w-full  rounded-lg bg-[#f1f2f4] shadow-md pb-2"
      >
        <ListHeader onAddCard={enableEditing} data={data} />
        <div
          style={{ maxHeight: `${availableHeight}px` }}
          className="overflow-y-auto Scrollable"
        >
          <ol
            className={cn(
              "mx-1 h-full px-1 py-0.5 flex list-none flex-col gap-y-2",
              data.cards.length > 0 ? "mt-2" : "mt-0"
            )}
          >
            {children}
          </ol>
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
  );
};
