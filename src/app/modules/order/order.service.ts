import { TOrder, TPartialOrder } from "./order.interface";
import { Order } from "./order.model";

// Add a new Order to the database
const createOrderInDB = async (orderData: TOrder) => {
  const result = await Order.create(orderData);
  return result;
};

// Get all Orders from the database:
const getOrdersFromDB = async () => {
  const result = await Order.find({});
  return result;
};

// Get single Order from the database
const getSingleOrderFromDB = async (id: string) => {
  if ((await Order.isOrderExists(id)) === null) {
    throw new Error("No order found!");
  } else {
    const result = await Order.findOne({ _id: id });
    return result;
  }
};

// Delete a Order from the database
const deleteSingleOrderFromDB = async (id: string) => {
  if ((await Order.isOrderExists(id)) === null) {
    throw new Error("Order not found or already deleted!");
  } else {
    const result = await Order.updateOne({ _id: id }, { isDeleted: true });
    return result;
  }
};

// Update a Bike in the database
const updateSingleOrderFromDB = async (
  id: string,
  updatedData: TPartialOrder,
) => {
  if ((await Order.isOrderExists(id)) === null) {
    throw new Error("Order not found!");
  } else {
    const result = await Order.updateOne(
      { _id: id },
      {
        $set: {
          ...updatedData,
        },
      },
    );
    return result;
  }
};

export const OrderServices = {
  createOrderInDB,
  getOrdersFromDB,
  getSingleOrderFromDB,
  deleteSingleOrderFromDB,
  updateSingleOrderFromDB,
};
