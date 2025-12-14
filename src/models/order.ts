import { Schema, model, Document, Types } from "mongoose";

export type OrderStatus =
  | "PLACED"
  | "PACKED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface IOrderItem {
  product: Types.ObjectId;
  quantity: number;
  appliedPrice: number;
}

export interface IOrder extends Document {
  userId: string;
  items: IOrderItem[];
  totalAmount: number;
  status: OrderStatus;
}

const orderItemSchema = new Schema<IOrderItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
  appliedPrice: { type: Number, required: true, min: 0 },
});

const orderSchema = new Schema<IOrder>(
  {
    items: { type: [orderItemSchema], required: true },
    userId: { type: String, required: true },
    totalAmount: { type: Number, required: true },

    status: {
      type: String,
      enum: ["PLACED", "PACKED", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "PLACED",
    },
  },
  { timestamps: true }
);

export const Order = model<IOrder>("Order", orderSchema);
