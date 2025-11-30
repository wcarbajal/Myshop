export const revalidate = 60; // 60 segundos


import { redirect } from 'next/navigation';


import { Pagination, ProductGrid, Title, HeroBanner, CategorySection } from '@/components';

import { Logout } from '@/components/logout/Logout';
import { auth } from '@/auth';
import { getPaginatedProductsWithImages } from '@/actions';




interface Props {
  searchParams: {
    page?: string;
  };
}


export default async function Home( { searchParams }: Props ) {

  //const session = await auth()

  const page = searchParams.page ? parseInt( searchParams.page ) : 1;

  const result = await getPaginatedProductsWithImages( { page } );
  const { products, totalPages } = result;

  // Importar y usar las categorías
  const { getCategories } = await import( '@/actions' );
  const categories = await getCategories();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner Hero */ }
      <div className="container mx-auto px-4 pt-6">
        <HeroBanner />
      </div>

      {/* Sección de Categorías */ }
      <CategorySection categories={ categories } />

      {/* Productos */ }
      <div className="container mx-auto px-4 py-8">
        <Title
          title="Ofertas de la Semana"
          subtitle="Los mejores precios en productos seleccionados"
          className="mb-6"
        />

        {
          ( products.length === 0 )
            ? (
              <div className="text-center py-12">
                <span className="text-gray-500 text-lg">No hay productos disponibles.</span>
              </div>
            )
            : ( <ProductGrid products={ products } /> )
        }

        <Pagination totalPages={ totalPages } />
      </div>
    </div>
  );
}
