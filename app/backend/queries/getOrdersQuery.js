import { auth } from "@/auth";
import { dbConnect } from "../connection/dbConnect";
import { orderModel } from "../models/orderModel";
import formateMongo from "@/helpers/formateMongo";
import { ProductModel } from "../models/ProductModel";

export default async function getOrdersQuery() {
  try {
    await dbConnect();
    const { user } = await auth();
    const getOrders = await orderModel.find({ user: user?.id });
    return formateMongo(getOrders);
  } catch (err) {
    throw new Error(err.message);
  }
}
