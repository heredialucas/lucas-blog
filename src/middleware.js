import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUrl } from "./app/api/util/utils";
import * as jwt from "jose";

export async function middleware(request) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const url = await getUrl();
  const cookiesStore = cookies().get("token");

  if (cookiesStore) {
    const { payload: isValidToken } = await jwt.jwtVerify(
      cookiesStore.value,
      secret
    );

    if (request.nextUrl.pathname === "/admin/auth/login" && isValidToken) {
      return NextResponse.redirect(`${url}/blog`);
    }

    if (request.nextUrl.pathname === "/admin/auth/register" && isValidToken) {
      return NextResponse.redirect(`${url}/blog`);
    }
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/admin/create")) {
    return NextResponse.redirect(`${url}/admin/auth/login`);
  }

  if (request.nextUrl.pathname.startsWith("/admin/edit")) {
    return NextResponse.redirect(`${url}/admin/auth/login`);
  }

  return NextResponse.next();
}
