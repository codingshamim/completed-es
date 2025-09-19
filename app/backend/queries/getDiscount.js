import formateMongo from "@/helpers/formateMongo";
import { couponModel } from "../models/couponModel";
import { dbConnect } from "../connection/dbConnect";

export default async function getDiscount(coupon) {
  await dbConnect();
  try {
    const response = await couponModel.find({ coupon: coupon });
    const formate = formateMongo(response);
    if (response.length > 0) {
      return {
        discount: formate[0].discount,
      };
    } else {
      return {
        discount: 0,
      };
    }
  } catch (err) {
    throw new Error("Something went wrong !");
  }
}
