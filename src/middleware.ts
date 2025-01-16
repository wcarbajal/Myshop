import NextAuth from "next-auth"
import authConfig from "./auth.config"
 
export const { auth: middleware } = NextAuth(authConfig)

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',]

};