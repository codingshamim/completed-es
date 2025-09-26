"use server";

import formateMongo from "@/helpers/formateMongo";
import { dbConnect } from "../backend/connection/dbConnect";
import { UserModel } from "../backend/models/UserModel";

export async function getUserRole(userId) {
  try {
    if (!userId) {
      return null;
    } else {
      await dbConnect();
      const userDetails = await UserModel.find({ _id: userId }).select("role");
      return formateMongo(userDetails);
    }
  } catch (err) {
    return null;
  }
}
