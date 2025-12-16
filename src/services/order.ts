import mongoose from "mongoose";
import { Product } from "../models/product";
import { OrderRepository } from "../repositories/order";
import { ProductRepository } from "../repositories/product";
import { isValidObjectId } from "../utils/validateObjectId";

export const OrderService = {

  async createOrder(
    items: { productId: string; quantity: number }[],
    userId: string
  ) {
    if (!userId) throw new Error("userId is required");

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      let orderItems: any[] = [];
      let totalAmount = 0;

      for (const item of items) {
        if (!isValidObjectId(item.productId)) {
          throw new Error("Invalid product ID format");
        }

        const product = await ProductRepository.findById(item.productId);
        if (!product) throw new Error("Product not found");

        if (product.stock < item.quantity)
          throw new Error(`Insufficient stock for ${product.name}`);

        // dynamic pricing
        let price = product.basePrice;
        if (item.quantity >= 10) price *= 0.9; // 10% discount
        if (product.category === "electronics") price *= 0.95; // 5 % Discount

        const appliedPrice = price * item.quantity;

        product.stock -= item.quantity;
        await product.save({ session });

        orderItems.push({
          product: product._id,
          quantity: item.quantity,
          appliedPrice,
        });

        totalAmount += appliedPrice;
      }

      const newOrder = await OrderRepository.create(
        {
          userId,
          items: orderItems,
          totalAmount,
          status: "PLACED",
        },
        { session }
      );

      await session.commitTransaction();
      session.endSession();
      return newOrder;

    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },

  getOrdersByUser: async (userId: string, query: any) => {
    if (!userId) throw new Error("userId is required");

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const sortBy = query.sortBy || "createdAt";
    const order = query.order === "asc" ? "asc" : "desc";

    return OrderRepository.findByUserId(userId, page, limit, sortBy, order);
  },

  async updateStatus(orderId: string, newStatus: string) {
    if (!isValidObjectId(orderId)) {
      throw new Error("Invalid order ID format");
    }
    const order = await OrderRepository.findById(orderId);
    if (!order) throw new Error("Order not found");

    if (order.status === "DELIVERED" && newStatus !== "DELIVERED")
      throw new Error("Cannot change a delivered order");

    if (newStatus === "CANCELLED") {
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: item.quantity },
        });
      }
    }

    return OrderRepository.updateStatus(orderId, newStatus);
  },


  async getOrderById(orderId: string) {
    if (!isValidObjectId(orderId)) {
      throw new Error("Invalid order ID format");
    }

    const order = await OrderRepository.findById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  }
};
