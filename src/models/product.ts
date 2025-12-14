import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  category: string;
  basePrice: number;
  stock: number;
  sku: string; 
  isDeleted: boolean; 
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    basePrice: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    sku: { type: String, required: true, unique: true, trim: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Product = model<IProduct>("Product", productSchema);
