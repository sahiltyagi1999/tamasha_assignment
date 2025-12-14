import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import productRoutes from "./routes/product";
import orderRoutes from "./routes/order";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());
app.use(
  morgan(":method :url :status :response-time ms")
);

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(
    `[HIT] ${req.method} ${req.originalUrl}`
  );
  next();
});

app.use(errorHandler);

export default app;
