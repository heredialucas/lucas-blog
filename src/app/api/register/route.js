import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request) {
  const {
    email,
    password,
    firstName,
    lastName,
    imageUrl,
    domain,
    resumeLink,
    timeline,
    hero,
  } = await request.json();

  const user = await prisma.client.findFirst({
    where: {
      email,
    },
  });

  if (user) {
    return NextResponse.json({
      registered: false,
      message: "El usuario ya existe",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.client.create({
    data: {
      email,
      password: hashedPassword,
      imageUrl,
      firstName,
      lastName,
      domain,
      resumeLink,
      timeline,
      hero,
    },
  });

  if (!newUser) {
    return NextResponse.json({
      registered: false,
      message: "Error al registrar el usuario",
    });
  }

  return NextResponse.json({
    registered: true,
    message: "Usuario creado correctamente",
  });
}
