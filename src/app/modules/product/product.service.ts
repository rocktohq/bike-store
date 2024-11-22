import { TBike, TPartialBike } from "./product.interface";
import { Bike } from "./product.model";

// Add a new Bike to the database
const createBikeInDB = async (bikeData: TBike) => {
  const result = await Bike.create(bikeData);
  return result;
};

// Get all Bikes from the database:
const getBikesFromDB = async () => {
  const result = await Bike.find({});
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
