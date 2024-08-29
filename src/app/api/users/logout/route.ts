import { connect_db } from "@/configs/database";
import { NextRequest, NextResponse } from "next/server";

connect_db();

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: "Logout successfully",
      success: true,
      user: null,
    });
    response.cookies.delete("nextauth-token");
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
