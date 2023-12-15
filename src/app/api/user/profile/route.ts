import { authOptions } from "@/libs/auth";
import { prisma } from "@/libs/prisma";
import { ProfileValidator } from "@/validators/profile";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  try {
    console.log("✅ GET: /api/user/profile");

    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          data: "Unauthorized",
        }),
        { status: 401 }
      );
    }

    if (!session?.user?.permissions?.includes("read:profile")) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          data: "Unauthorized",
        }),
        { status: 401 }
      );
    }

    const profile = await prisma.profile.findUnique({
      where: {
        userId: session?.user?.id,
      },
    });

    if (!profile) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          data: "Profile not found",
        }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        status: "ok",
        data: profile,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        data: "Profile not found",
      }),
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    console.log("✅ PATCH: /api/user/profile");

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

    if (!session?.user?.permissions?.includes("write:profile")) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          data: "Unauthorized",
        }),
        { status: 401 }
      );
    }

    const body = await request.json();
    const result = ProfileValidator.parse(body);

    const profile = await prisma.profile.update({
      where: {
        userId: session?.user?.id,
      },
      data: {
        designation: result.designation,
        company: result.company,
        website: result.website,
        location: result.location,
        publicEmail: result.publicEmail,
        publicPhone: result.publicPhone,
        dateOfBirth: result.dateOfBirth,
        gender: result.gender,
        pronouns: result.pronouns,
        headline: result.headline,
        biography: result.biography,
        linkedin: result.linkedin,
        github: result.github,
        twitter: result.twitter,
        facebook: result.facebook,
        instagram: result.instagram,
        discord: result.discord,
      },
    });

    return new NextResponse(
      JSON.stringify({
        status: "ok",
        data: profile,
        message: "Profile updated successfully",
      }),
      { status: 200 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          type: "ZodError",
          message: error.issues[0].message,
        }),
        { status: 400 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: "Profile update failed",
      }),
      { status: 500 }
    );
  }
}
