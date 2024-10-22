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
    return new NextResponse(
      JSON.stringify({ newPost, message: "Post created successfully" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Failed to create post:", error);
    return new NextResponse(
      JSON.stringify({ message: "Failed to create post" }),
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

    return new NextResponse(JSON.stringify({ post, message: "Post found" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to get post:", error);
    return new NextResponse(JSON.stringify({ message: "Failed to get post" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
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

    return new NextResponse(
      JSON.stringify({ post, message: "Post edited successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Failed to edit post:", error);
    return new NextResponse(
      JSON.stringify({ message: "Failed to edit post" }),
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

    return new NextResponse(
      JSON.stringify({ post, message: "Post deleted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Failed to delete post:", error);
    return new NextResponse(
      JSON.stringify({ message: "Failed to delete post" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}
