import { auth } from "@/auth";
import { UserModel } from "../models/UserModel";
import bcrypt from "bcrypt";

export default async function UpdatePasswordQuery(passObject) {
  const loggedAuth = await auth();
  const userId = loggedAuth?.user?.id;
  const response = await UserModel.findById(userId);
  const isMatch = await bcrypt.compare(
    passObject?.password,
    response?.password
  );
  const hashedPassword = await bcrypt.hash(passObject?.newPass, 8);
  if (isMatch) {
    const updatePassword = await UserModel.updateOne(
      { _id: userId },
      { password: hashedPassword }
    );
    if (updatePassword) {
      return {
        error: false,
        ok: true,
        message: "Successfully changed your password !",
      };
    }
  } else {
    return {
      error: "password-error",
      message: "Your Old Password Incorrect!",
    };
  }
}
