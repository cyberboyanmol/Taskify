import { ACTION, AuditLog, ENTITY_TYPE } from "@prisma/client";
import React from "react";
import parse from "html-react-parser";
import { useCardModalStore } from "@/hooks/use-card-modal";
import { useRouter } from "next/navigation";
interface GenerateLogMessageForCardProps {
  log: AuditLog;
}

export const GenerateLogMessageForCard = ({
  log,
}: GenerateLogMessageForCardProps) => {
  const { entityType, action, entityTitle } = log;
  const onOpen = useCardModalStore((state) => state.onOpen);
  switch (action) {
    case ACTION.CREATE:
      return ` added this ${entityType.toLowerCase()} to ${entityTitle[1].toLowerCase()}`;
    case ACTION.UPDATE:
      return ` updated this ${entityType.toLowerCase()}`;
    case ACTION.DELETE:
      return ` deleted  ${entityType.toLowerCase()} `;
    case ACTION.MOVED:
      const [cardName, currentListName, previousListName] = entityTitle;
      return ` moved this ${entityType.toLowerCase()} from ${previousListName.toLowerCase()} to ${currentListName.toLowerCase()}`;
    case ACTION.COPIED:
      const [copiedCardTitle, parentCardId, presentListName] = entityTitle;
      return (
        <>
          copied this {entityType.toLowerCase()} from
          <span
            onClick={() => onOpen(parentCardId)}
            style={{ color: "#527dff" }}
            className="hover:underline cursor-pointer"
          >
            {" "}
            {copiedCardTitle.toLowerCase()}
          </span>{" "}
          in list {presentListName.toLowerCase()}
        </>
      );
    default:
      return `perform unknown action to  ${entityType.toLowerCase()} "${entityTitle[0].toLowerCase()}"`;
  }
};

