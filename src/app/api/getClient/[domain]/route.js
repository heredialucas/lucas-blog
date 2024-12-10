import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const { domain } = await params;

  try {
    const client = await prisma.client.findUnique({
      where: { domain },
    });

    return NextResponse.json({ client });
  } catch (error) {
    return NextResponse.json({ error });
  } finally {
    await prisma.$disconnect();
  }
}
