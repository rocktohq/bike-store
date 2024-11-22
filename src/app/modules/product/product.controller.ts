import { Request, Response } from "express";
import { BikeServices } from "./product.service";
import bikeValidationSchema, {
  updateBikeValidationSchema,
} from "./product.validation";

// Add a new Bike
const createBike = async (req: Request, res: Response) => {
  try {
    const { bike: bikeData } = req.body;

    const zodParsedData = bikeValidationSchema.parse(bikeData);
    const result = await BikeServices.createBikeInDB(zodParsedData);

    res.status(200).send({
      message: "Bike created successfully",
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message || "Failed to create bike",
      success: false,
      error: error,
      stack: error.stack,
    });
  }
};

// Get all Bikes
const getBikes = async (req: Request, res: Response) => {
  try {
    const result = await BikeServices.getBikesFromDB();
    res.status(200).send({
      message: "Bikes retrieved successfully",
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message || "Failed to retrieve bikes",
      success: false,
      error: error,
      stack: error.stack,
    });
  }
};

// Get a single Bike
const getSingleBike = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await BikeServices.getSingleBikeFromDB(id);

    res.status(200).send({
      message: "Bike retrieved successfully",
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(404).send({
      message: error.message || "Bike not found!",
      success: false,
      error: error,
      stack: error.stack,
    });
  }
};

// Delete a Bike
const deleteSingleBike = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await BikeServices.deleteSingleBikeFromDB(id);

    res.status(200).send({
      message: "Bike deleted successfully",
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(404).send({
      message: error.message || "Bike not found!",
      success: false,
      error: error,
      stack: error.stack,
    });
  }
};

// Update a Bike
const updateSingleBike = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { bike: bikeData } = req.body;

    const zodParsedData = updateBikeValidationSchema.parse(bikeData);
    const result = await BikeServices.updateSingleBikeFromDB(id, zodParsedData);

    res.status(200).send({
      message: "Bike updated successfully",
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(404).send({
      message: error.message || "Bike not found!",
      success: false,
      error: error,
      stack: error.stack,
    });
  }
};

export const BikeControllers = {
  createBike,
  getBikes,
  getSingleBike,
  deleteSingleBike,
  updateSingleBike,
};
