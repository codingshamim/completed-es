"use server";

import { auth } from "@/auth";
import { dbConnect } from "../backend/connection/dbConnect";
import { ReviewsModel } from "../backend/models/ReviewsModel";
import formateMongo from "@/helpers/formateMongo";
const isCommented = async (productId) => {
  try {
    await dbConnect();

    const loggedAuth = await auth();
    const findComment = await ReviewsModel.find({
      user: loggedAuth?.user.id,
      productId: productId,
    });
    return formateMongo(findComment);
  } catch (err) {
    return {
      error: true,
      message: err.message,
    };
  }
};

export { isCommented };
