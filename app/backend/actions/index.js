"use server";
import bcrypt from "bcrypt";
import { CreateUserQuery } from "../queries/CreateUserQuery";
import { signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import updateUserInfo from "../models/updateUserInfo";
import UpdatePasswordQuery from "../queries/UpdatePasswordQuery";
import DeleteAccountQuery from "../queries/DeleteAccountQuery";
import UpdateAddressQuery from "../queries/UpdateAddressQuery";
import AddToCartQuery from "../queries/AddToCartQuery";
import getProdcutById from "../queries/getProdcutById";
import delteCartItemById from "../models/delteCartItemById";
import getDiscount from "../queries/getDiscount";
import placeOrderQuery from "../queries/placeOrderQuery";
import updateCartQuery from "../queries/updateCartQuery";

export async function createUserAction(userObject) {
  try {
    const { fName, phone, password } = userObject;
    const trimmedName = fName.trim();
    const trimmedPhone = phone.trim();
    if (fName.length === 0) {
      return {
        error: "name-error",
        message: "Please provide your name",
      };
    } else if (phone.length === 0) {
      return {
        error: "phone-error",
        message: "Please provide your phone number",
      };
    } else if (password.length < 6) {
      return {
        error: "password-error",
        message: "Please provide your password",
      };
    } else if (typeof Number(phone) === "string") {
      return {
        error: "phone-error",
        message: "Please provide only number",
      };
    }
    const hashedPassword = await bcrypt.hash(password.trim(), 8);
    const newUser = {
      name: trimmedName,
      phone: trimmedPhone,
      password: hashedPassword,
      role: "user",
    };
    const response = await CreateUserQuery(newUser);
    if (response?.ok) {
      // Automatically log the user in upon successful registration
      const loginResponse = await ceredntialLogin({
        phone: trimmedPhone,
        password,
      });

      if (loginResponse) {
        revalidatePath("/");
        return {
          ok: "loggin-succes",
        };
      } else {
        return {
          error: "login-error",
          message: "User registered but login failed.",
        };
      }
    } else {
      return response; // Pass along any registration error
    }
  } catch (err) {
    throw new Error(err);
  }
}
export async function ceredntialLogin(formData) {
  try {
    const response = await signIn("credentials", {
      phone: formData.phone.trim(),
      password: formData.password.trim(),
      redirect: false,
    });

    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export async function doSignOut() {
  await signOut();
}
export async function makeSignout() {
  await signOut();
}

export async function updateUserAction(userObject) {
  if (userObject.name.trim().length === 0) {
    return {
      error: "name-error",
      message: "Provider your name",
    };
  } else if (userObject.phone.trim().length === 0) {
    return {
      error: "phone-error",
      message: "Provider your phone",
    };
  } else {
    const response = await updateUserInfo(userObject);
    if (response.ok) {
      revalidatePath("/");
      return response;
    }
  }
}

export async function updatePasswordAction(passObject) {
  const { password, newPassword, confirmPassword } = passObject;
  if (password.trim().length === 0) {
    return {
      error: "password-error",
      message: "Please enter your password",
    };
  } else if (newPassword.trim().length === 0) {
    return {
      error: "newpass-error",
      message: "Please enter your new password",
    };
  } else if (confirmPassword.trim().length === 0) {
    return {
      error: "confirmpass-error",
      message: "Please enter your confirm password",
    };
  } else if (newPassword.trim() !== confirmPassword.trim()) {
    return {
      error: "nandc-error",
      message: "New Password and confirm password is not matched !",
    };
  } else {
    const response = await UpdatePasswordQuery({
      password: password.trim(),
      newPass: newPassword.trim(),
    });
    return response;
  }
}

export async function deleteAccountAction() {
  try {
    const response = await DeleteAccountQuery();
    if (response.ok) {
      return { ok: true };
    } else {
      throw new Error("Account deletion failed.");
    }
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

export async function doSignInWithGoogle() {
  await signIn("google", { callbackUrl: process.env.MAIN_URL });
}

export async function updateAddressAction(address) {
  try {
    if (
      address?.city.trim().length === 0 ||
      address?.address.trim().length === 0 ||
      address?.address.trim().length === 0 ||
      address?.location.trim().length === 0
    ) {
      return {
        error: "all-error",
        message: "All field required !",
      };
    } else {
      const result = await UpdateAddressQuery({
        city: address?.city.trim(),
        area: address?.area.trim(),
        address: address?.address?.trim(),
        location: address?.location?.trim(),
      });
      revalidatePath("/");
      return result;
    }
  } catch (err) {
    throw new Error(err);
  }
}

export async function addTocartAction(cartInfo) {
  try {
    const response = await AddToCartQuery(
      cartInfo?.productId,
      cartInfo?.quantity,
      cartInfo?.size
    );

    revalidatePath("/");
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getProductByIdAction(productId) {
  try {
    const response = await getProdcutById(productId);
    return response.product;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function deleteCartItemById(cartId) {
  try {
    const result = await delteCartItemById(cartId);
    if (result.ok) {
      revalidatePath("/");
      return result;
    }
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
}
export async function minusCoupon(couponCode) {
  try {
    const response = await getDiscount(couponCode);
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function orderAction(parameter, cartIds, mode) {
  try {
    const response = await placeOrderQuery(parameter, cartIds, mode);
    if (response.ok) {
      revalidatePath("/");
      return response;
    } else {
      return response;
    }
  } catch (err) {
    throw new Error(err.message);
  }
}
export async function updateCart(updatedId, updatedData) {
  try {
    const response = await updateCartQuery(updatedId, updatedData);
    revalidatePath("/");
    return response;
  } catch (err) {
    throw new Error("Something went wrong while updating cart");
  }
}
