import { Product, IProduct } from "../models/product";

export const ProductRepository = {
  create(data: Partial<IProduct>) {
    return Product.create(data);
  },

  findById(id: string) {
    return Product.findById(id);
  },

  findBySKU(sku: string) {
    return Product.findOne({ sku, isDeleted: false });
  },

  update(id: string, data: Partial<IProduct>) {
    return Product.findByIdAndUpdate(id, data, { new: true });
  },

  softDelete(id: string) {
    return Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  },

  list: async (
    page: number,
    limit: number,
    sortBy: string,
    order: "asc" | "desc"
  ) => {
    const skip = (page - 1) * limit;

    return Product.find({ isDeleted: false })
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(limit);
  }
};
