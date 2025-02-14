import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const isDashboardPage = req.nextUrl.pathname.startsWith("/dashboard");
  const isAuthPage = ["/login", "/signup"].includes(req.nextUrl.pathname);

  // Si estamos en login/signup, permitimos el acceso
  if (isAuthPage) {
    return NextResponse.next();
  }

  try {
    const response = await fetch("http://localhost:5000/auth/check-auth", {
      headers: {
        cookie: req.headers.get("cookie") || "",
      },
    });
    const data = await response.json();

    if (!data.authenticated) {
      if (isDashboardPage) {
        const loginUrl = new URL("/login", req.url);
        return NextResponse.redirect(loginUrl);
      }
    } else if (isAuthPage) {
      const dashboardUrl = new URL("/dashboard", req.url);
      return NextResponse.redirect(dashboardUrl);
    }
  } catch (error) {
    console.error("Error al verificar autenticación:", error);
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
