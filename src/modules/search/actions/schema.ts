import { z } from "zod";

export const searchSchema = z
  .object({
    location: z.string().optional(),
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
