import { auth } from "@/auth";
import { dbConnect } from "../connection/dbConnect";
import { ReviewsModel } from "../models/ReviewsModel";

export default async function AddCommentQuery(productId, comment, images = []) {
  try {
    const loggedUser = await auth();
    const newComment = {
      user: loggedUser?.user?.id,
      content: comment,
      productId,
      images,
    };
    await dbConnect();
    return await ReviewsModel.create(newComment);
  } catch (err) {
    throw new Error(err.message);
  }
}
