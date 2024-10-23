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

export async function PATCH(request) {
  const {
    email,
    password,
    firstName,
    lastName,
    imageUrl,
    domain,
    resumeLink,
    timeline,
    instagram,
    facebook,
    linkedin,
    twitter,
    hero,
  } = await request.json();

  const user = await prisma.client.findFirst({
    where: {
      email,
    },
  });

  if (user) {
    return NextResponse.json({
      registered: false,
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.client.create({
    data: {
      email,
      password: hashedPassword,
      imageUrl,
      firstName,
      lastName,
      domain,
      resumeLink,
      timeline,
      instagram,
      facebook,
      linkedin,
      twitter,
      hero,
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
