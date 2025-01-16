'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';


export const changeBrandState = async( brandId: string, state: string ) => {

  const session = await auth();

  if ( session?.user.role !== 'admin' ) {
    return {
      ok: false,
      message: 'Debe de estar autenticado como admin'
    }
  }

  try {

    const newState = state === 'activo' ? 'activo':'inactivo';


    const brandUpdate = await prisma.brands.update({
      where: {
        id: brandId
      },
      data: {
        state: newState
      }
    })

    revalidatePath('/admin/brands');

    return {
      ok: true
    }
    
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo actualizar el estado, revisar logs'
    }
  }



}