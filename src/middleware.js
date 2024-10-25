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

  const authRoutes = ["auth", "login", "register"];
  const publicRoutes = ["/", "jobs", "contact", "blog", "blogui"];
  const registeredRoutes = ["config"];
  const subscriberRoutes = ["create", "edit"];
  const bloguiRoutes = ["blogui"];

  const pathSegments = pathname.split("/");
  if (!cookiesStore) {
    if (bloguiRoutes.some((route) => pathSegments.includes(route))) {
      return NextResponse.next();
    }

    if (registeredRoutes.some((route) => pathSegments.includes(route))) {
      return NextResponse.rewrite(new URL("/auth/login", request.url));
    }

    if (subscriberRoutes.some((route) => pathSegments.includes(route))) {
      return NextResponse.rewrite(new URL("/auth/login", request.url));
    }
  }

  if (cookiesStore) {
    const token = cookiesStore.value;
    const decodedToken = await verifyToken(token, pathSegments[1]);
    const domain = decodedToken?.domain;

    if (authRoutes.some((route) => pathSegments.includes(route))) {
      return NextResponse.rewrite(new URL(`/${domain}`, request.url));
    }

    if (publicRoutes.some((route) => pathSegments.includes(route))) {
      return NextResponse.next();
    }

    if (registeredRoutes.some((route) => pathSegments.includes(route))) {
      return NextResponse.rewrite(new URL(`/${domain}`, request.url));
    }

    if (subscriberRoutes.some((route) => pathSegments.includes(route))) {
      return NextResponse.rewrite(new URL(`/${domain}`, request.url));
    }

    if (bloguiRoutes.some((route) => pathSegments.includes(route))) {
      return NextResponse.rewrite(new URL(`/${domain}`, request.url));
    }

    return NextResponse.rewrite(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
