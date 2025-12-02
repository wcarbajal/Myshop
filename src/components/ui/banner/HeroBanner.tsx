"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Banner {
  id: number;
  title: string;
  subtitle?: string;
  image: string;
  link: string;
  bgColor?: string;
}

const banners: Banner[] = [
  {
    id: 1,
    title: "Ofertas de la Semana",
    subtitle: "Hasta 50% de descuento en productos seleccionados",
    image: "/imgs/banner-1.jpg",
    link: "/products",
    bgColor: "bg-gradient-to-r from-propio-green to-propio-green-light"
  },
  {
    id: 2,
    title: "Nueva Colección",
    subtitle: "Descubre lo último en tendencias",
    image: "/imgs/banner-2.jpg",
    link: "/products",
    bgColor: "bg-gradient-to-r from-blue-600 to-blue-800"
  },
  {
    id: 3,
    title: "Envío Gratis",
    subtitle: "En compras mayores a S/100",
    image: "/imgs/banner-3.jpg",
    link: "/products",
    bgColor: "bg-gradient-to-r from-orange-500 to-red-600"
  }
];

export const HeroBanner = () => {
  const [ currentSlide, setCurrentSlide ] = useState( 0 );

  useEffect( () => {
    const interval = setInterval( () => {
      setCurrentSlide( ( prev ) => ( prev + 1 ) % banners.length );
    }, 5000 );

    return () => clearInterval( interval );
  }, [] );

  const goToSlide = ( index: number ) => {
    setCurrentSlide( index );
  };

  const nextSlide = () => {
    setCurrentSlide( ( prev ) => ( prev + 1 ) % banners.length );
  };

  const prevSlide = () => {
    setCurrentSlide( ( prev ) => ( prev - 1 + banners.length ) % banners.length );
  };

  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-lg mb-8 shadow-lg">
      {/* Slides */ }
      { banners.map( ( banner, index ) => (
        <div
          key={ banner.id }
          className={ `absolute inset-0 transition-opacity duration-700 ${ index === currentSlide ? 'opacity-100' : 'opacity-0'
            }` }
        >
          <Link href={ banner.link } className="block w-full h-full">
            <div className={ `relative w-full h-full ${ banner.bgColor }` }>
              <div className="container mx-auto h-full flex items-center justify-between px-8">
                <div className="text-white z-10 max-w-lg">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    { banner.title }
                  </h2>
                  { banner.subtitle && (
                    <p className="text-lg md:text-2xl mb-6">
                      { banner.subtitle }
                    </p>
                  ) }
                  <button className="bg-white text-propio-green px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                    Ver Ofertas
                  </button>
                </div>

                {/* Imagen decorativa (opcional) */ }
                <div className="hidden lg:block relative w-1/2 h-full">
                  {/* Aquí puedes agregar imágenes de productos */ }
                </div>
              </div>
            </div>
          </Link>
        </div>
      ) ) }

      {/* Controles de navegación */ }
      <button
        onClick={ prevSlide }
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10"
        aria-label="Anterior"
      >
        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={ nextSlide }
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10"
        aria-label="Siguiente"
      >
        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicadores */ }
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        { banners.map( ( _, index ) => (
          <button
            key={ index }
            onClick={ () => goToSlide( index ) }
            className={ `w-3 h-3 rounded-full transition-all ${ index === currentSlide
              ? 'bg-white w-8'
              : 'bg-white/50 hover:bg-white/75'
              }` }
            aria-label={ `Ir al slide ${ index + 1 }` }
          />
        ) ) }
      </div>
    </div>
  );
};
