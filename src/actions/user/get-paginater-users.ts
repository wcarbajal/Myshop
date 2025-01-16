'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { State } from '@prisma/client';


export const getPaginatedUsers = async() => {

  const session = await auth();

  if ( session?.user.role !== 'admin' ) {
    return {
      ok: false,
      message: 'Debe de ser un usuario administrador'
    }
  }
  
  const users = await prisma.user.findMany({
    orderBy: {
      name: 'desc'
    },
    where: {
      state: State.activo
    }
  });

  return {
    ok: true,
    users: users
  }


}