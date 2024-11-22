import { model, Schema } from "mongoose";
import { OrderModel, TOrder } from "./order.interface";

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
orderSchema.pre("find", function (next) {
  // Exclude deleted orders: all orders
  this.find({ isDeleted: { $ne: true } });
  next();
});

// Exlude deleted order: single order
orderSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//* Model for Bike
export const Order = model<TOrder, OrderModel>("Order", orderSchema);
