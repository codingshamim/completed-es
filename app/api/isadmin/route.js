import { dbConnect } from "@/app/backend/connection/dbConnect";
import { UserModel } from "@/app/backend/models/UserModel";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const loggedAuth = await auth();
    const userId = loggedAuth?.user?.id;

    if (!userId) {
      return NextResponse.json(
        {
          error: true,
          message: "User not authenticated!",
          ok: false,
        },
        { status: 401 }
      );
    }

    await dbConnect();

    // Use findOne to get a single document
    const user = await UserModel.findOne({ _id: userId }).select("role");

    // Check if user exists and their role is 'admin'
    if (user && user.role === "admin") {
      return NextResponse.json(
        {
          error: null,
          message: "Successfully authenticated as admin",
          ok: true,
          isAdmin: true,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          error: true,
          message: "Unauthorized! User is not an admin.",
          ok: false,
          isAdmin: false,
        },
        { status: 403 } // Changed to 403 Forbidden instead of 401
      );
    }
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      {
        error: true,
        message: "Something went wrong",
        ok: false,
        details: err.message,
      },
      { status: 500 }
    );
  }
}
