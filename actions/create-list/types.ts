import { CreateList } from "./schema";
import { List } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { z } from "zod";
export type InputType = z.infer<typeof CreateList>;

export type ReturnType = ActionState<InputType, List>;
