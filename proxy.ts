import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const basicAuth = request.headers.get("authorization");
  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (basicAuth && expectedUser && expectedPassword) {
    const [scheme, encoded] = basicAuth.split(" ");
    if (scheme === "Basic" && encoded) {
      try {
        const decoded = atob(encoded);
        const separator = decoded.indexOf(":");
        const user = separator >= 0 ? decoded.slice(0, separator) : "";
        const pass = separator >= 0 ? decoded.slice(separator + 1) : "";

        if (user === expectedUser && pass === expectedPassword) {
          const response = NextResponse.next();
          response.headers.set("Cache-Control", "no-store");
          return response;
        }
      } catch {
        // Malformed credentials are handled as an authentication failure below.
      }
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "Cache-Control": "no-store",
      "WWW-Authenticate": 'Basic realm="MacroSaver administration"',
    },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/api/price-test"],
};
