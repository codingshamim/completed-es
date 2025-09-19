import { dbConnect } from "../connection/dbConnect";
import { UserModel } from "../models/UserModel";

export async function CreateUserQuery(user) {
  await dbConnect();
  try {
    const isExitst = await UserModel.find({ phone: user?.phone });
    if (isExitst.length > 0) {
      return {
        error: "phone-error",
        message: "This Phone number already exist!",
      };
    } else {
      const response = await UserModel.create(user);
      if (response) {
        return {
          ok: true,
          message: "Successfully user created !",
        };
      } else {
        return {
          error: "name-error",
          message: "Something went wrong ",
        };
      }
    }
  } catch (err) {
    throw new Error(err);
  }
}
