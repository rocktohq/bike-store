import { z } from "zod";

const bikeValidationSchema = z.object({
  name: z.string().trim().max(30, "Name can't be longer than 30 characters"),
  brand: z.string().trim().max(30, "Name can't be longer than 30 characters"),
  price: z
    .number()
    .positive("Price must be positive number!")
    .refine((value) => value > 0, {
      message: "Price must be greater than zero!",
    }),
  category: z.string().trim(),
  description: z.string().trim(),
  quantity: z
    .number()
    .positive("Quantity must be a positive number!")
    .refine((value) => value > 0, {
      message: "Quantity must be greater than zero!",
    }),
  inStock: z.boolean().default(true),
  createdAt: z.date().optional().default(new Date()),
  updatedAt: z.date().optional().default(new Date()),
});

export const updateBikeValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .max(30, "Name can't be longer than 30 characters")
    .optional(),
  brand: z
    .string()
    .trim()
    .max(30, "Brand can't be longer than 30 characters")
    .optional(),
  price: z
    .number()
    .positive("Price must be a positive number!")
    .refine((value) => value > 0, {
      message: "Price must be greater than zero!",
    })
    .optional(),
  category: z.string().trim().optional(),
  description: z.string().trim().optional(),
  quantity: z
    .number()
    .int()
    .refine((value) => value >= 0, {
      message: "Quantity can't be less than zero!",
    })
    .optional(),
  inStock: z.boolean().optional(),
  updatedAt: z
    .date()
    .optional()
    .default(() => new Date()),
});

export default bikeValidationSchema;
