import { model, Schema } from "mongoose";
import { BikeModel, TBike } from "./product.interface";

// Initiating Schema for Bike
const bikeSchema = new Schema<TBike, BikeModel>({
  name: {
    type: String,
    required: [true, "Name is required!"],
    // validate: {
    //   validator: (value: string) =>
    //     value === value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
    //   message: "Name is not capitalized!",
    // },
  },
  brand: { type: String, required: [true, "Brand is required!"] },
  price: { type: Number, required: [true, "Price is required!"] },
  category: { type: String, required: [true, "Category is required!"] },
  description: { type: String, required: [true, "Description is required!"] },
  quantity: {
    type: Number,
    required: [true, "Quantity is required!"],
    validate: {
      validator: (value: number) => value >= 0,
      message: "Quantity must be a positive number!",
    },
  },
  inStock: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

//* Middleware
bikeSchema.pre("find", function (next) {
  // Exclude deleted bikes: Search all Bikes
  this.find({ isDeleted: { $ne: true } });
  next();
});

// Exlude deleted bike: Search by ID
bikeSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// Exclude deleted bikes: aggregation
bikeSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//* Static Methods
bikeSchema.statics.isBikeExists = async function (id: string) {
  return Bike.findOne({ _id: id });
};

//* Model for Bike
export const Bike = model<TBike, BikeModel>("Bike", bikeSchema);
