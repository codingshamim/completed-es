import NextAuth from "next-auth";
import { PUBLIC_ROUTES, LOGIN, ROOT } from "@/routes";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth; // Check if the user is authenticated
  const currentPath = nextUrl.pathname;

  // Check if the current route is public
  const isPublicRoute =
    PUBLIC_ROUTES.some((route) => currentPath.startsWith(route)) ||
    currentPath === ROOT;

  // Redirect authenticated users only from login or register pages
  if (
    isAuthenticated &&
    (currentPath === LOGIN || currentPath === "/register")
  ) {
    return Response.redirect(new URL(ROOT, nextUrl));
  }

  // Allow authenticated users to access public routes like /goodbye or /shop
  if (isAuthenticated && isPublicRoute) {
    return;
  }

  // Redirect unauthenticated users from protected routes to the login page
  if (!isAuthenticated && !isPublicRoute) {
    return Response.redirect(new URL(LOGIN, nextUrl));
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
