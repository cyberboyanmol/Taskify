import { z } from "zod";

export const UpdateBoard = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(3, {
      message: "Title is too short..",
    })
    .optional(),
  id: z.string(),
  image: z
    .string({
      required_error: "Image is required",
      invalid_type_error: "Image is required",
    })
    .optional(),
});
