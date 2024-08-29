import { connect_db } from "@/configs/database";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect_db();

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const userData = await User.findOne({ _id: userId }).select("-password");
    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(userData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
