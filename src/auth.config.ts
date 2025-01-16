
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcryptjs from 'bcryptjs';
import { z } from 'zod';
import { loginSchema } from './lib/auth-schema';
import prisma from './lib/prisma';
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        
        const { data, success, error } = loginSchema.safeParse(credentials);

        if(!success){
          throw new Error("Credenciales incorrectas");
        }
        const user = await prisma.user.findUnique({
          where: {
            email: data.email,
          },
        })
        if(!user || !user.password){
          throw new Error("Credenciales incorrectas o usuario no encontrado");
        }
        const isValid = await bcryptjs.compare(data.password, user.password);

        if(!isValid){
          throw new Error("Credenciales incorrectas");
        }

        return user
      },
    }),
  ],
} satisfies NextAuthConfig

export {} 