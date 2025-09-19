import { auth } from "@/auth";
import { UserModel } from "../models/UserModel";

export default async function UpdateAddressQuery(updateObject) {
  try {
    const loggedAuth = await auth();
    const userId = loggedAuth?.user?.id;
    const response = await UserModel.updateOne(
      { _id: userId },
      { address: updateObject }
    );

    if (response) {
      return {
        ok: true,
        message: "Successfully updated your address",
      };
    } else {
      return {
        error: false,
        message: "Something went wrong",
      };
    }
  } catch (err) {
    throw new Error("Something went wrong !");
  }
}
