export const LoadingSkeleton = () => {
  return (
    <div className="bg-gray-50 min-h-screen animate-pulse">
      {/* Banner Hero Skeleton */ }
      <div className="container mx-auto px-4 pt-6">
        <div className="bg-gray-300 rounded-lg h-[300px] md:h-[400px] w-full"></div>
      </div>

      {/* Sección de Categorías Skeleton */ }
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          { [ ...Array( 6 ) ].map( ( _, i ) => (
            <div key={ i } className="bg-white rounded-lg p-4 shadow">
              <div className="bg-gray-300 h-20 w-20 rounded-full mx-auto mb-3"></div>
              <div className="bg-gray-300 h-4 w-20 rounded mx-auto"></div>
            </div>
          ) ) }
        </div>
      </div>

      {/* Título de Productos Skeleton */ }
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="bg-gray-300 h-8 w-64 rounded mb-2"></div>
          <div className="bg-gray-300 h-4 w-96 rounded"></div>
        </div>

        {/* Grid de Productos Skeleton */ }
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-10">
          { [ ...Array( 10 ) ].map( ( _, i ) => (
            <div key={ i } className="bg-white rounded-lg overflow-hidden shadow">
              {/* Imagen */ }
              <div className="bg-gray-300 h-48 w-full"></div>

              {/* Contenido */ }
              <div className="p-4 space-y-3">
                {/* Título */ }
                <div className="bg-gray-300 h-4 w-full rounded"></div>
                <div className="bg-gray-300 h-4 w-3/4 rounded"></div>

                {/* Precio */ }
                <div className="bg-gray-300 h-6 w-24 rounded"></div>

                {/* Botón */ }
                <div className="bg-gray-300 h-10 w-full rounded"></div>
              </div>
            </div>
          ) ) }
        </div>

        {/* Paginación Skeleton */ }
        <div className="flex justify-center gap-2">
          { [ ...Array( 5 ) ].map( ( _, i ) => (
            <div key={ i } className="bg-gray-300 h-10 w-10 rounded"></div>
          ) ) }
        </div>
      </div>
    </div>
  );
};
