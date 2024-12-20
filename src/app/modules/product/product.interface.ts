/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

//* Interface for Bike
export interface TBike {
  name: string;
  brand: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TPartialBike = Partial<TBike>;

//* Bike Model with Methods
export interface BikeModel extends Model<TBike> {
  isBikeExists(id: string): Promise<TBike | null>;
  isInStock(id: string): Promise<TBike | null>;
}
