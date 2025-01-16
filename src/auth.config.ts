
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcryptjs from 'bcryptjs';
import { z } from 'zod';
import { loginSchema } from './lib/auth-schema';
import prisma from './lib/prisma';
import { nanoid } from "nanoid";
import { sendEmailVerification } from './lib/mail';

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials( {
      authorize: async ( credentials ) => {

        const { data, success, error } = loginSchema.safeParse( credentials );

        if ( !success ) {
          throw new Error( "Credenciales incorrectas" );
        }
        const user = await prisma.user.findUnique( {
          where: {
            email: data.email,
          },
        } );
        if ( !user || !user.password ) {
          throw new Error( "Credenciales incorrectas o usuario no encontrado" );
        }
        const isValid = await bcryptjs.compare( data.password, user.password );

        if ( !isValid ) {
          throw new Error( "Credenciales incorrectas" );
        }
        // verificacion del email
        if ( !user.emailVerified ) {

          const verifiTokenExists = await prisma.verificationToken.findFirst({
            where: {
              identifier: user.email,
            },
          })

          if(verifiTokenExists?.identifier){
            await prisma.verificationToken.delete({
              where: {
                identifier: user.email,
              },
            })         

          }

          const token = nanoid()

          await prisma.verificationToken.create({
            data: {
              identifier: user.email,
              token,
              expiresAt: new Date(Date.now() + 1000*60*60*24), // 24 hour
            },
          })


          // enviar email de verificacion
          await sendEmailVerification(user.email, token)

          throw new Error('Pendiente de verificar e-mail desde su correo')






        }

        return user;
      },
    } ),
  ],
} satisfies NextAuthConfig;

export { }; 