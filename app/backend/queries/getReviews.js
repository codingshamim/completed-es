import { ReviewsModel } from "../models/ReviewsModel";
import formateMongo from "@/helpers/formateMongo";
import { UserModel } from "../models/UserModel";

export default async function getReviews(productId) {
  try {
    const response = await ReviewsModel.find({ productId: productId })
      .populate({
        path: "user",
        model: UserModel,
        select: "name",
      })
      .sort({ createdAt: -1 });

    return formateMongo(response);
  } catch (err) {
    throw new Error("Something went wrong while fetching reviews");
  }
}
