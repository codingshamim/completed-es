import formateMongo from "@/helpers/formateMongo";
import { EventsModel } from "../models/EventsModel";
import { ProductModel } from "../models/ProductModel";
import { dbConnect } from "../connection/dbConnect";

export default async function EventQuery() {
  await dbConnect();
  try {
    const response = await EventsModel.find({}).populate({
      path: "product",
      model: ProductModel,
      select: [
        "title",
        "price",
        "discount",
        "ability",
        "thumbnail",
        "slug",
        "stock",
      ],
    });
    if (response.length === 0) {
      return null;
    }

    return formateMongo(response[0]);
  } catch (err) {
    throw new Error(err.message);
  }
}
