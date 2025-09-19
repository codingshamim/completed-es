import { dbConnect } from "../backend/connection/dbConnect";
import { orderModel } from "../backend/models/orderModel";
import { ProductModel } from "../backend/models/ProductModel";

export const createOrder = async (data) => {
  await dbConnect();
};
