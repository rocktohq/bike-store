import { Request, Response } from "express";
import orderValidationSchema from "./order.validation";
import { OrderServices } from "./order.service";

// Add a new Order
const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body;

    // Validate orderData
    const zodParsedData = orderValidationSchema.parse(orderData);
    const result = await OrderServices.createOrderInDB(zodParsedData);

    res.status(200).send({
      message: "Order created successfully",
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message || "Failed to create order",
      success: false,
      error: error,
      stack: error.stack,
    });
  }
};

// Get revenue
const getRevenue = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.getRevenueFromDB();
    res.status(200).send({
      message: "Revenue calculated successfully",
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message || "Failed to calculate revenue",
      success: false,
      error: error,
      stack: error.stack,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getRevenue,
};
