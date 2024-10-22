import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const { domain } = params;

  try {
    const posts = await prisma.post.findMany({
      where: { clientDomain: domain },
    });

    return new NextResponse(JSON.stringify({ posts }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al recuperar posts:", error);
    return new NextResponse(
      JSON.stringify({ error: "No se pudo recuperar posts" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE() {
  try {
    const deletePost = await prisma.post.deleteMany({});
    const deleteClient = await prisma.client.deleteMany({});

    return new NextResponse(JSON.stringify({ deletePost, deleteClient }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al eliminar posts:", error);
    return new NextResponse(
      JSON.stringify({ error: "No se pudo eliminar los posts" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}
