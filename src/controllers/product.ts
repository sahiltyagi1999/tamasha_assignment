import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/product";

export const ProductController = {
  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ProductService.createProduct(req.body);
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  },

 async list(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await ProductService.getProducts(req.query);
    res.json(data);
  } catch (err) {
    next(err);
  }
},
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ProductService.updateProduct(req.params.id, req.body);
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ProductService.deleteProduct(req.params.id);
      res.json(data);
    } catch (err) {
      next(err);
    }
  },
};
