'use client';

import { useRouter, usePathname } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';

export const BackButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleBack = () => {
    // Obtener la ruta padre
    const segments = pathname.split( '/' ).filter( Boolean );

    if ( segments.length > 1 ) {
      // Remover el último segmento para ir a la ruta padre
      segments.pop();
      const parentPath = '/' + segments.join( '/' );
      router.push( parentPath );
    } else {
      // Si estamos en /ventas, volver a la raíz
      router.push( '/' );
    }
  };

  return (
    <button
      onClick={ handleBack }
      className="flex items-center space-x-2 text-white hover:text-myshop-orange transition-colors"
    >
      <IoArrowBack className="text-2xl" />
      <span className="hidden sm:inline font-semibold">Volver</span>
    </button>
  );
};
