import { Order, IOrder } from "../models/order";

export const OrderRepository = {
  create: async (data: Partial<IOrder>, options: any = {}) => {
    const result = await Order.create([data], options);
    return result[0];
  },

  findByUserId: async (
  userId: string,
  page: number,
  limit: number,
  sortBy: string,
  order: "asc" | "desc"
) => {
  const skip = (page - 1) * limit;

  return Order.find({ userId })
    .populate("items.product")
    .sort({ [sortBy]: order === "asc" ? 1 : -1 })
    .skip(skip)
    .limit(limit);
},

  findById: (id: string) => {
    return Order.findById(id).populate("items.product");
  },

  updateStatus: (id: string, status: string) => {
    return Order.findByIdAndUpdate(id, { status }, { new: true });
  },
};
