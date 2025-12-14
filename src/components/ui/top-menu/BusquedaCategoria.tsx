'use client';
import { useCategoryStore } from '@/store';
import { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { Category } from '@prisma/client';

interface Props {
  categorias: Category[];

}

export const BusquedaCategoria = ( { categorias }: Props ) => {

  const [ productoBuscado, setProductoBuscado ] = useState( "" );

  const categoryStore = useCategoryStore( ( state ) => state.categoryName );
  const setCategoryStore = useCategoryStore( ( state ) => state.setCategory );

  const buscarProducto = () => {
    // Lógica para buscar producto
    console.log( "Buscando producto:", productoBuscado );
    if ( productoBuscado.trim() !== "" ) {
      window.location.replace( `/products/${ encodeURIComponent( productoBuscado.trim() ) }` );
    }
  };

  return (
    <div className="sticky top-[52px] sm:top-[60px] z-20 sm:flex justify-center py-1 bg-myshop-orange gap-3 shadow-md -mx-10">
      <div className="flex py-1 justify-center px-2 gap-1">
        <input
          type="text"
          placeholder="¿Qué estás buscando?"
          className="flex-1 px-4 py-1 outline-none text-gray-700 text-sm rounded-md"
          value={ productoBuscado }
          onChange={ ( e ) => setProductoBuscado( e.target.value ) }
          onKeyDown={ ( e ) => {
            if ( e.key === 'Enter' ) {
              buscarProducto();
            }
          } }
        />
        <button className="px-5 rounded-md bg-slate-600 hover:bg-myshop-orange-dark transition-colors" onClick={ buscarProducto }>
          <IoSearchOutline className="w-5 h-5 text-white" />
        </button>

      </div>

      <div className="flex items-center py-1 justify-center">
        <span className="text-white font-semibold mr-3 text-xs ">CATEGORÍAS</span>
        <select
          className="bg-white text-gray-700 rounded h-6 px-3 outline-none text-sm"
          value={ categoryStore }
          onChange={ ( e ) => {
            setCategoryStore( e.target.value );
            window.location.replace( `/category/${ e.target.value }` );
          } }>
          { categorias.map( ( cat ) => (
            <option key={ cat.id } value={ cat.name }>{ cat.name }</option>
          ) ) }
        </select>
      </div>

    </div>
  );
};