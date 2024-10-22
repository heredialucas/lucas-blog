import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req, { params }) {
  const { id } = params;
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
        clientDomain: id,
      },
    });
    return new NextResponse(JSON.stringify({ newPost }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al crear post:", error);
    return new NextResponse(
      JSON.stringify({ error: "No se pudo crear el post" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const post = await prisma.post.findUnique({ where: { id: parseInt(id) } });

    return new NextResponse(JSON.stringify({ post }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al recuperar post:", error);
    return new NextResponse(
      JSON.stringify({ error: "No se pudo recuperar post" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PATCH(req, { params }) {
  const { id } = params;
  const { rawFormData } = await req.json();
  const { title, category, summary, authorName, referencePostUrl } =
    rawFormData;

  try {
    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        title: title,
        category: category,
        summary: summary,
        authorName: authorName,
        referencePostUrl: referencePostUrl,
        date: new Date().toISOString(),
      },
    });

    return new NextResponse(JSON.stringify({ post }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al editar el post:", error);
    return new NextResponse(
      JSON.stringify({ error: "No se pudo editar el post" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const post = await prisma.post.delete({ where: { id: parseInt(id) } });

    return new NextResponse(JSON.stringify({ post }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al eliminar post:", error);
    return new NextResponse(
      JSON.stringify({ error: "No se pudo eliminar post" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}
