import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import * as jwt from "jose";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request) {
  const { email, password } = await request.json();

  const user = await prisma.client.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json({
      authenticated: false,
      message: "User not found",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return NextResponse.json({
      authenticated: false,
      message: "Invalid password",
    });
  }

  const { domain } = user;
  const secret = new TextEncoder().encode(`${process.env.JWT_SECRET}${domain}`);
  const token = await new jwt.SignJWT({
    id: user.id,
    email: user.email,
    domain,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("4h")
    .sign(secret);

  return NextResponse.json({
    authenticated: true,
    message: "Login successful",
    token,
    domain,
  });
}
