import express from "express";
import { OrderControllers } from "./order.controller";

const router = express.Router();

router.post("/", OrderControllers.createOrder);
router.get("/", OrderControllers.getOrders);
router.get("/:id", OrderControllers.getSingleOrder);
router.delete("/:id", OrderControllers.deleteSingleOrder);
router.put("/:id", OrderControllers.updateSingleOrder);

export const OrderRoutes = router;
