import { prisma } from "@/libs/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, username, email, password } = (await req.json()) as {
      name: string;
      username: string;
      email: string;
      password: string;
    };

    const hashedPassword = await hash(password, 12);
    const isUserExists = await prisma.user.findFirst({
      where: {
        OR: [
          { username: username.toLowerCase() },
          { email: email.toLowerCase() },
        ],
      },
    });

    if (isUserExists) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: "Username or email already exist",
        }),
        { status: 400 }
      );
    }

    const user = await prisma.user.create({
      data: {
        name,
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password: hashedPassword,
        Role: {
          connect: {
            name: "USER",
          },
        },
      },
    });

    return NextResponse.json({
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