export const GenerateLogMessage = ({ log }: GenerateLogMessageForCardProps) => {
  const router = useRouter();
  const onOpen = useCardModalStore((state) => state.onOpen);
  const { action, entityTitle, entityType } = log;

  // Board logs template
  if (entityType === ENTITY_TYPE.BOARD) {
    switch (action) {
      case ACTION.CREATE:
        const [boardTitle, boardId] = entityTitle;
        return (
          <>
            create {entityType.toLowerCase()}{" "}
            <span
              onClick={() => router.push(`/b/${boardId}`)}
              style={{ color: "#527dff" }}
              className="hover:underline cursor-pointer"
            >
              {" "}
              {boardTitle}
            </span>
          </>
        );

      case ACTION.UPDATE:
        const [updatedBoardTitle, _, updatedField] = entityTitle;
        return (
          <>
            changed {entityType.toLowerCase()} {updatedField.toLowerCase()} of{" "}
            <span
              onClick={() => router.push(`/b/${log.entityId}`)}
              style={{ color: "#527dff" }}
              className="hover:underline cursor-pointer"
            >
              {updatedBoardTitle}
            </span>
          </>
        );
      case ACTION.DELETE:
        return (
          <>
            deleted {entityType.toLowerCase()}{" "}
            <span
              onClick={() => router.push(`/b/${log.entityId}`)}
              style={{ color: "#527dff" }}
              className="hover:underline cursor-pointer"
            >
              {entityTitle[0]}
            </span>
          </>
        );
    }
  }

  // List log templates
  if (entityType === ENTITY_TYPE.LIST) {
    // Board template
    if (action === ACTION.CREATE) {
      const [ListTitle, boardTitle, boardId] = entityTitle;
      return (
        <>
          create {entityType.toLowerCase()} &#34;{ListTitle}&#34; within the
          <span
            onClick={() => router.push(`/b/${boardId}`)}
            style={{ color: "#527dff" }}
            className="hover:underline cursor-pointer"
          >
            {" "}
            {boardTitle}
          </span>{" "}
          board.
        </>
      );
    }
    if (action === ACTION.UPDATE) {
      const [ListTitle, updateField, boardId, boardTitle] = entityTitle;
      return (
        <>
          renamed the {entityType.toLowerCase()} {updateField} to &#34;
          {ListTitle}&#34; within the
          <span
            onClick={() => router.push(`/b/${boardId}`)}
            style={{ color: "#527dff" }}
            className="hover:underline cursor-pointer"
          >
            {" "}
            {boardTitle}
          </span>
          board.
        </>
      );
    }
    if (action === ACTION.DELETE) {
      const [ListTitle, boardTitle, boardId] = entityTitle;
      return (
        <>
          deleted the {entityType.toLowerCase()} &#34;{ListTitle}&#34; from
          <span
            onClick={() => router.push(`/b/${boardId}`)}
            style={{ color: "#527dff" }}
            className="hover:underline cursor-pointer"
          >
            {" "}
            {boardTitle}
          </span>{" "}
          board.
        </>
      );
    }
    if (action === ACTION.COPIED) {
      const [ListTitle, listToCopyTitle, boardTitle, boardId] = entityTitle;
      return (
        <>
          copied the {entityType.toLowerCase()} &#34;{ListTitle}&#34; from{" "}
          {listToCopyTitle} in
          <span
            onClick={() => router.push(`/b/${boardId}`)}
            style={{ color: "#527dff" }}
            className="hover:underline cursor-pointer"
          >
            {" "}
            {boardTitle}
          </span>{" "}
          board.
        </>
      );
    }
  }
  // card log template
  if (entityType === ENTITY_TYPE.CARD) {
    if (action === ACTION.CREATE) {
      const [cardTitle, listTitle, boardTitle, boardId] = entityTitle;

      const onHandleCard = () => {
        router.push(`/b/${boardId}`);
        onOpen(log.entityId);
      };
      return (
        <>
          added {entityType.toLowerCase()}{" "}
          <span
            onClick={onHandleCard}
            style={{ color: "#527dff" }}
            className="hover:underline cursor-pointer"
          >
            {cardTitle}
          </span>{" "}
          in list {listTitle} in the
          <span
            onClick={() => router.push(`/b/${boardId}`)}
            style={{ color: "#527dff" }}
            className="hover:underline cursor-pointer"
          >
            {" "}
            {boardTitle}
          </span>{" "}
          board.
        </>
      );
    }
    //  update are left
    if (action === ACTION.DELETE) {
      const [cardTitle, listTitle, boardTitle, boardId] = entityTitle;
      return (
        <>
          deleted the {entityType.toLowerCase()} &#34;{cardTitle}&#34; from list{" "}
          {listTitle} from
          <span
            onClick={() => router.push(`/b/${boardId}`)}
            style={{ color: "#527dff" }}
            className="hover:underline cursor-pointer"
          >
            {" "}
            {boardTitle}
          </span>{" "}
          board.
        </>
      );
    }

    if (action === ACTION.COPIED) {
      const [cardTitle, parentCardId, newListTitle, boardTitle, boardId] =
        entityTitle;

      const onHandleNewCard = () => {
        router.push(`/b/${boardId}`);
        onOpen(log.entityId);
      };
      const onHandleCopyCard = () => {
        router.push(`/b/${boardId}`);
        onOpen(parentCardId);
      };
      return (
        <>
          copied{" "}
          <span
            onClick={onHandleNewCard}
            style={{ color: "#527dff" }}
            className="hover:underline cursor-pointer"
          >
            {cardTitle}
          </span>{" "}
          {entityType.toLowerCase()} from{" "}
          <span
            onClick={onHandleCopyCard}
            style={{ color: "#527dff" }}
            className="hover:underline cursor-pointer"
          >
            {cardTitle}
          </span>
          in list {newListTitle} in
          <span
            onClick={() => router.push(`/b/${boardId}`)}
            style={{ color: "#527dff" }}
            className="hover:underline cursor-pointer"
          >
            {" "}
            {boardTitle}
          </span>{" "}
          board.
        </>
      );
    }
    if (action === ACTION.MOVED) {
      const [
        movedCardTitle,
        newListTitle,
        previousListTitle,
        boardTitle,
        boardId,
      ] = entityTitle;

      const onHandleNewCard = () => {
        router.push(`/b/${boardId}`);
        onOpen(log.entityId);
      };

      return (
        <>
          moved{" "}
          <span
            onClick={onHandleNewCard}
            style={{ color: "#527dff" }}
            className="hover:underline cursor-pointer"
          >
            {movedCardTitle}
          </span>{" "}
          {entityType.toLowerCase()} from list {previousListTitle} to{" "}
          {newListTitle} in
          <span
            onClick={() => router.push(`/b/${boardId}`)}
            style={{ color: "#527dff" }}
            className="hover:underline cursor-pointer"
          >
            {" "}
            {boardTitle}
          </span>{" "}
          board.
        </>
      );
    }
  }
};
