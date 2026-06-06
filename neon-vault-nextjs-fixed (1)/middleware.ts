import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const token = req.auth;
  if (req.nextUrl.pathname.startsWith("/admin") && token?.user?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/client", req.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/client/:path*", "/admin/:path*", "/api/orders/:path*", "/api/tickets/:path*"],
};