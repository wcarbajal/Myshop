"use server";

import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";

interface SearchOptions {
  term?: string;
}

export const getSearchProductsWithImages = async ( {
  term = "",
}: SearchOptions ) => {
  try {
    // Validar que el término de búsqueda no esté vacío
    const searchTerm = term.trim();

    if ( !searchTerm || searchTerm.length < 2 ) {
      return { products: [] };
    }

    // 1. Obtener los productos que coincidan con el término en nombre o marca
    const products = await prisma.product.findMany( {
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            brand: {
              name: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          }
        ],
      },
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
        brand: {
          select: {
            id: true,
            name: true,
            state: true,
          },
        },
      },
    } );

    return {
      products: products.map( ( product ) => ( {
        ...product,
        images: product.ProductImage.map( ( image ) => image.url ),
        brand: product.brand ? {
          id: product.brand.id,
          name: product.brand.name,
          state: product.brand.state,
        } : null,
      } ) ),
    };
  } catch ( error ) {
    console.log( error );
    return { products: [] };
  }
};
