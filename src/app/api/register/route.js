import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request) {
  const { email, password, domain } = await request.json();

  const user = await prisma.client.findFirst({
    where: {
      email,
      domain,
    },
  });

  if (user) {
    return NextResponse.json({
      registered: false,
      message: "Email or domain already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.client.create({
    data: {
      email,
      password: hashedPassword,
      domain,
    },
  });

  if (!newUser) {
    return NextResponse.json({
      registered: false,
      message: "Failed to create user",
    });
  }

  return NextResponse.json({
    registered: true,
    message: "User created successfully",
  });
}
