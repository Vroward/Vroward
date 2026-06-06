import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token as any;
    if (req.nextUrl.pathname.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/client", req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        if (req.nextUrl.pathname.startsWith("/client") || req.nextUrl.pathname.startsWith("/admin")) {
          return token !== null;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/client/:path*", "/admin/:path*"],
};