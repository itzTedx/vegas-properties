import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(
      /^[a-zA-Z\s-']+$/,
      "Name can only contain letters, spaces, hyphens, and apostrophes"
    )
    .trim()
    .refine((val) => val.length > 0, {
      message: "Name is required",
    }),
  email: z
    .string()
    .email("Please enter a valid email address")
    .trim()
    .refine((val) => val.length > 0, {
      message: "Email is required",
    }),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits")
    .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number")
    .trim()
    .refine((val) => val.length > 0, {
      message: "Phone number is required",
    }),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters")
    .trim()
    .refine((val) => val.length > 0, {
      message: "Message is required",
    }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
