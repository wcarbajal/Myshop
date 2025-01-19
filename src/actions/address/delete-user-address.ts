'use server';

import prisma from '@/lib/prisma';



export const deleteUserAddress = async( userId: string ) => {

  try {
    if (!userId){
      return {
        ok: false,
        message: 'Debe proporcionar un id de usuario'
      }
    }

    const deleted = await prisma.userAddress.delete({
      where: { userId }
    });
    if(!deleted){
      return {
        ok: false,
        message: 'No se encontró la dirección para el usuario'
      }
    }

    return { ok: true };
    
  } catch (error) {
    console.log(error);
  
    return {
      ok: false,
      message: 'No se pudo eliminar la direccion'
    }


}
}