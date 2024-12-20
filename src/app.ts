import express, { Application, Request, Response } from "express";
import cors from "cors";
import { BikeRoutes } from "./app/modules/product/product.routes";
import { OrderRoutes } from "./app/modules/order/order.routes";
const app: Application = express();

//* Parsers
app.use(express.json());
app.use(cors());

//* Application routes
app.use("/api/products", BikeRoutes);
app.use("/api/orders", OrderRoutes);

//* Default route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from BikeStore server!");
});

//* Global routing error
app.all("/*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found!",
  });
});

//* Global Error handler
app.use((error: unknown, req: Request, res: Response) => {
  if (error) {
    res.status(400).send({
      success: false,
      message: "An error occurred!",
    });
  }
});

export default app;
