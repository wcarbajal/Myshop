'use server';

import prisma from '@/lib/prisma';
import { State } from '@prisma/client';

/**
 * Busca una marca por nombre (case insensitive)
 * Si no existe, la crea automáticamente con estado 'activo'
 */
export const findOrCreateBrand = async ( brandName: string ): Promise<{ ok: boolean; brandId?: string; message?: string; }> => {
  try {
    if ( !brandName || brandName.trim() === '' ) {
      return { ok: false, message: 'El nombre de la marca está vacío' };
    }

    const normalizedName = brandName.trim();

    // Buscar marca existente (case insensitive)
    let brand = await prisma.brands.findFirst( {
      where: {
        name: {
          equals: normalizedName,
          mode: 'insensitive'
        }
      }
    } );

    // Si existe, retornar el ID
    if ( brand ) {
      console.log( `Marca encontrada: ${ brand.name } (ID: ${ brand.id })` );
      return {
        ok: true,
        brandId: brand.id,
        message: `Marca existente: ${ brand.name }`
      };
    }

    // Si no existe, crear nueva marca con estado activo
    brand = await prisma.brands.create( {
      data: {
        name: normalizedName,
        state: 'activo' as State
      }
    } );

    console.log( `Nueva marca creada: ${ brand.name } (ID: ${ brand.id })` );

    return {
      ok: true,
      brandId: brand.id,
      message: `Nueva marca creada: ${ brand.name }`
    };

  } catch ( error ) {
    console.error( 'Error en findOrCreateBrand:', error );
    return {
      ok: false,
      message: 'Error al buscar o crear la marca'
    };
  }
};
