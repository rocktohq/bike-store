/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { BikeServices } from "./product.service";
import bikeValidationSchema, {
  updateBikeValidationSchema,
} from "./product.validation";
import { Bike } from "./product.model";

// Add a new Bike
const createBike = async (req: Request, res: Response) => {
  try {
    // Bike data from request
    const { name, brand, category, price, description, quantity, inStock } =
      req.body;
    const bikeData = {
      name,
      brand,
      category,
      price,
      description,
      quantity,
      inStock,
    };

    // Validate bikeData and add bike
    const zodParsedData = bikeValidationSchema.parse(bikeData);
    const result = await BikeServices.createBikeInDB(zodParsedData);

    // Set the new bike data
    res.status(200).send({
      message: "Bike created successfully",
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error?.issues?.[0]?.message
        ? error?.issues?.[0]?.message
        : error?.message || "Failed to create bike",
      success: false,
      error: {
        name: error?.name,
        errors: error?.issues?.[0],
      },
      stack: error?.stack,
    });
  }
};

// Get all Bikes
const getBikes = async (req: Request, res: Response) => {
  try {
    // Retrive all Bikes data
    const searchTerm = (req.query.searchTerm as string) || "";
    const result = await BikeServices.getBikesFromDB(searchTerm);
    if (result.length > 0) {
      res.status(200).send({
        message: "Bikes retrieved successfully",
        status: true,
        data: result,
      });
    } else {
      res.status(404).send({
        message: "Bike not found",
        success: false,
        error: {
          name: "Bike not found",
          errors: {},
        },
        stack: "",
      });
    }
  } catch (error: any) {
    res.status(500).send({
      message: error?.issues?.[0]?.message
        ? error?.issues?.[0]?.message
        : error?.message || "Failed to retrive bikes",
      success: false,
      error: {
        name: error?.name,
        errors: error?.issues?.[0],
      },
      stack: error?.stack,
    });
  }
};

// Get a single Bike
const getSingleBike = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if bike exists
    if ((await Bike.isBikeExists(id)) === null) {
      res.status(404).send({
        message: "Bike not found",
        success: false,
        error: {
          name: "Bike not found",
          errors: {},
        },
        stack: "",
      });
    } else {
      // Get the bike
      const result = await BikeServices.getSingleBikeFromDB(id);

      // Send the response with data
      res.status(200).send({
        message: "Bike retrieved successfully",
        status: true,
        data: result,
      });
    }
  } catch (error: any) {
    res.status(500).send({
      message: error?.issues?.[0]?.message
        ? error?.issues?.[0]?.message
        : error?.message || "Failed to retrieve bike",
      success: false,
      error: {
        name: error?.name,
        errors: error?.issues?.[0],
      },
      stack: error?.stack,
    });
  }
};

// Delete a Bike
const deleteSingleBike = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if bike exists
    if ((await Bike.isBikeExists(id)) === null) {
      res.status(404).send({
        message: "Bike not found or already deleted",
        success: false,
        data: {},
      });
    } else {
      // Delete the bike
      const result = await BikeServices.deleteSingleBikeFromDB(id);

      // Send response
      res.status(200).send({
        message: "Bike deleted successfully",
        status: true,
        data: result ? result : {},
      });
    }
  } catch (error: any) {
    res.status(500).send({
      message: error?.issues?.[0]?.message
        ? error?.issues?.[0]?.message
        : error?.message || "Failed to delete bike",
      success: false,
      error: {
        name: error?.name,
        errors: error?.issues?.[0],
      },
      stack: error?.stack,
    });
  }
};

// Update a Bike
const updateSingleBike = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bikeData = { ...req.body };
    bikeData.updatedAt = new Date(); // upddatedAt?: timestamp

    // Check if bike exists
    if ((await Bike.isBikeExists(id)) === null) {
      res.status(404).send({
        message: "Bike not found",
        success: false,
        error: {
          name: "Bike not found",
          errors: {},
        },
        stack: "",
      });
    } else {
      // Validate and update the bike data
      const zodParsedData = updateBikeValidationSchema.parse(bikeData);
      const result = await BikeServices.updateSingleBikeFromDB(
        id,
        zodParsedData,
      );

      // Send response with updated data
      res.status(200).send({
        message: "Bike updated successfully",
        status: true,
        data: result,
      });
    }
  } catch (error: any) {
    res.status(500).send({
      message: error?.issues?.[0]?.message
        ? error?.issues?.[0]?.message
        : error?.message || "Failed to update bike",
      success: false,
      error: {
        name: error?.name,
        errors: error?.issues?.[0],
      },
      stack: error?.stack,
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
