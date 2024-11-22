import { Request, Response } from "express";
import orderValidationSchema from "./order.validation";
import { OrderServices } from "./order.service";

// Add a new Order
const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body;

    // Validate orderData
    const zodParsedData = orderValidationSchema.parse(orderData);

    // Save orderData to database
    const result = await OrderServices.createOrderInDB(zodParsedData);

    // Success response
    res.status(200).send({
      message: "Order created successfully",
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error?.issues?.[0]?.message
        ? error?.issues?.[0]?.message
        : error.message || "Failed to create order",
      status: false,
      error: {
        name: error?.name,
        errors: error?.issues?.[0],
      },
      stack: error?.stack,
    });
  }
};

// Get calculated revenue
const getRevenue = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.getRevenueFromDB();
    res.status(200).send({
      message: "Revenue calculated successfully",
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error?.issues?.[0]?.message
        ? error?.issues?.[0]?.message
        : error.message || "Failed to calculate revenue",
      status: false,
      error: {
        name: error?.name,
        errors: error?.issues?.[0],
      },
      stack: error?.stack,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getRevenue,
};
