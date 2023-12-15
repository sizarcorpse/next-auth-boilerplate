import { authOptions } from "@/libs/auth";
import { prisma } from "@/libs/prisma";
import { compare, hash } from "bcryptjs";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    console.log("✅ GET: /api/user");

    const session = (await getServerSession(authOptions)) as Session;

    if (!session) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: "Unauthorized",
        }),
        { status: 401 }
      );
    }

    if (!session?.user?.permissions?.includes("read:user")) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: "Unauthorized",
        }),
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session?.user?.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        username: true,
      },
    });

    if (!user) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: "User not found",
        }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        status: "ok",
        data: user,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: "User not found",
      }),
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    console.log("✅ PATCH: /api/user");

    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: "Unauthorized",
        }),
        { status: 401 }
      );
    }

    const data: any = {};
    const body = await request.json();
    const { name, email, username, currentPassword, newPassword } = body;

    if (name !== session?.user?.name) {
      data["name"] = name;
    }

    if (email !== session?.user?.email || username !== session?.user.username) {
      const um = session?.user?.username === username ? undefined : username;
      const em = session?.user?.email === email ? undefined : email;

      const IsUserExists = await prisma.user.findFirst({
        where: {
          OR: [
            {
              username: um,
            },
            {
              email: em,
            },
          ],
        },
      });

      if (IsUserExists) {
        return new NextResponse(
          JSON.stringify({
            status: "error",
            message: "Username or email is already taken",
          }),
          { status: 400 }
        );
      } else {
        data["username"] = um;
        data["email"] = em;
      }
    }

    if (currentPassword && newPassword) {
      const user = await prisma.user.findUnique({
        where: {
          id: session?.user?.id,
        },
        select: {
          password: true,
          accounts: true,
        },
      });

      const isPasswordMatch = await compare(
        currentPassword,
        user?.password as string
      );

      if (
        isPasswordMatch &&
        Object.keys(user?.accounts as object).length === 0
      ) {
        const hashedPassword = await hash(newPassword, 12);
        data["password"] = hashedPassword;
      } else {
        return new NextResponse(
          JSON.stringify({
            status: "error",
            message: "Password is incorrect",
          }),
          { status: 400 }
        );
      }
    }

    const user = await prisma.user.update({
      where: {
        id: session?.user?.id,
      },
      data: data,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        username: true,
      },
    });

    return new NextResponse(
      JSON.stringify({
        status: "ok",
        data: user,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: "User not found",
      }),
      { status: 500 }
    );
  }
}
