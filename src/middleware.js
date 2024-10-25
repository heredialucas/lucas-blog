import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUrl } from "./app/api/util/utils";
import * as jwt from "jose";

export async function middleware(request) {
  // const { pathname } = request.nextUrl;
  // const url = await getUrl();
  // const cookieStore = cookies().get("token");

  // // Split pathname into segments
  // const pathnameRoutes = pathname.split("/");

  // // Function to verify JWT token
  // const verifyToken = async (token, domain) => {
  //   const secret = new TextEncoder().encode(
  //     `${process.env.JWT_SECRET}${domain}`
  //   );
  //   try {
  //     const { payload } = await jwt.jwtVerify(token, secret);
  //     return payload;
  //   } catch (error) {
  //     return null;
  //   }
  // };

  // // Define route groups
  // const authPaths = ["login", "register"];
  // const publicRoutes = ["jobs", "contact", "blog"];
  // const configRoutes = ["config"];
  // const subscriberRoutes = ["create", "edit"];

  // if (cookieStore) {
  //   const { token, domain } = cookieStore;
  //   const user = await verifyToken(token, domain);

  //   if (!user) {
  //     return NextResponse.redirect(`${url}/auth/login`);
  //   }
  // }

  // // if (pathname.startsWith("/blogui")) {
  // //   return NextResponse.next();
  // // }
  // if (authPaths.some((route) => pathnameRoutes.includes(route))) {
  //   return NextResponse.redirect(`${url}/auth/login`);
  // }
  // if (configRoutes.some((route) => pathnameRoutes.includes(route))) {
  //   return NextResponse.redirect(`${url}/auth/login`);
  // }
  // if (subscriberRoutes.some((route) => pathnameRoutes.includes(route))) {
  //   return NextResponse.redirect(`${url}/auth/login`);
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
