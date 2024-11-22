import { Request, Response } from "express";
import orderValidationSchema, {
  partialOrderValidationSchema,
} from "./order.validation";
import { OrderServices } from "./order.service";

// Add a new Order
const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body;

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

// Get all Orders
const getOrders = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.getOrdersFromDB();
    res.status(200).send({
      message: "Orders retrieved successfully",
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message || "Failed to retrieve orders",
      success: false,
      error: error,
      stack: error.stack,
    });
  }
};

// Get a single Order
const getSingleOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await OrderServices.getSingleOrderFromDB(id);

    res.status(200).send({
      message: "Order retrieved successfully",
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(404).send({
      message: error.message || "Order not found!",
      success: false,
      error: error,
      stack: error.stack,
    });
  }
};

// Delete a Order
const deleteSingleOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await OrderServices.deleteSingleOrderFromDB(id);

    res.status(200).send({
      message: "Order deleted successfully",
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(404).send({
      message: error.message || "Order not found!",
      success: false,
      error: error,
      stack: error.stack,
    });
  }
};

// Update a Order
const updateSingleOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { order: orderData } = req.body;

    const zodParsedData = partialOrderValidationSchema.parse(orderData);
    const result = await OrderServices.updateSingleOrderFromDB(
      id,
      zodParsedData,
    );

    res.status(200).send({
      message: "Order updated successfully",
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(404).send({
      message: error.message || "Order not found!",
      success: false,
      error: error,
      stack: error.stack,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getOrders,
  getSingleOrder,
  deleteSingleOrder,
  updateSingleOrder,
};
