import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUrl } from "./app/api/util/utils";
import * as jwt from "jose";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const url = await getUrl();
  const cookieToken = cookies().get("token");
  const cookieDomain = cookies().get("domain");

  const pathnameRoutes = pathname.split("/");
  const pathnameUser = pathnameRoutes[1];

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

  const authPaths = ["login", "register"];
  const publicRoutes = ["jobs", "contact"];
  const blogRoutes = ["blog"];
  const configRoutes = ["config"];
  const pricingRoutes = ["pricing"];
  const subscriberRoutes = ["create", "edit"];
  const bloguiRoutes = ["blogui"];

  if (pathnameRoutes.length <= 2 && !cookieToken) {
    if (pathname === "/") {
      return NextResponse.redirect(`${url}/blogui`);
    }
    if (bloguiRoutes.some((route) => pathname.includes(route))) {
      return NextResponse.next();
    }
    if (pricingRoutes.some((route) => pathname.includes(route))) {
      return NextResponse.next();
    }

    const { client } = await fetch(
      `${url}/api/clientByDomain/${pathnameUser}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());

    if (!client) {
      return NextResponse.redirect(`${url}/blogui`);
    }

    return NextResponse.next();
  }

  if (!cookieToken) {
    if (bloguiRoutes.some((route) => pathname.includes(route))) {
      return NextResponse.next();
    }
    if (configRoutes.some((route) => pathname.includes(route))) {
      return NextResponse.redirect(`${url}/auth/login`);
    }
    if (pricingRoutes.some((route) => pathname.includes(route))) {
      return NextResponse.next();
    }
    if (subscriberRoutes.some((route) => pathname.includes(route))) {
      return NextResponse.redirect(`${url}/auth/login`);
    }

    if (blogRoutes.some((route) => pathname.includes(route))) {
      const { client } = await fetch(
        `${url}/api/clientByDomain/${pathnameUser}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());

      if (!client) {
        return NextResponse.redirect(`${url}/blogui`);
      }

      if (client) {
        if (!client.isSubscribed) {
          return NextResponse.redirect(`${url}/${client.domain}`);
        }
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  if (cookieToken) {
    const token = cookieToken.value;
    const domain = cookieDomain.value;

    let modifiedPath =
      pathnameUser === "config" ? pathnameRoutes[2] : pathnameRoutes[1];
    const user = await verifyToken(token, modifiedPath);

    if (!user) {
      return NextResponse.redirect(`${url}/${domain}`);
    }

    if (configRoutes.some((route) => pathname.includes(route))) {
      return NextResponse.next();
    }

    if (authPaths.some((route) => pathname.includes(route))) {
      return NextResponse.redirect(`${url}/${domain}`);
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
