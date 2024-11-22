import express from "express";
import { BikeControllers } from "./product.controller";

const router = express.Router();

router.post("/", BikeControllers.createBike);
router.get("/", BikeControllers.getBikes);
router.get("/:id", BikeControllers.getSingleBike);
router.delete("/:id", BikeControllers.deleteSingleBike);
router.put("/:id", BikeControllers.updateSingleBike);

export const BikeRoutes = router;
