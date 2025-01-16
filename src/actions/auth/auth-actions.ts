'use server';

import { signIn } from '@/auth';
import { loginSchema, RegisterSchema } from '@/lib/auth-schema';
import prisma from '@/lib/prisma';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import bcryptjs from 'bcryptjs';


export const loginAction = async (
  values: z.infer<typeof loginSchema>
) => {

  try {

    await signIn( 'credentials', {
      email: values.email,
      password: values.password,       
      
    } );
    return {success: true};

  } catch ( error ) {
    if(error instanceof AuthError) {
      return {error: error.cause?.err?.message}
    }
    console.error( error );
  }
};

export const registerAction = async (
  values: z.infer<typeof RegisterSchema>
) => {

  try {

    const {data, success, error} = RegisterSchema.safeParse(values);

    if (!success) {
      return { error: 'Invalid data' };
    }
    //verificar si el usuario existe
    const user = await prisma.user.findUnique(
      { where: { email: data.email } 
    });
    if (user) {
      return { error: 'El email ya está registrado' };
    }
    const hashedPassword = await bcryptjs.hash(data.password, 10);

    //crear usiario
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email.toLowerCase(),
        password: hashedPassword,
        role: 'user'
      }
    });
    await signIn( 'credentials', {
      email: data.email,
      password: data.password,       
      redirect: false
      
    } );
    return {success: true};

  } catch ( error ) {
    if(error instanceof AuthError) {
      return {error: error.cause?.err?.message}
    }
    console.error( error );
    return { error: 'Error 500' };
  }
};