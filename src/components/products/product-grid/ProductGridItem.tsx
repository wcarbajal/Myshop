'use client';


import Image from 'next/image';
import Link from 'next/link';

import { Product } from '@/interfaces';
import { useState } from 'react';
import { currencyFormat } from '@/utils';

interface Props {
  product: Product;
}


export const ProductGridItem = ( { product }: Props ) => {

  const [ displayImage, setDisplayImage ] = useState( product.images[ 0 ] );
  const [ isHovered, setIsHovered ] = useState( false );


  return (
    <div
      className="rounded overflow-hidden fade-in bg-white border border-gray-200 hover:border-myshop-orange hover:shadow-lg transition-all duration-300 flex flex-col h-full group"
      onMouseEnter={ () => setIsHovered( true ) }
      onMouseLeave={ () => setIsHovered( false ) }
    >

      <Link className="relative block overflow-hidden" href={ `/product/${ product.slug }` }>
        <div className="relative bg-white p-4 h-48 sm:h-56 md:h-64 flex items-center justify-center">
          <Image
            src={ displayImage }
            alt={ product.title }
            className={ `w-full h-full object-contain transition-transform duration-300 ${ isHovered ? 'scale-105' : 'scale-100' }` }
            width={ 500 }
            height={ 500 }
            priority
            onMouseEnter={ () => setDisplayImage( product.images[ 1 ] ) }
            onMouseLeave={ () => setDisplayImage( product.images[ 0 ] ) }
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col gap-y-2 border-t border-gray-100 flex-1">
        {/* Marca */ }
        { product.brand?.name && (
          <span className="text-gray-500 text-xs uppercase tracking-wider font-semibold">
            { product.brand.name }
          </span>
        ) }

        {/* Título del producto */ }
        <Link
          className="hover:text-myshop-orange transition-colors text-sm font-bold line-clamp-2 min-h-[40px] text-gray-900"
          href={ `/product/${ product.slug }` }>
          { product.title }
        </Link>

        {/* Descripción */ }
        <Link
          className="text-gray-500 text-xs line-clamp-2 hover:text-myshop-orange transition-colors"
          href={ `/product/${ product.slug }` }>
          { product.description }
        </Link>

        {/* Medida */ }
        { product.descriptionMeasure && (
          <span className="text-gray-500 text-xs">{ product.descriptionMeasure }</span>
        ) }

        {/* Precio */ }
        <div className="mt-2">
          <span className="text-2xl font-bold text-myshop-orange">
            { currencyFormat( product.price ) }
          </span>
        </div>

        {/* Botón agregar al carrito */ }
        <button className="mt-2 w-full bg-myshop-orange hover:bg-myshop-orange-dark text-white py-2.5 px-4 rounded transition-all duration-300 font-bold text-sm uppercase">
          Agregar
        </button>
      </div>

    </div>
  );
};