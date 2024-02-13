import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";

import { StripeSubscription } from "./schema";

export type InputType = z.infer<typeof StripeSubscription>;
export type ReturnType = ActionState<InputType, string>;
