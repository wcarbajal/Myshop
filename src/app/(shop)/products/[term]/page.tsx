import { getCategories, getSearchProductsWithImages } from '@/actions';
import { ProductGrid, Title } from '@/components';


interface Props {
  params: {
    term: string;
  };
}

export default async function ProductsFound( { params }: Props ) {

  const term = decodeURIComponent( params.term || "" );

  const result = await getSearchProductsWithImages( { term } );
  const { products } = result;

  // Importar y usar las categorías

  //const categories = await getCategories();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner Hero */ }
      {/*   */ }

      {/* Sección de Categorías */ }
      {/*  <CategorySection categories={ categories } /> */ }

      {/* Productos */ }
      <div className="container mx-auto px-4 py-8">
        <Title
          title={`Busqueda de "${term}"`}
          subtitle="Lista de productos encontrados"
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

        {/* <Pagination totalPages={ totalPages } /> */ }
      </div>
    </div>
  );
}