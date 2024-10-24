import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(request, { params }) {
  const { domain } = params;
  const {
    firstName,
    lastName,
    imageUrl,
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
      domain,
    },
  });

  if (!user) {
    return NextResponse.json({
      registered: false,
      message: "User not found",
    });
  }

  const newUser = await prisma.client.update({
    data: {
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
    where: {
      domain,
    },
  });

  if (!newUser) {
    return NextResponse.json({
      configurated: false,
      message: "Failed to config user",
    });
  }

  return NextResponse.json({
    configurated: true,
    message: "User config successfully",
  });
}
