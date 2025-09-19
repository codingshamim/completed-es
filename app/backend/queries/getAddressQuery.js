import formateMongo from "@/helpers/formateMongo";
import { UserModel } from "../models/UserModel";

export default async function getAddressQuery(userId) {
  try {
    const response = await UserModel.findById(userId);
    const address = response && response?.address;
    if (address) {
      return formateMongo(address);
    } else {
      return false;
    }
  } catch (err) {
    throw new Error(err.message);
  }
}
