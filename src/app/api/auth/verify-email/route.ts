import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';

export async function GET( request: NextRequest ) {

  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get( 'token' );


  if ( !token ) {
    return new Response( "Token no enviado", { status: 400 } );
  }

  // verificar si el token ya expiró
  const verifyToken = await prisma.verificationToken.findFirst( {
    where: {
      token: token,
    },
  } );

  if ( !verifyToken ) {
    return new Response( "Token no encontrado", { status: 401 } );
  }

  if ( verifyToken.expiresAt < new Date() ) {
    return new Response( "Token expirado", { status: 401 } );
  }
  // verificar si el email ya esta verificado

  const user = await prisma.user.findFirst( {
    where: {
      email: verifyToken.identifier,
    },
  } );

  if ( user?.emailVerified ) {
    return new Response( "El email ya ha sido verificado", { status: 400 } );
  }

  //marcar el email como veridicado

  await prisma.user.update( {
    where: {
      email: verifyToken.identifier,
    },
    data: {
      emailVerified: new Date(),
    },
  } );

  await prisma.verificationToken.delete( {
    where: {
      identifier: verifyToken.identifier,
    },
  } );

  redirect( "/auth/login?verified=true" );


}