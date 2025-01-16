'use server'

import { auth } from '@/auth';



export const retornarSession = async () => {
  const session = await auth();
  return session;
}