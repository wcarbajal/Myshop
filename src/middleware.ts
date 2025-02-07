import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { NextResponse } from 'next/server';
 
const { auth: middleware } = NextAuth(authConfig)

const publicRoutes = [
  "/",
  "/login",
  "/api/auth/verify-mail",
  "/auth/login",
  "/api/auth/signin"
]
export default  middleware((req) =>{
  const { nextUrl, auth } = req;

  const isLoggedIn = !!auth?.user

  //proteger lsd rutas
  if (!isLoggedIn && !publicRoutes.includes(nextUrl.pathname)) {
    return NextResponse.redirect( new URL("/auth/login", nextUrl) );
  }
 return NextResponse.next()

});
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/']

};