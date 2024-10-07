import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  const { title, category, summary, authorName, imageUrl, referencePostUrl } =
    await req.json();

  try {
    const newPost = await prisma.post.create({
      data: {
        title: title,
        category: category,
        summary: summary,
        authorName: authorName,
        imageUrl: imageUrl,
        referencePostUrl: referencePostUrl,
        date: new Date().toISOString(),
      },
    });

    return new NextResponse(JSON.stringify({ newPost }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al crear o recuperar posts:", error);
    return new NextResponse(
      JSON.stringify({ error: "No se pudo crear o recuperar posts" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany();

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

    return new NextResponse(JSON.stringify({ deletePost }), {
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
