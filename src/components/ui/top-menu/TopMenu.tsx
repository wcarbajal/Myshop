"use client";
import { useEffect, useState } from 'react';

import Link from "next/link";
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";

import { titleFont } from "@/config/fonts";
import { useCartStore, useUIStore } from "@/store";
import { Category } from '@prisma/client';
import { useCategoryStore } from '@/store/category/cart-category';
import { AdminBarcodeSearch } from '@/components/product/admin-barcode-search/AdminBarcodeSearch';
import { searchProductByBarcode } from '@/actions';
import { useRouter } from 'next/navigation';


interface Props {
  categorias: Category[];
  isAdmin?: boolean;
}

export const TopMenu = ( { categorias, isAdmin = false }: Props ) => {

  const router = useRouter();
  const openSideMenu = useUIStore( ( state ) => state.openSideMenu );
  const totalItemsInCart = useCartStore( ( state ) => state.getTotalItems() );

  const categoryStore = useCategoryStore( ( state ) => state.categoryName );
  const setCategoryStore = useCategoryStore( ( state ) => state.setCategory );

  const [ loaded, setLoaded ] = useState( false );
  const [ productoBuscado, setProductoBuscado ] = useState( "" );

  useEffect( () => {
    setLoaded( true );
  }, [] );

  const handleBarcodeSearch = async ( barcode: string ) => {
    const result = await searchProductByBarcode( barcode );

    if ( result.ok && result.product ) {
      // Redirigir al producto encontrado
      router.push( `/product/${ result.product.slug }` );
    } else {
      alert( `❌ ${ result.message }\n\nCódigo: ${ barcode }` );
    }
  };

  const buscarProducto = () => {
    // Lógica para buscar producto
    console.log( "Buscando producto:", productoBuscado );
    if ( productoBuscado.trim() !== "" ) {
      window.location.replace( `/products/${ encodeURIComponent( productoBuscado.trim() ) }` );
    }
  };


  return (
    <nav className="sticky top-0 z-20 shadow-md">
      {/* Barra superior gris oscuro estilo Myshop */ }
      <div className="flex px-3 sm:px-5 py-2 sm:py-3 justify-between items-center w-full bg-myshop-gray">

        {/* Logo */ }
        <div className="flex items-center flex-shrink-0">
          <Link href="/" className="flex items-center gap-1 sm:gap-2">
            <span className={ `${ titleFont.className } antialiased font-bold text-xl sm:text-2xl text-myshop-orange` }>
              Mary
            </span>
            <span className="text-white text-base sm:text-xl font-semibold">| Shop</span>
          </Link>
        </div>

        {/* Iconos de acción */ }
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          

          {/* Botón de búsqueda por código de barras para admins */ }
          { isAdmin && (
            <div className="">
              <AdminBarcodeSearch onProductFound={ handleBarcodeSearch } />
            </div>
          ) }

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
              <IoCartOutline className="w-5 h-5 sm:w-6 sm:h-6 text-white hover:text-myshop-orange transition-colors" />
            </div>
          </Link>

          <button
            onClick={ openSideMenu }
            className="px-2 sm:px-4 py-1.5 sm:py-2 rounded transition-all text-white hover:text-myshop-orange font-semibold text-xs sm:text-sm"
          >
            MENÚ
          </button>
        </div>
      </div>



      {/* Barra de busqueda y  categorías móvil */ }
      <div className=" sm:flex justify-center py-1 bg-myshop-orange gap-3">
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
    </nav>
  );
};

