import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request) {
  const { email, password } = await request.json();

  const user = await prisma.client.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json({
      authenticated: false,
      message: "Usuario no encontrado",
    });
  }

  isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return NextResponse.json({
      authenticated: false,
      message: "Contraseña incorrecta",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "6h",
    }
  );

  return NextResponse.json({
    authenticated: true,
    token,
  });
}
