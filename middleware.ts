import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define public routes that don't require authentication
const publicRoutes = [
  "/",
  "/auth",
  "/auth/student/login",
  "/auth/student/signup",
  "/auth/student/forgot-password",
  "/auth/student/reset-password",
  "/auth/student/verify-email",
  "/auth/admin/login",
  "/docs",
  "/status",
  "/terms",
  "/privacy",
  "/contributing",
  "/api/auth/login",
  "/api/auth/signup",
  "/api/auth/forgot-password",
  "/api/auth/reset-password",
  "/api/auth/verify-email",
  "/api/auth/logout",
];

// Define admin routes that require admin authentication
const adminRoutes = [
  "/admin",
  "/admin/analytics",
  "/admin/security",
  "/admin/content",
  "/admin/students",
  "/admin/batches",
  "/admin/exams",
];

// Define student routes that require student authentication
const studentRoutes = ["/student", "/student/exam", "/student/results"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check for authentication token
  const token =
    request.cookies.get("auth-token")?.value ||
    request.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) {
    // Redirect to appropriate login page based on the route
    if (adminRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/auth/admin/login", request.url));
    }
    if (studentRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/auth/student/login", request.url));
    }
    // Default redirect for unknown protected routes
    return NextResponse.redirect(new URL("/auth/student/login", request.url));
  }

  // Verify token and check user role (you'll need to implement this based on your auth strategy)
  try {
    // For now, we'll just check if token exists
    // In a real implementation, you'd verify the JWT token and extract user role
    const userRole = request.cookies.get("user-role")?.value || "student";

    // Check admin routes access
    if (adminRoutes.some((route) => pathname.startsWith(route))) {
      if (userRole !== "admin" && userRole !== "super_admin") {
        return NextResponse.redirect(
          new URL("/auth/admin/login?error=unauthorized", request.url)
        );
      }
    }

    // Check student routes access
    if (studentRoutes.some((route) => pathname.startsWith(route))) {
      if (userRole !== "student") {
        return NextResponse.redirect(
          new URL("/auth/student/login?error=unauthorized", request.url)
        );
      }
    }

    return NextResponse.next();
  } catch (error) {
    // Token is invalid, redirect to login
    if (adminRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(
        new URL("/auth/admin/login?error=invalid_token", request.url)
      );
    }
    if (studentRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(
        new URL("/auth/student/login?error=invalid_token", request.url)
      );
    }
    return NextResponse.redirect(
      new URL("/auth/student/login?error=invalid_token", request.url)
    );
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
