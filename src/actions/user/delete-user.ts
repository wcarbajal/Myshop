'use server';

import prisma from '@/lib/prisma';


export const DeleteUser = async ( userId: string ) => {


  try {

    const userById = await prisma.user.findMany( { where: { id: userId } } );

    if ( !userById ) {
      return {
        ok: false,
        message: 'No se puede eliminar el usuario',
      };
    }

    const userDelete = await prisma.user.update( { 
      where: { id: userId },
      data: { 
        state:'inactivo'
       }
    } );

    if ( !userDelete ) {
      return {
        ok: false,
        message: 'Usuario no encontrado',
      };

    }

    return {
      ok: true,
      message: 'Usuario eliminado correctamente',
    };
  } catch ( error ) {
    console.error( error );
    throw new Error( 'Error eliminando usuario' );
  }
};