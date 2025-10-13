import { z } from "zod";

export const searchSchema = z
  .object({
    query: z.string(),
    type: z.string().optional(),
    priceRange: z.string().optional(),
    bedrooms: z.string().optional(),
  })
  .refine(
    (data) => {
      return Object.values(data).some((value) => value && value.trim() !== "");
    },
    {
      message: "At least one search field must be provided",
    }
  );

export type SearchFormType = z.infer<typeof searchSchema>;
