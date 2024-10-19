import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import * as jwt from "jose";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request) {
  const { email, password } = await request.json();

  const user = await prisma.client.findFirst({
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

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return NextResponse.json({
      authenticated: false,
      message: "Contraseña incorrecta",
    });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new jwt.SignJWT({ id: user.id, email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("6h")
    .sign(secret);

  return NextResponse.json({
    authenticated: true,
    message: "Usuario autenticado",
    token,
  });
}
