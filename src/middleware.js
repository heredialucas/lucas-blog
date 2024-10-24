import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUrl } from "./app/api/util/utils";
import * as jwt from "jose";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const url = await getUrl();
  const cookiesStore = cookies().get("token");

  // Function to verify JWT token
  const verifyToken = async (token, domain) => {
    const secret = new TextEncoder().encode(
      `${process.env.JWT_SECRET}${domain}`
    );
    try {
      const { payload } = await jwt.jwtVerify(token, secret);
      return payload;
    } catch (error) {
      return null;
    }
  };

  // Define routes
  const publicRoutes = ["/", "/jobs", "/contact"];
  const subscriberOnlyRoutes = [
    "/blog/[id]",
    "/create",
    "/edit/[id]",
    "config[domain]",
  ];
  const authRoutes = ["/auth/login", "/auth/register"];

  const pathSegments = pathname.split("/");

  // Allow access to authentication routes
  if (authRoutes.some((route) => pathname.endsWith(route))) {
    return NextResponse.next();
  }

  // Handle /blogui routes (static documentation)
  if (pathname.startsWith("/blogui")) {
    return NextResponse.next();
  }

  // Allow direct access to user profiles and their public routes
  // This includes: /[domain] and /[domain]/jobs
  if (pathSegments.length >= 2 && pathSegments[1] !== "") {
    const subscriberOnlyRoutes = protectedDynamicRoutes.some((route) =>
      pathname.includes(route)
    );
    const isSubscriberRoute = subscriberOnlyRoutes.some((route) =>
      pathname.includes(route)
    );

    // If it's not a protected route or subscriber-only route, allow access
    if (!isProtectedRoute && !isSubscriberRoute) {
      return NextResponse.next();
    }
  }

  // If no token exists (not logged in users)
  if (!cookiesStore) {
    // Redirect to login only for protected routes
    if (
      protectedDynamicRoutes.some((route) => pathname.includes(route)) ||
      subscriberOnlyRoutes.some((route) => pathname.includes(route))
    ) {
      return NextResponse.redirect(new URL("/auth/login", url));
    }

    return NextResponse.next();
  }

  // For logged in users, verify their token
  const tokenData = await verifyToken(cookiesStore.value, pathSegments[1]);

  if (!tokenData) {
    return NextResponse.redirect(new URL("/auth/login", url));
  }

  // Check if user is trying to access protected routes of another domain
  if (
    protectedDynamicRoutes.some((route) => pathname.includes(route)) &&
    tokenData.domain !== pathSegments[1]
  ) {
    return NextResponse.redirect(new URL("/blogui", url));
  }

  // Handle non-subscribed users
  if (
    !tokenData.isSubscribed &&
    subscriberOnlyRoutes.some((route) => pathname.includes(route))
  ) {
    return NextResponse.redirect(new URL("/blogui", url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
