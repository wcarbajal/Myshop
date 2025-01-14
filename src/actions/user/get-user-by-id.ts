'use server';

import prisma from '@/lib/prisma';
import { State } from '@prisma/client';


export const getUserById = async ( id: string ) => {


  try {

    const user = await prisma.user.findFirst( {
      where: {
        id: id,        
        NOT: {
          state: State.inactivo,
        }
      },
      
      
    })


  if ( !user ) return null;

  return user ;


} catch ( error ) {
  console.log( error );
  throw new Error( 'Error al obtener el usuario por Id' );
}



}