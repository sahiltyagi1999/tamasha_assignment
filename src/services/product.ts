import { ProductRepository } from "../repositories/product";

export const ProductService = {
  async createProduct(data: any) {
    const exists = await ProductRepository.findBySKU(data.sku);
    if (exists) throw new Error("SKU already exists");

    return ProductRepository.create(data);
  },

  async getProducts(query: any) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const sortBy = query.sortBy || "createdAt";
    const order = query.order === "asc" ? "asc" : "desc";

    return ProductRepository.list(page, limit, sortBy, order);
  },

  async updateProduct(id: string, data: any) {
    return ProductRepository.update(id, data);
  },

  async deleteProduct(id: string) {
    return ProductRepository.softDelete(id);
  },
};
