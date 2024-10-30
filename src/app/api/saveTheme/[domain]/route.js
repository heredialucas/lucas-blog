import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request, { params }) {
  const { domain } = params;
  const theme = await request.json();

  try {
    const user = await prisma.client.update({
      where: {
        domain,
      },
      data: {
        theme,
      },
    });

    if (!user) {
      return NextResponse.json({
        message: "User not found",
      });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Failed to save theme:", error);
    return NextResponse.json({
      error,
      message: "Failed to create user",
    });
  }
}
