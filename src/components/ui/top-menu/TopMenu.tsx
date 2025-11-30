"use client";
import { useEffect, useState } from 'react';

import Link from "next/link";
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";

import { titleFont } from "@/config/fonts";
import { useCartStore, useUIStore } from "@/store";
import { Category } from '@prisma/client';
import { useCategoryStore } from '@/store/category/cart-category';


interface Props {
  categorias: Category[];
}

export const TopMenu = ( { categorias }: Props ) => {

  const openSideMenu = useUIStore( ( state ) => state.openSideMenu );
  const totalItemsInCart = useCartStore( ( state ) => state.getTotalItems() );

  const categoryStore = useCategoryStore( ( state ) => state.categoryName );
  const setCategoryStore = useCategoryStore( ( state ) => state.setCategory );

  const [ loaded, setLoaded ] = useState( false );
  const [ productoBuscado, setProductoBuscado ] = useState( "" );

  useEffect( () => {
    setLoaded( true );
  }, [] );

  const buscarProducto = () => {
    // Lógica para buscar producto
    console.log( "Buscando producto:", productoBuscado );
    if ( productoBuscado.trim() !== "" ) {
      window.location.replace( `/products/${ encodeURIComponent( productoBuscado.trim() ) }` );
    }
  }


  return (
    <nav className="sticky top-0 z-10 shadow-md">
      {/* Barra superior gris oscuro estilo Myshop */ }
      <div className="flex px-5 py-3 justify-between items-center w-full bg-myshop-gray">

        {/* Logo */ }
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className={ `${ titleFont.className } antialiased font-bold text-2xl text-myshop-orange` }>
              My
            </span>
            <span className="text-white text-xl font-semibold">| Shop</span>
          </Link>
        </div>

        {/* Barra de búsqueda central - desktop */ }
        <div className="hidden md:flex flex-1 max-w-2xl mx-8">
          <div className="flex w-full bg-white rounded overflow-hidden">
            <input
              type="text"
              placeholder="¿Qué estás buscando?"
              className="flex-1 px-4 py-2.5 outline-none text-gray-700 text-sm"
              value={ productoBuscado }
              onChange={ ( e ) => setProductoBuscado( e.target.value ) }
              onKeyDown={ ( e ) => {
                if ( e.key === 'Enter' ) {
                  buscarProducto();
                }
              } }
            />
            <button className="px-8 bg-myshop-orange hover:bg-myshop-orange-dark transition-colors" onClick={ buscarProducto }>
              <IoSearchOutline className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Categorías - desktop */ }
        <div className="hidden lg:flex items-center mr-4">
          <select
            className="bg-white text-gray-700 rounded h-10 px-4 outline-none hover:bg-gray-50 transition-colors cursor-pointer border border-gray-200"
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

        {/* Iconos de acción */ }
        <div className="flex items-center gap-4">
          <Link href="/search" className="md:hidden">
            <IoSearchOutline className="w-6 h-6 text-white hover:text-myshop-orange transition-colors" />
          </Link>

          <Link href={
            ( ( totalItemsInCart === 0 ) && loaded )
              ? '/empty'
              : "/cart"
          }>
            <div className="relative">
              { ( loaded && totalItemsInCart > 0 ) && (
                <span className="fade-in absolute text-xs px-1.5 min-w-[20px] text-center rounded-full font-bold -top-2 -right-2 bg-myshop-orange text-white">
                  { totalItemsInCart }
                </span>
              ) }
              <IoCartOutline className="w-6 h-6 text-white hover:text-myshop-orange transition-colors" />
            </div>
          </Link>

          <button
            onClick={ openSideMenu }
            className="px-4 py-2 rounded transition-all text-white hover:text-myshop-orange font-semibold text-sm"
          >
            MENÚ
          </button>
        </div>
      </div>

      {/* Barra de categorías móvil */ }
      <div className="flex justify-center items-center bg-myshop-orange py-3 lg:hidden">
        <span className="text-white font-semibold mr-3 text-sm">CATEGORÍAS</span>
        <select
          className="bg-white text-gray-700 rounded h-9 px-3 outline-none text-sm"
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
    </nav>
  );
};

