const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const Delete = async () => {
  try {
    await prisma.post.deleteMany({});
    await prisma.client.deleteMany({});
    console.log("Posts and clients deleted successfully");
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
};

Delete();
