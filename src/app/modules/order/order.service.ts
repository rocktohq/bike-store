import { TOrder } from "./order.interface";
import { Order } from "./order.model";

// Add a new Order to the database
const createOrderInDB = async (orderData: TOrder) => {
  const result = await Order.create(orderData);
  return result;
};

// Get all revenue:
const getRevenueFromDB = async () => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalPrice" },
      },
    },
    {
      $project: {
        totalRevenue: 1,
        _id: 0,
      },
    },
  ]);
  return result;
};

export const OrderServices = {
  createOrderInDB,
  getRevenueFromDB,
};
