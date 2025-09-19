import { auth } from "@/auth";
import { UserModel } from "../models/UserModel";

export default async function DeleteAccountQuery() {
  try {
    const loggedAuth = await auth();
    const userId = loggedAuth?.user?.id;
    const result = await UserModel.findByIdAndDelete(userId);
    if (result) {
      return {
        ok: true,
        message: "Deleted !",
      };
    } else {
      return {
        ok: false,
      };
    }
  } catch (err) {
    throw new Error(err);
  }
}
