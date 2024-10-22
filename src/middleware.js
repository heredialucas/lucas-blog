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

  // URLs that require authentication
  const protectedDynamicRoutes = ["/create", "/edit"];

  const pathSegments = pathname.split("/");
  const isDynamicDomain =
    pathSegments.length > 1 &&
    protectedDynamicRoutes.includes(`/${pathSegments[2]}`);
  const domainFromPath = pathSegments[1]; // Dynamic part (domain) in the path

  // If no token and trying to access protected dynamic domain routes
  if (!cookiesStore && isDynamicDomain) {
    if (pathSegments[1] === "blogui") {
      return NextResponse.next();
    }
    return NextResponse.redirect(`${url}/auth/login`);
  }

  // If no token but trying to access the home page
  if (!cookiesStore && pathname === "/") {
    return NextResponse.redirect(`${url}/blogui`);
  }

  // If there's a token in cookies
  if (cookiesStore) {
    // Decode the token to extract the user's domain
    const { domain: tokenDomain } = jwt.decodeJwt(cookiesStore.value);
    const isValidToken = await verifyToken(cookiesStore.value, tokenDomain);

    // Check if the token is valid and belongs to the correct domain
    if (!isValidToken || tokenDomain !== domainFromPath) {
      // Redirect to login or show an error if the user is trying to access a domain they don't belong to
      return NextResponse.redirect(`${url}/${tokenDomain}`);
    }

    // Redirect logged-in users away from login/register pages if they are already authenticated
    if (pathname.startsWith("/auth/") && isValidToken) {
      return NextResponse.redirect(`${url}/${tokenDomain}`);
    }

    // Allow access to authenticated routes if the domain matches
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
