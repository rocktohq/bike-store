import { Model } from "mongoose";

export interface TOrder {
  email: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

//* Type for Updating
export type TPartialOrder = Partial<TOrder>;

//* Methodss

//* Product Model with Methods
export interface OrderModel extends Model<TOrder> {
  isOrderExists(id: string): Promise<TOrder | null>;
}
