import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const { domain } = params;

  try {
    const client = await prisma.client.findFirst({
      where: { domain },
    });

    return new NextResponse(JSON.stringify({ client }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al recuperar el cliente:", error);
    return new NextResponse(
      JSON.stringify({ error: "No se pudo recuperar el cliente" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}
