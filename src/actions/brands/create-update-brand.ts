'use server';

import prisma from '@/lib/prisma';
import { State } from '@prisma/client';

export const createUpdateBrand = async ( id: string, nombre: string, estado: State ) => {

  // Normalizar el nombre: eliminar espacios al inicio/final y múltiples espacios entre palabras
  const nombreNormalizado = nombre.trim().replace( /\s+/g, ' ' );

  // Capitalizar cada palabra (primera letra en mayúscula)
  const nombreCapitalizado = nombreNormalizado
    .toLowerCase()
    .split( ' ' )
    .map( palabra => palabra.charAt( 0 ).toUpperCase() + palabra.slice( 1 ) )
    .join( ' ' );

  try {
    if ( id === 'new' ) {
      console.log( `la marca ${ nombreNormalizado } con estado ${ estado } fue creado` );

      const busqueda = await prisma.brands.findFirst( {
        where: {
          name: {
            equals: nombreNormalizado,
            mode: 'insensitive'
          }
        }
      } );

      // Si ya existe la marca, retornar error
      if ( busqueda ) {
        return { ok: false, message: 'Esta marca ya existe' };
      }

      const newBrand = await prisma.brands.create( {
        data: {
          name: nombreCapitalizado,
          state: estado
        }
      } );

      if ( !newBrand ) {
        return { ok: false, message: 'Marca no fue registrada' };
      }
      return { ok: true, message: 'Marca creada exitosamente' };

    } else {
      console.log( `la marca ${ nombreNormalizado } con estado ${ estado } fue actualizado` );
      const updatedBrand = await prisma.brands.update( {
        where: { id },
        data: {
          name: nombreCapitalizado,
          state: estado
        }
      } );

      if ( !updatedBrand ) {
        return { ok: false, message: 'Marca no fue actualizada' };
      }
      return { ok: true, message: 'Marca actualizada exitosamente' };
    }
  } catch ( error ) {
    console.log( error );
    return { ok: false, message: 'Marca no creada/ actualizada ' };
  }






};
