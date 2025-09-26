import NextAuth from "next-auth";
import { PUBLIC_ROUTES, LOGIN, ROOT } from "@/routes";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export const adminRoutes = [
  "/creator/categories",
  "/creator/inbox",
  "/creator/orders",
  "/creator/order",
  "/creator/product",
  "/creator/products",
];

export default auth(async (req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;
  const currentPath = nextUrl.pathname;

  const isPublicRoute =
    PUBLIC_ROUTES.some((route) => currentPath.startsWith(route)) ||
    currentPath === ROOT;

  // Prevent logged-in users from visiting login/register
  if (
    isAuthenticated &&
    (currentPath === LOGIN || currentPath === "/register")
  ) {
    return Response.redirect(new URL(ROOT, nextUrl));
  }

  // Allow authenticated users to visit public routes
  if (isAuthenticated && isPublicRoute) {
    return;
  }

  // ✅ Block non-admin users from admin routes
  // if (isAdminRoute && userRole !== "admin") {
  //   return Response.redirect(new URL(ROOT, nextUrl));
  // }

  // Redirect unauthenticated users trying to access protected routes
  if (!isAuthenticated && !isPublicRoute) {
    return Response.redirect(new URL(LOGIN, nextUrl));
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
