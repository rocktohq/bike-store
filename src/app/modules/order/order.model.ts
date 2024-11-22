import { model, Schema } from "mongoose";
import { OrderModel, TOrder } from "./order.interface";
import { Bike } from "../product/product.model";

//* Order Schema
const orderSchema = new Schema<TOrder, OrderModel>({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  quantity: {
    type: Number,
    required: true,
    validate: {
      validator: (value: number) => value > 0,
      message: "Quantity must be a positive number!",
    },
  },
  totalPrice: {
    type: Number,
    required: true,
    validate: {
      validator: (value: number) => value > 0,
      message: "Total price must be a positive number!",
    },
  },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

//* Middleware
// Pre-Order product search
orderSchema.pre("save", async function () {
  const product = await Bike.findById(this.productId);

  // Product not found
  if (product === null) {
    throw new Error("Product not found!");
  }

  // Insufficient stock
  if (product.quantity < this.quantity) {
    throw new Error("Insufficient stock available for this product!");
  }
});

// Post-Order product update
orderSchema.post("save", async function (doc, next) {
  const product = await Bike.findByIdAndUpdate(doc.productId, {
    $inc: { quantity: -this.quantity },
  });

  // Product quantity is 0 / product is out of stock
  if (product != null && product.quantity === 0) {
    await Bike.findByIdAndUpdate(doc.productId, {
      $set: { inStock: false },
    });
  }

  next();
});

//* Model for Bike
export const Order = model<TOrder, OrderModel>("Order", orderSchema);
