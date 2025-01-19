import { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string | undefined;
      name: string;
      email: string;
      emailVerified?: Date | null;
      role?: string ;
      telefono?: string |null;
      image?: string;

    } & DefaultSession[ "user" ];
  }

  interface User {
    id: string | undefined;
    name: string;
    email: string;
    emailVerified?: Date | null;
    role?: string;
    telefono?: string | null;
    image?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string | undefined;
    name: string;
    email: string;
    emailVerified?: Date | null;
    role?: string;
    telefono?: string | null;
    image?: string;
  }
}