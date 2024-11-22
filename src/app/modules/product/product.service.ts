import { TBike, TPartialBike } from "./product.interface";
import { Bike } from "./product.model";

// Add a new Bike to the database
const createBikeInDB = async (bikeData: TBike) => {
  const result = await Bike.create(bikeData);
  return result;
};

// Get all Bikes from the database:
const getBikesFromDB = async (searchTerm: string) => {
  const result = await Bike.aggregate([
    {
      // Matching bikes with the search term.
      // Used $regex to match partially and case-insensitively
      $match: {
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { brand: { $regex: searchTerm, $options: "i" } },
          { category: { $regex: searchTerm, $options: "i" } },
        ],
      },
    },
    {
      // GroupBy category
      $group: {
        _id: "$category",
        bikes: { $push: "$$ROOT" },
      },
    },
  ]);
  return result;
};

// Get single Bike from the database
const getSingleBikeFromDB = async (id: string) => {
  const result = await Bike.findOne({ _id: id });
  return result;
};

// Delete a Bike from the database
const deleteSingleBikeFromDB = async (id: string) => {
  if ((await Bike.findOne({ _id: id })) === null) {
    throw new Error("Bike not found or already deleted!");
  } else {
    const result = await Bike.deleteOne({ _id: id });
    return result;
  }
};

// Update a Bike in the database
const updateSingleBikeFromDB = async (
  id: string,
  updatedData: TPartialBike,
) => {
  if ((await Bike.findOne({ _id: id })) === null) {
    throw new Error("Bike not found!");
  } else {
    const result = await Bike.updateOne(
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

export const BikeServices = {
  createBikeInDB,
  getBikesFromDB,
  getSingleBikeFromDB,
  deleteSingleBikeFromDB,
  updateSingleBikeFromDB,
};
