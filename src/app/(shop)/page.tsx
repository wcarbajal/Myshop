export const revalidate = 60; // 60 segundos


import { redirect } from 'next/navigation';


import { Pagination, ProductGrid, Title } from '@/components';

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

  return (
    <>
      <Title
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2"
      />

      {
        (products.length === 0 )
          ? ( <span className="">No hay productos disponibles.</span> )
          : ( <ProductGrid
            products={ products }
          />
          )
      }

      <Pagination totalPages={ totalPages } /> 
    </>
  );
}
