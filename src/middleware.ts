import { NextRequestWithAuth, withAuth } from "next-auth/middleware";

// old code:
// export async function middleware(req: NextRequest) {
//   const token = await getToken({ req });

//   if (!token) {
//     return NextResponse.redirect(new URL("/signin", req.nextUrl));
//   }
// }

export default withAuth(function middleware(req: NextRequestWithAuth) {}, {
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

export const config = {
  matcher: ["/u/:path*"],
};
