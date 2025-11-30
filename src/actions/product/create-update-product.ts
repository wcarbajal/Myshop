'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Gender, Measure, Product, Size } from '@prisma/client';
import { z } from 'zod';
import { v2 as cloudinary } from 'cloudinary';

/* const { S3Client } = require( "@aws-sdk/client-s3" );
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"; */


/* const s3Client = new S3Client( {
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
} ); */

/* const bucketName = process.env.AWS_BUCKET_NAME; */

cloudinary.config( process.env.CLOUDINARY_URL ?? '' );



const productSchema = z.object( {
  id: z.string().uuid().optional().nullable(),
  codigoean13: z.string().optional().nullable(),
  apiImageUrls: z.string().optional().nullable(),
  title: z.string().min( 3 ).max( 255 ),
  slug: z.string().min( 3 ).max( 255 ),
  description: z.string(),
  brandId: z.string( { message: 'Brand ID is required' } ),
  measure: z.enum( [ 'nodefinido',
    'barra',
    'bolsa',
    'botella',
    'caja',
    'frasco',
    'galonera',
    'gramo',
    'kilogramo',
    'lata',
    'litro',
    'mililitro',
    'pack',
    'paquete',
    'tetrapack',
    'unidad',
    'vaso' ] ).optional().nullable(),
  descriptionMeasure: z.string().optional().nullable(),
  price: z.coerce
    .number()
    .min( 0 )
    .transform( val => Number( val.toFixed( 2 ) ) ),
  inStock: z.coerce
    .number()
    .min( 0 )
    .transform( val => Number( val.toFixed( 0 ) ) ),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform( val => val.split( ',' ) ),
  tags: z.string(),
  gender: z.nativeEnum( Gender ),
} );



export const createUpdateProduct = async ( formData: FormData ) => {


  const data = Object.fromEntries( formData );
  const productParsed = productSchema.safeParse( data );

  if ( !productParsed.success ) {
    console.log( productParsed.error );
    return { ok: false };
  }

  const product = productParsed.data;
  const codigo = product.codigoean13 ?? 'xxxxxxxxxxxxx';

  product.slug = product.slug.toLowerCase().replace( / /g, '-' ).trim();




  const { id, codigoean13, apiImageUrls, ...rest } = product;

  // Parsear las URLs de imágenes de API si existen
  let imageUrlsFromApi: string[] = [];
  if ( apiImageUrls ) {
    try {
      imageUrlsFromApi = JSON.parse( apiImageUrls );
      console.log( `📥 URLs de imágenes recibidas: ${ imageUrlsFromApi.length }` );
    } catch ( error ) {
      console.error( 'Error al parsear apiImageUrls:', error );
    }
  }

  try {
    const prismaTx = await prisma.$transaction( async ( tx ) => {

      let product: Product;
      const tagsArray = rest.tags.split( ',' ).map( tag => tag.trim().toLowerCase() );

      if ( id ) {
        // Actualizar
        product = await prisma.product.update( {
          where: { id },
          data: {
            title: rest.title,
            codigoean13: codigo,
            description: rest.description,
            inStock: rest.inStock,
            price: rest.price,
            slug: rest.slug,
            descriptionMeasure: rest.descriptionMeasure ?? '',
            measure: rest.measure as Measure,
            categoryId: rest.categoryId,
            brandId: rest.brandId,
            gender: rest.gender,
            sizes: [],
            tags: {
              set: tagsArray,
            }

          }
        } );

      } else {
        // Crear

        product = await prisma.product.create( {
          data: {
            title: rest.title,
            codigoean13: codigo,
            description: rest.description,
            inStock: rest.inStock,
            price: rest.price,
            slug: rest.slug,
            descriptionMeasure: rest.descriptionMeasure ?? '',
            measure: rest.measure as Measure,
            categoryId: rest.categoryId,
            brandId: rest.brandId,
            gender: rest.gender,
            sizes: [],
            tags: {
              set: tagsArray
            }
          }
        } );

      }
      // Proceso de carga y guardado de imagenes
      // Recorrer las imagenes y guardarlas
      const allImageUrls: string[] = [];

      // 1. Subir archivos de imágenes locales
      if ( formData.getAll( 'images' ).length > 0 ) {
        const images = await uploadImages( formData.getAll( 'images' ) as File[] );
        if ( !images ) {
          throw new Error( 'No se pudo cargar las imágenes, rollingback' );
        }
        allImageUrls.push( ...images.filter( img => img !== null ) as string[] );
      }

      // 2. Agregar URLs de imágenes de API
      if ( imageUrlsFromApi.length > 0 ) {
        console.log( `🌐 Guardando ${ imageUrlsFromApi.length } URLs de imágenes de API` );
        allImageUrls.push( ...imageUrlsFromApi );
      }

      // 3. Guardar todas las URLs en la base de datos
      if ( allImageUrls.length > 0 ) {
        await prisma.productImage.createMany( {
          data: allImageUrls.map( url => ( {
            url: url,
            productId: product.id,
          } ) )
        } );
        console.log( `✅ Total de imágenes guardadas: ${ allImageUrls.length }` );
      }

      return {
        product
      };
    } );


    // Todo: RevalidatePaths
    revalidatePath( '/admin/products' );
    revalidatePath( `/admin/product/${ product.slug }` );
    revalidatePath( `/products/${ product.slug }` );


    return {
      ok: true,
      product: prismaTx.product,
    };


  } catch ( error ) {

    console.log( error );

    return {
      ok: false,
      message: 'Revisar los logs, no se pudo actualizar/crear',

    };
  }

};



const uploadImages = async ( images: File[] ) => {

  try {


    const uploadPromises = images.map( async ( image ) => {

      try {
        const Body = await image.arrayBuffer();
        const base64Image = Buffer.from( Body ).toString( 'base64' );

        return cloudinary.uploader.upload( `data:image/png;base64,${ base64Image }`, {
          folder: 'products',

        } )
          .then( r => r.secure_url );





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
