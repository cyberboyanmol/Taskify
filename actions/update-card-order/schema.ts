import { z } from "zod";
import { Card } from "@prisma/client";

export const UpdateCardOrder = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      order: z.number(),
      listId: z.string(),
    })
  ),
  boardId: z.string(),
  previousListTitle: z.optional(z.string()),
  newListTitle: z.optional(z.string()),
  movedCardId: z.optional(z.string()),
  movedCardTitle: z.optional(z.string()),
});
