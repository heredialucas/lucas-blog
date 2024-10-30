import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request, { params }) {
  const { domain } = params;
  const { theme } = await request.json();
  try {
    const user = await prisma.client.update({
      where: {
        domain,
      },
      data: {
        theme,
      },
    });
    return new NextResponse(JSON.stringify({ user }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to save theme:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to save theme" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
