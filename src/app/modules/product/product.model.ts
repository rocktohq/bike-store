import { model, Schema } from "mongoose";
import { BikeModel, TBike } from "./product.interface";

// Initiating Schema for Bike
const bikeSchema = new Schema<TBike, BikeModel>({
  name: {
    type: String,
    required: [true, "Name is required!"],
  },
  brand: { type: String, required: [true, "Brand is required!"] },
  price: {
    type: Number,
    required: [true, "Price is required!"],
    validate: {
      validator: (value: number) => value >= 0,
      message: "Price must be greater than zero!",
    },
  },
  category: { type: String, required: [true, "Category is required!"] },
  description: { type: String, required: [true, "Description is required!"] },
  quantity: {
    type: Number,
    required: [true, "Quantity is required!"],
    validate: {
      validator: (value: number) => value >= 0,
      message: "Quantity must be greater than zero!",
    },
  },
  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

//* Static Methods
bikeSchema.statics.isBikeExists = async function (id: string) {
  return Bike.findOne({ _id: id });
};

//* Model for Bike
export const Bike = model<TBike, BikeModel>("Bike", bikeSchema);
