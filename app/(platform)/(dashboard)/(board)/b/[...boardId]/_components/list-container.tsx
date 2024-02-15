"use client";
import { CardWithList, ListWithCards } from "@/types";
import { Card, List } from "@prisma/client";
import { ListFrom } from "./list-form";
import { useEffect, useMemo, useState } from "react";
import { ListItem } from "./list-item";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { cn, reorder } from "@/lib/utils";
import { isEmpty } from "lodash";
import { useAction } from "@/hooks/use-action";
import { updateCardOrder } from "@/actions/update-card-order";
import { toast } from "sonner";
import { updateListOrder } from "@/actions/update-list-order";
import { useMediaQuery } from "usehooks-ts";

import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { CardItem } from "./card-item";

interface ListContainerProps {
  boardId: string;
  data: ListWithCards[];
}

export const ListContainer = ({ boardId, data }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState<ListWithCards[]>(data);
  const [activeList, setActiveList] = useState<ListWithCards | null>(null);
  const [activeCard, setActiveCard] = useState<Card | null>(null);
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
  // const onDragEndHandler = (result: any) => {
  //   const { destination, source, type } = result;

  //   if (!destination) {
  //     return;
  //   }

  //   // if dropped in the same position

  //   if (
  //     destination.droppableId === source.droppableId &&
  //     destination.index === source.index
  //   ) {
  //     return;
  //   }

  //   // user move a list
  //   if (type === "list") {
  //     const items = reorder(orderedData, source.index, destination.index).map(
  //       (item, index) => ({ ...item, order: index })
  //     );

  //     setOrderedData(items);
  //     //   server implementation
  //     executeUpdateListOrder({
  //       boardId,
  //       items,
  //     });
  //   }
  //   // user move a card
  //   if (type === "card") {
  //     let newOrderedData = [...orderedData];

  //     const sourceList = newOrderedData.find(
  //       (list) => list.id === source.droppableId
  //     );
  //     const destinationList = newOrderedData.find(
  //       (list) => list.id === destination.droppableId
  //     );
  //     // Source and destination list
  //     if (!sourceList || !destinationList) {
  //       return;
  //     }
  //     // Check if cards exists on the sourceList
  //     if (!sourceList.cards) {
  //       sourceList.cards = [];
  //     } // Check if cards exists on the destinationList
  //     if (!destinationList.cards) {
  //       destinationList.cards = [];
  //     }
  //     // Moving the card in the same list
  //     if (source.droppableId === destination.droppableId) {
  //       const reorderedCards = reorder(
  //         sourceList.cards,
  //         source.index,
  //         destination.index
  //       );

  //       reorderedCards.forEach((card, index) => {
  //         card.order = index;
  //       });
  //       sourceList.cards = reorderedCards;
  //       setOrderedData(newOrderedData); // server implementation
  //       executeUpdateCardOrder({
  //         boardId,
  //         items: reorderedCards,
  //       });
  //     } else {
  //       // User moves the card to another list

  //       const [movedCard] = sourceList.cards.splice(source.index, 1);

  //       // Assign the new listId to the moved card
  //       movedCard.listId = destination.droppableId;

  //       destinationList.cards.splice(destination.index, 0, movedCard);
  //       // Update the order for each card in the source list
  //       sourceList.cards.forEach((card, index) => {
  //         card.order = index;
  //       });
  //       // Update the order for each card in the destination list
  //       destinationList.cards.forEach((card, index) => {
  //         card.order = index;
  //       });
  //       setOrderedData(newOrderedData);
  //       // server implementation
  //       executeUpdateCardOrder({
  //         boardId,
  //         items: destinationList.cards,
  //         previousListTitle: sourceList.title,
  //         movedCardId: movedCard.id,
  //         newListTitle: destinationList.title,
  //         movedCardTitle: movedCard.title,
  //         boardTitle: destinationList.board.title,
  //       });
  //     }
  //   }
  // };

  // console.log(data);
  const matches = useMediaQuery("(min-width: 1024px)");
  // console.log(matches);

  const listsId = useMemo(
    () => orderedData.map((list) => list.id),
    [orderedData]
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  function findValueofItems(id: UniqueIdentifier, type: string) {
    if (type === "list") {
      return orderedData.find((list) => list.id === id);
    }
    if (type === "card") {
      return orderedData.find((list) =>
        list.cards.map((card) => card.id === id)
      );
    }
  }

  const onDragStart = (event: DragStartEvent) => {
    console.log(event);
    console.log("onDragStart");

    if (event.active.data.current?.type === "list") {
      setActiveList(event.active.data.current?.list);
      return;
    }

    if (event.active.data.current?.type === "card") {
      setActiveCard(event.active.data.current?.card);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveList(null);
    setActiveCard(null);
    console.log(event);
    console.log("dragEnd event");
    // handling list sorting

    if (
      active.data.current?.type === "list" &&
      over?.data.current?.type == "list" &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // find the index of active and over list
      const activeListIndex = orderedData.findIndex(
        (list) => list.id == active.id
      );
      const overListIndex = orderedData.findIndex(
        (list) => list.id === over.id
      );

      // swap the active list and over list index
      let newOrderedData = [...orderedData];

      newOrderedData = arrayMove(
        newOrderedData,
        activeListIndex,
        overListIndex
      );
      setOrderedData(newOrderedData);
      // server action for list
    }

    // handling the card sorting

    if (
      active.data.current?.type === "card" &&
      over?.data.current?.type == "card" &&
      active &&
      over &&
      active.id !== over.id
    ) {
      const activeList = findValueofItems(active.id, "card");
      const overList = findValueofItems(over.id, "card");

      // if the active or over list if not found return
      if (!activeList || !overList) return;
      // Find the index of the active and over list
      const activeListIndex = orderedData.findIndex(
        (list) => list.id === activeList.id
      );
      const overListIndex = orderedData.findIndex(
        (list) => list.id === overList.id
      );

      // Find the index of the active and over card

      const activeCardIndex = activeList.cards.findIndex(
        (card) => card.id === active.id
      );

      const overCardIndex = activeList.cards.findIndex(
        (card) => card.id === over.id
      );

      //  card in same list
      if (activeListIndex === overListIndex) {
        let newOrderedData = [...orderedData];
        newOrderedData[activeListIndex].cards = arrayMove(
          newOrderedData[activeListIndex].cards,
          activeCardIndex,
          overCardIndex
        );
        setOrderedData(newOrderedData);
        // server action
      } else {
        // in different list
        let newOrderedData = [...orderedData];
        const [removeCard] = newOrderedData[activeListIndex].cards.splice(
          activeCardIndex,
          1
        );

        newOrderedData[overListIndex].cards.splice(
          overCardIndex,
          0,
          removeCard
        );

        setOrderedData(newOrderedData);
        // server action
      }
    }

    if (
      active.data.current?.type === "card" &&
      over?.data.current?.type == "list" &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // find the active and over list
      const activeList = findValueofItems(active.id, "card");
      const overList = findValueofItems(active.id, "list");
      // If the active or over list is not found, return
      if (!activeList || !overList) return;
      // Find the index of the active and over list
      const activeListIndex = orderedData.findIndex(
        (list) => list.id === activeList.id
      );
      const overListIndex = orderedData.findIndex(
        (list) => list.id === overList.id
      );

      // find the active card index
      const activeCardIndex = activeList.cards.findIndex(
        (card) => card.id === active.id
      );

      let newOrderedData = [...orderedData];
      const [removeCard] = newOrderedData[activeListIndex].cards.splice(
        activeCardIndex,
        1
      );
      newOrderedData[overListIndex].cards.push(removeCard);
      setOrderedData(newOrderedData);
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    console.log(event);
    console.log("onDragOver");
    // handling items sorting
    const { active, over } = event;

    if (
      active.data.current?.type === "card" &&
      over?.data.current?.type === "card" &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // find the active list and over list
      const activeList = findValueofItems(active.id, "card");
      const overList = findValueofItems(over.id, "card");
      // if the active or over list is not found retun
      if (!activeList || !overList) return;

      // find the index of the active list over list

      const activeListIndex = orderedData.findIndex(
        (list) => list.id === activeList.id
      );
      const overListIndex = orderedData.findIndex(
        (list) => list.id === overList.id
      );

      // find the index of active and over item

      const activeCardIndex = activeList.cards.findIndex(
        (card) => card.id === active.id
      );
      const overCardIndex = overList.cards.findIndex(
        (card) => card.id === over.id
      );
      // In the same list
      if (activeListIndex === overListIndex) {
        let newOrderedData = [...orderedData];

        newOrderedData[activeListIndex].cards = arrayMove(
          newOrderedData[activeListIndex].cards,
          activeCardIndex,
          overCardIndex
        );

        setOrderedData(newOrderedData);
        // server action
      } else {
        let newOrderedData = [...orderedData];
        const [removeCard] = newOrderedData[activeListIndex].cards.splice(
          activeCardIndex,
          1
        );

        newOrderedData[overListIndex].cards.splice(
          overCardIndex,
          0,
          removeCard
        );

        setOrderedData(newOrderedData);
      }
    }
    // handling card drop into a list

    if (
      active.data.current?.type === "card" &&
      over?.data.current?.type === "list" &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // find the active and over list
      const activeList = findValueofItems(active.id, "card");
      const overList = findValueofItems(over.id, "list");

      // if the active or over list is not found return
      if (!activeList || !overList) return;

      // find the index of active and over list
      const activeListIndex = orderedData.findIndex(
        (list) => list.id === activeList.id
      );
      const overListIndex = orderedData.findIndex(
        (list) => list.id === overList.id
      );

      // find the index  of active card on active list

      const activeCardIndex = activeList.cards.findIndex(
        (card) => card.id === active.id
      );

      // Remove the active card from the active list and add it to the over list
      let newOrderedData = [...orderedData];

      const [removeCard] = newOrderedData[activeListIndex].cards.splice(
        activeCardIndex,
        1
      );

      newOrderedData[overListIndex].cards.push(removeCard);
      setOrderedData(newOrderedData);
    }
  };

  const onDragCancel = () => {
    setActiveCard(null);
    setActiveList(null);
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    // Handling Container Sorting
    if (
      active?.data.current?.type === "list" &&
      over?.data.current?.type === "list" &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the index of the active and over container
      const activeContainerIndex = orderedData.findIndex(
        (container) => container.id === active.id
      );
      const overContainerIndex = orderedData.findIndex(
        (container) => container.id === over.id
      );
      // Swap the active and over container
      let newItems = [...orderedData];
      newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex);
      setOrderedData(newItems);
    }

    // Handling item Sorting
    if (
      active?.data.current?.type === "card" &&
      over?.data.current?.type === "card" &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueofItems(active.id, "card");
      const overContainer = findValueofItems(over.id, "card");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;
      // Find the index of the active and over container
      const activeContainerIndex = orderedData.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = orderedData.findIndex(
        (container) => container.id === overContainer.id
      );
      // Find the index of the active and over item
      const activeitemIndex = activeContainer.cards.findIndex(
        (item) => item.id === active.id
      );
      const overitemIndex = overContainer.cards.findIndex(
        (item) => item.id === over.id
      );

      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...orderedData];
        newItems[activeContainerIndex].cards = arrayMove(
          newItems[activeContainerIndex].cards,
          activeitemIndex,
          overitemIndex
        );
        setOrderedData(newItems);
      } else {
        // In different containers
        let newItems = [...orderedData];
        const [removeditem] = newItems[activeContainerIndex].cards.splice(
          activeitemIndex,
          1
        );
        newItems[overContainerIndex].cards.splice(
          overitemIndex,
          0,
          removeditem
        );
        setOrderedData(newItems);
      }
    }
    // Handling item dropping into Container
    if (
      active?.data.current?.type === "card" &&
      over?.data.current?.type === "list" &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueofItems(active.id, "card");
      const overContainer = findValueofItems(over.id, "list");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;
      // Find the index of the active and over container
      const activeContainerIndex = orderedData.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = orderedData.findIndex(
        (container) => container.id === overContainer.id
      );
      // Find the index of the active and over item
      const activeitemIndex = activeContainer.cards.findIndex(
        (item) => item.id === active.id
      );
      // const activeitemIndex = activeContainer.items.findIndex(
      //   (item) => item.id === active.id
      // );

      let newItems = [...orderedData];
      const [removeditem] = newItems[activeContainerIndex].cards.splice(
        activeitemIndex,
        1
      );
      newItems[overContainerIndex].cards.push(removeditem);
      setOrderedData(newItems);
    }
    setActiveList(null);
    setActiveCard(null);
  }

  const handleDragMove = (event: DragMoveEvent) => {
    const { active, over } = event;

    // Handle Items Sorting
    if (
      active.data.current?.type === "card" &&
      over?.data.current?.type === "card" &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active container and over container
      const activeContainer = findValueofItems(active.id, "card");
      const overContainer = findValueofItems(over.id, "card");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = orderedData.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = orderedData.findIndex(
        (container) => container.id === overContainer.id
      );

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.cards.findIndex(
        (item) => item.id === active.id
      );
      const overitemIndex = overContainer.cards.findIndex(
        (item) => item.id === over.id
      );
      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...orderedData];
        newItems[activeContainerIndex].cards = arrayMove(
          newItems[activeContainerIndex].cards,
          activeitemIndex,
          overitemIndex
        );

        setOrderedData(newItems);
      } else {
        // In different containers
        let newItems = [...orderedData];
        const [removeditem] = newItems[activeContainerIndex].cards.splice(
          activeitemIndex,
          1
        );
        newItems[overContainerIndex].cards.splice(
          overitemIndex,
          0,
          removeditem
        );
        setOrderedData(newItems);
      }
    }

    // Handling Item Drop Into a Container
    if (
      active.data.current?.type === "card" &&
      over?.data.current?.type === "list" &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueofItems(active.id, "card");
      const overContainer = findValueofItems(over.id, "list");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = orderedData.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = orderedData.findIndex(
        (container) => container.id === overContainer.id
      );

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.cards.findIndex(
        (item) => item.id === active.id
      );

      // Remove the active item from the active container and add it to the over container
      let newItems = [...orderedData];
      const [removeditem] = newItems[activeContainerIndex].cards.splice(
        activeitemIndex,
        1
      );
      newItems[overContainerIndex].cards.push(removeditem);
      setOrderedData(newItems);
    }
  };
  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={handleDragEnd}
      onDragMove={handleDragMove}
      // onDragCancel={onDragCancel}
    >
      <div
        className={cn(
          "h-full px-2 w-full overflow-x-auto",
          !matches ? "overflow-x-auto" : ""
        )}
      >
        <ol className="flex gap-x-3 h-full  list-none ">
          <SortableContext
            strategy={horizontalListSortingStrategy}
            items={listsId}
          >
            {orderedData.map((list) => (
              <ListItem key={list.id} data={list}>
                <SortableContext
                  strategy={verticalListSortingStrategy}
                  items={list.cards.map((card) => card.id)}
                >
                  {list.cards.map((card) => (
                    <CardItem key={card.id} data={card} />
                  ))}
                </SortableContext>
              </ListItem>
            ))}
          </SortableContext>
          <ListFrom />
          <div className="flex-shrink-0 w-1" />
        </ol>
      </div>
      {/* {createPortal( */}
      {/* <DragOverlay>
        {activeList && <ListItem key={activeList.id} data={activeList} />}
        {activeCard && <CardItem key={activeCard.id} data={activeCard} />}
      </DragOverlay> */}
      ,
      {/* //   document.body
      // )} */}
    </DndContext>
  );
};
