import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  try {
    const blob = await put(filename, request.body, {
      access: "public",
    });
    return NextResponse.json(blob);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to upload image" });
  }
}
