import Link from 'next/link';
import { Category } from '@prisma/client';

interface Props {
  categories: Category[];
}

export const CategorySection = ( { categories }: Props ) => {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Compra por Categorías
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          { categories.slice( 0, 12 ).map( ( category ) => (
            <Link
              key={ category.id }
              href={ `/category/${ category.name }` }
              className="group flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {/* Círculo con icono o imagen */ }
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-propio-green to-propio-green-light flex items-center justify-center mb-3 group-hover:shadow-lg transition-shadow">
                <span className="text-3xl md:text-4xl text-white">
                  { getCategoryIcon( category.name ) }
                </span>
              </div>

              {/* Nombre de categoría */ }
              <span className="text-center text-sm md:text-base font-medium text-gray-700 group-hover:text-propio-green transition-colors">
                { category.name }
              </span>
            </Link>
          ) ) }
        </div>

        {/* Ver todas las categorías */ }
        { categories.length > 12 && (
          <div className="text-center mt-8">
            <Link
              href="/category"
              className="inline-block bg-propio-green hover:bg-propio-green-dark text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              Ver todas las categorías
            </Link>
          </div>
        ) }
      </div>
    </section>
  );
};

// Función helper para obtener iconos según categoría
function getCategoryIcon( categoryName: string ): string {
  const icons: { [ key: string ]: string; } = {
    'Electrónica': '📱',
    'Ropa': '👕',
    'Hogar': '🏠',
    'Deportes': '⚽',
    'Juguetes': '🎮',
    'Libros': '📚',
    'Alimentos': '🍎',
    'Belleza': '💄',
    'Automotriz': '🚗',
    'Mascotas': '🐕',
    'Herramientas': '🔧',
    'Jardín': '🌿',
  };

  // Buscar coincidencia parcial
  for ( const [ key, icon ] of Object.entries( icons ) ) {
    if ( categoryName.toLowerCase().includes( key.toLowerCase() ) ) {
      return icon;
    }
  }

  return '📦'; // Icono por defecto
}
