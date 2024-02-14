"use client";
import { ListWithCards } from "@/types";
import { List } from "@prisma/client";
import { ListFrom } from "./list-form";
import { useEffect, useState } from "react";
import { ListItem } from "./list-item";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { cn, reorder } from "@/lib/utils";
import { isEmpty } from "lodash";
import { useAction } from "@/hooks/use-action";
import { updateCardOrder } from "@/actions/update-card-order";
import { toast } from "sonner";
import { updateListOrder } from "@/actions/update-list-order";
import { useMediaQuery } from "usehooks-ts";
interface ListContainerProps {
  boardId: string;
  data: ListWithCards[];
}

export const ListContainer = ({ boardId, data }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);
  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success("Card reordered🎉🎊.");
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success("List reordered🎉🎊.");
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const onDragEndHandler = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    // if dropped in the same position

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // user move a list
    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );

      setOrderedData(items);
      //   server implementation
      executeUpdateListOrder({
        boardId,
        items,
      });
    }
    // user move a card
    if (type === "card") {
      let newOrderedData = [...orderedData];

      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );
      const destinationList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );
      // Source and destination list
      if (!sourceList || !destinationList) {
        return;
      }
      // Check if cards exists on the sourceList
      if (!sourceList.cards) {
        sourceList.cards = [];
      } // Check if cards exists on the destinationList
      if (!destinationList.cards) {
        destinationList.cards = [];
      }
      // Moving the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );

        reorderedCards.forEach((card, index) => {
          card.order = index;
        });
        sourceList.cards = reorderedCards;
        setOrderedData(newOrderedData); // server implementation
        executeUpdateCardOrder({
          boardId,
          items: reorderedCards,
        });
      } else {
        // User moves the card to another list

        const [movedCard] = sourceList.cards.splice(source.index, 1);

        // Assign the new listId to the moved card
        movedCard.listId = destination.droppableId;

        destinationList.cards.splice(destination.index, 0, movedCard);
        // Update the order for each card in the source list
        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });
        // Update the order for each card in the destination list
        destinationList.cards.forEach((card, index) => {
          card.order = index;
        });
        setOrderedData(newOrderedData);
        // server implementation
        executeUpdateCardOrder({
          boardId,
          items: destinationList.cards,
          previousListTitle: sourceList.title,
          movedCardId: movedCard.id,
          newListTitle: destinationList.title,
          movedCardTitle: movedCard.title,
          boardTitle: destinationList.board.title,
        });
      }
    }
  };

  console.log(data);
  const matches = useMediaQuery("(min-width: 1024px)");
  // console.log(matches);

  return (
    <DragDropContext onDragEnd={onDragEndHandler}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided, snapshot) => (
          <div
            className={cn(
              "absolute p-4  top-0 bottom-0 left-0 right-0 overflow-x-auto  ",
              !matches ? "overflow-x-auto" : ""
            )}
          >
            <ol
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex gap-x-3 h-full  "
              data-drag-scroll-enabled="true"
              data-auto-scrollable="true"
            >
              {orderedData.map((list, index) => {
                return <ListItem key={list.id} index={index} data={list} />;
              })}
              {provided.placeholder}

              <ListFrom />
              <div className="flex-shrink-0 w-1" />
            </ol>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
