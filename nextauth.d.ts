/* import NextAuth, { DefaultSession } from 'next-auth';




declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      emailVerified?: Date | null;
      role: string;
      image?: string;
      telefono: string;
      
    } & DefaultSession['user'];
  }
} */