import { Request, Response, NextFunction } from "express";
import { OrderService } from "../services/order";

export const OrderController = {
  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await OrderService.createOrder(req.body.items, req.body.userId)
      res.status(201).json(order);
    } catch (err) {
      next(err);
    }
  },
 async getOrdersByUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.query.userId as string;

    const orders = await OrderService.getOrdersByUser(
      userId,
      req.query
    );

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (err) {
    next(err);
  }
},

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await OrderService.updateStatus(
        req.params.id,
        req.body.status
      );
      res.json(updated);
    } catch (err) {
      next(err);
    }
  },

  async getOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await OrderService.getOrderById(req.params.id);
      res.json(order);
    } catch (err) {
      next(err);
    }
  },
};
