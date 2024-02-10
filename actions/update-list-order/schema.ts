import { z } from "zod";
import { Card } from "@prisma/client";

export const UpdateListOrder = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      order: z.number(),
    })
  ),
  boardId: z.string(),
});
