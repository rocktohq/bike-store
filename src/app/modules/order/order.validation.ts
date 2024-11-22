import { z } from "zod";

const orderValidationSchema = z.object({
  email: z.string().email({ message: "Invalid email address!" }),
  productId: z.string().nonempty({ message: "Product ID is required!" }),
  quantity: z
    .number()
    .positive({ message: "Quantity must be a positive number!" }),
  totalPrice: z
    .number()
    .positive({ message: "Total price must be a positive number!" }),
  isDeleted: z.boolean().default(false),
  createdAt: z.date().optional().default(new Date()),
  updatedAt: z.date().optional().default(new Date()),
});

export const partialOrderValidationSchema = z.object({
  productId: z.string().optional(),
  quantity: z
    .number()
    .positive({ message: "Quantity must be a positive number!" })
    .optional(),
  totalPrice: z
    .number()
    .positive({ message: "Total price must be a positive number!" })
    .optional(),
  isDeleted: z.boolean().optional().default(false),
  updatedAt: z
    .date()
    .optional()
    .default(() => new Date()),
});

export default orderValidationSchema;
