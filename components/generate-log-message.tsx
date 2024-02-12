import { ACTION, AuditLog } from "@prisma/client";
import React from "react";
import parse from "html-react-parser";
import { useCardModalStore } from "@/hooks/use-card-modal";
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

export const generateLogMessage = (log: AuditLog) => {
  const { action, entityTitle, entityType } = log;

  switch (action) {
    case ACTION.CREATE:
      return ` created ${entityType.toLowerCase()} "${entityTitle[0].toLowerCase()}"`;
    case ACTION.UPDATE:
      return ` updated ${entityType.toLowerCase()} "${entityTitle[0].toLowerCase()}"`;
    case ACTION.DELETE:
      return ` deleted ${entityType.toLowerCase()} "${entityTitle[0].toLowerCase()}"`;
    case ACTION.COPIED:
      return ` copied  ${entityType.toLowerCase()} "${entityTitle[0].toLowerCase()} from ${entityTitle[1].toLowerCase()}"`;
    default:
      return ` unknown action ${entityType.toLowerCase()} "${entityTitle[0].toLowerCase()}"`;
  }
};
