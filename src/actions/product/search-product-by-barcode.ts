'use server';

import prisma from '@/lib/prisma';

export const searchProductByBarcode = async ( barcode: string ) => {
  try {
    const product = await prisma.product.findFirst( {
      where: {
        codigoean13: barcode
      },
      include: {
        ProductImage: {
          take: 1
        },
        brand: true,
        category: true       
        
      }
    } );

    if ( !product ) {
      return {
        ok: false,
        message: 'Producto no encontrado'
      };
    }

    return {
      ok: true,
      product: {
        id: product.id,
        title: product.title,
        slug: product.slug,
        price: product.price,
        inStock: product.inStock,
        brand: product.brand?.name,
        category: product.category?.name,
        image: product.ProductImage[ 0 ]?.url || '/imgs/placeholder.jpg'
      }
    };

  } catch ( error ) {
    console.error( 'Error al buscar producto:', error );
    return {
      ok: false,
      message: 'Error al buscar el producto'
    };
  }
};
