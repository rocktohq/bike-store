import { z } from "zod";

const bikeValidationSchema = z.object({
  name: z.string().trim().max(30, "Name can't be longer than 30 characters"),
  // .refine(
  //   (value) =>
  //     value === value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
  //   { message: "Name is not capitalized!" },
  // ),

  brand: z.string().trim().max(30, "Name can't be longer than 30 characters"),
  // .refine(
  //   (value) =>
  //     value === value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
  //   { message: "Name is not capitalized!" },
  // ),

  price: z.number().positive("Price must be positive number!"),
  category: z.string().trim(),
  description: z.string().trim(),
  quantity: z.number().refine((value) => value >= 0, {
    message: "Quantity must be a positive number!",
  }),
  inStock: z.boolean().default(true),
  isDeleted: z.boolean().default(false),
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
  price: z.number().positive("Price must be a positive number!").optional(),
  category: z.string().trim().optional(),
  description: z.string().trim().optional(),
  quantity: z
    .number()
    .int()
    .min(0, "Quantity must be a positive number!")
    .optional(),
  inStock: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  updatedAt: z
    .date()
    .optional()
    .default(() => new Date()),
});

export default bikeValidationSchema;
