import { z } from "zod";

// Validate orderData with Zod
const orderValidationSchema = z.object({
  email: z.string().email({ message: "Invalid email address!" }),
  productId: z.string().nonempty({ message: "Product ID is required!" }),
  quantity: z
    .number()
    .positive({ message: "Quantity must be a positive number!" })
    .refine((value) => value > 0, { message: "Quantity can't be zero!" }),
  totalPrice: z
    .number()
    .positive({ message: "Total price must be a positive number!" })
    .refine((value) => value > 0, { message: "Total Price can't be zero!" }),
  createdAt: z.date().optional().default(new Date()),
  updatedAt: z.date().optional().default(new Date()),
});

export default orderValidationSchema;
