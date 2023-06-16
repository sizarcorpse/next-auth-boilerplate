import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.nextUrl));
  }
}
export const config = {
  matcher: ["/profile", "/profile/update"],
};
