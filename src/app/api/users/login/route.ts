import { connect_db } from "@/configs/database";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect_db();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist", message: "User does not exist" },
      );
    }
    console.log(user);
    const validPass = await bcryptjs.compare(password, user.password);
    if (!validPass) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }
    const tokenData = {
      id: user._id,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "7d",
    });
    const response = NextResponse.json({
      message: "Login successfull!",
      success: true,
    });
    response.cookies.set("nextauth-token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
