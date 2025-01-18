'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Gender, Measure, Product, Size } from '@prisma/client';
import { z } from 'zod';
import { v2 as cloudinary } from 'cloudinary';
import { User } from '@/interfaces';
import bcryptjs from 'bcryptjs';
import Image from 'next/image';

cloudinary.config( process.env.CLOUDINARY_URL ?? '' );

const userSchema = z.object( {
  id: z.string().uuid().optional().nullable(),
  name: z.string().min( 3 ).max( 255 ),
  email: z.string().email(),
  telefono: z.string().optional().nullable(),
  password: z.string(),
  image: z.string().optional().nullable(),
  role: z.enum( [ 'admin', 'user' ] ),
  state: z.enum( [ 'activo', 'inactivo' ] ),
  createdAt: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
} );


export const createUpdateUser = async ( formData: FormData ) => {


  const data = Object.fromEntries( formData );
  const userParsed = userSchema.safeParse( data );

  if ( !userParsed.success ) {

    return { ok: false };
  }

  const user = userParsed.data;

  console.log( { user } );
  const { id, ...rest } = user;



  try {
    const prismaTx = await prisma.$transaction( async ( tx ) => {

      
      let userNewUpdate;
      let publicId: string = '';


      if ( id ) {
        // Actualizar
        userNewUpdate = await prisma.user.update( {
          where: { id },
          data: {
            name: rest.name,
            email: rest.email,
            telefono: rest.telefono,
            role: rest.role,
            state: rest.state
          }
        } );
        if ( rest.password === '' ) {
          // Hashear contraseña
          const passwordNew = await bcryptjs.hashSync( rest.password, 10 );
          await prisma.user.update( {
            where: {
              id
            },
            data: {
              password: passwordNew
            }
          } );
        }

        //Obtener imagen guardada
        const imageUrl = await prisma.user.findUnique({
          where: {
            id
          },
          select: {
            image: true
          }
        })

       

        if ( typeof imageUrl?.image == 'string' ) {
          publicId = imageUrl.image.split( '/' ).pop()?.split( '.' )[ 0 ] ?? '';
        }



      } 
      else {
        // Crear password
        const passwordNew = await bcryptjs.hashSync( rest.password, 10 );

        userNewUpdate = await prisma.user.create( {
          data: {
            name: rest.name,
            email: rest.email,
            telefono: rest.telefono,
            password: passwordNew,
            role: rest.role,
          }

        } );

      }

      // Proceso de carga y guardado de imagenes
      // Recorrer las imagenes y guardarlas
      if ( formData.getAll( 'image' ) ) {
        // [https://url.jpg, https://url.jpg]



        const images = await uploadImages( formData.getAll( 'image' ) as File[], publicId );

        if ( !images ) {
          throw new Error( 'No se pudo cargar las imágenes, rollingback' );
        }

        await prisma.user.update( {
          where: {
            id: userNewUpdate.id
          },
          data: {
            image: images[ 0 ],
          }
        } );

      }

      return {
        userNewUpdate
      };
    } );


    // Todo: RevalidatePaths
    revalidatePath( '/admin/users' );
    revalidatePath( `/admin/user/${ user.id }` );



    return {
      ok: true,
      user: prismaTx.userNewUpdate,
    };


  }
  catch ( error ) {

    return {
      ok: false,
      message: 'Revisar los logs, no se pudo actualizar/crear'
    };
  }

};



const uploadImages = async ( images: File[], publicid: string ) => {



  try {


    const uploadPromises = images.map( async ( image ) => {

      try {
        const Body = await image.arrayBuffer();

        const base64Image = Buffer.from( Body ).toString( 'base64' );
        let resultado;

        if ( publicid !== '' ) {
          console.log( 'esta imagen se borrarà: ' + publicid );
          cloudinary.uploader.destroy( publicid );
        }

        resultado = cloudinary.uploader.upload( `data:image/png;base64,${ base64Image }`, {
          folder: 'users'

        } ).then( r => r.secure_url );


        return resultado;

      } catch ( error ) {
        console.log( error );
        return null;
      }
    } );


    const uploadedImages = await Promise.all( uploadPromises );
    return uploadedImages;


  } catch ( error ) {

    console.log( error );
    return null;

  }


};
