import { NextResponse } from "next/server";

export async function POST(request) {
  const USER_ADMIN = process.env.USER_ADMIN;
  const PASSWORD = process.env.PASSWORD;

  const { user, password } = await request.json();

  const isAuthenticated = user === USER_ADMIN && password === PASSWORD;

  return NextResponse.json({ authenticated: isAuthenticated });
}
