import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";


import prisma from './lib/prisma'; //todo: se podria cambiar como el ejemplo
import authConfig from './auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth( {
 adapter: PrismaAdapter( prisma ),
  ...authConfig,
  session: {
    strategy: "jwt",
    maxAge: 300 // 60*60 
  },
  callbacks: {
    // jwt() se ejecuta cada vez que se crea o actualizar un token JWT
    //Aquí es donde puedes agregar información adicional al token
    jwt( { token, user } ) {
     
      if ( user ) { // User is available during sign-in
        token.role = user.role;
        token.id = user.id ;
      }
      return token;
    },
    
    // session() se utiliza para agregar  la información del token a la session del usuario
    // lo que hace es que esté disponible en el cliente
    session( { session, token } ) {
      
      
      if (session.user) {
        
          session.user.role = token.role
          session.user.id = token.id ?? '';
        
      }

      return session;
    },
  },




} );