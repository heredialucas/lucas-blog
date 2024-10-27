import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { formatedString } from "../util/utils";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request) {
  const { email, password, domain } = await request.json();
  const formatedData = formatedString(domain);

  const user = await prisma.client.findFirst({
    where: {
      email,
      domain: formatedData,
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
      domain: formatedData,
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
