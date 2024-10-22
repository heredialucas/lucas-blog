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
    console.error("Failed to get posts:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to get posts" }),
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
    console.error("Failed to delete posts:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to delete posts" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}
