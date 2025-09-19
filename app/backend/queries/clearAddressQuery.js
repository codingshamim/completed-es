import { auth } from "@/auth";
import { UserModel } from "../models/UserModel";

export default async function clearAddressQuery() {
  const userAuth = await auth();
  const userId = userAuth?.user?.id;
  const response = await UserModel.updateOne({ id: userId }, null);
}
