import formateMongo from "@/helpers/formateMongo";
import { dbConnect } from "../backend/connection/dbConnect";
import { UserModel } from "../backend/models/UserModel";

export default async function UserCredentials(userId) {
  try {
    await dbConnect();
    const getUser = await UserModel.findById(userId).select([
      "name",
      "phone",
      "address",
      "role"
    ]);

    if (getUser) {
      return formateMongo(getUser);
    }
  } catch (err) {
    throw new Error("Something went wrong while getting user credentials!");
  }
}
