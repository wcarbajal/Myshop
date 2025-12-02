
export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table
import { getPaginatedOrders, getPaginatedProductsWithImages } from "@/actions";
import { DeleteButton, Pagination, ViewImage, Title } from "@/components";
import { currencyFormat } from "@/utils";
import Image from "next/image";

import Link from "next/link";
import { redirect } from "next/navigation";


interface Props {
  searchParams: {
    page?: string;
  };
}


export default async function OrdersPage( { searchParams }: Props ) {

  const page = searchParams.page ? parseInt( searchParams.page ) : 1;

  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages( { page } );

  const deleteProduct = async ( productId: string ) => {
    await deleteProduct( productId );
    redirect( '/admin/products' );
  };

  return (
    <>
    <Title title="Mantenimiento de productos" />

    <div className="flex justify-end mb-5">
      <Link href="/admin/product/new" className="btn-primary">
        Nuevo producto
      </Link>
    </div>

    <div className="mb-10">
      {/* Vista de lista para móviles */ }
      <div className="md:hidden space-y-4">
        { products.map( ( product ) => (
          <div
            key={ product.id }
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex gap-4 p-4">
              {/* Imagen a la izquierda */ }
              <div className="flex-shrink-0">
                <Link href={ `/product/${ product.slug }` }>
                  <ViewImage
                    src={ product.ProductImage[ 0 ]?.url }
                    width={ 100 }
                    height={ 100 }
                    alt={ product.title }
                    className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                  />
                </Link>
              </div>

              {/* Datos a la derecha */ }
              <div className="flex-1 flex flex-col justify-between min-w-0">
                {/* Información del producto */ }
                <div className="space-y-1">
                  <Link
                    href={ `/admin/product/${ product.slug }` }
                    className="text-base font-semibold text-myshop-gray hover:text-myshop-orange transition-colors line-clamp-2"
                  >
                    { product.title }
                  </Link>

                  <div className="space-y-1 text-xs">
                    <div>
                      <span className="font-medium text-gray-600">Marca: </span>
                      <span className="text-gray-900">{ product.brand?.name || 'Sin marca' }</span>
                    </div>

                    <div>
                      <span className="font-medium text-gray-600">Precio: </span>
                      <span className="text-myshop-orange font-bold">{ currencyFormat( product.price ) }</span>
                    </div>

                    <div>
                      <span className="font-medium text-gray-600">Contenido: </span>
                      <span className="text-gray-900">{ product.descriptionMeasure }</span>
                    </div>

                    <div>
                      <span className="font-medium text-gray-600">Stock: </span>
                      <span className={ `font-bold ${ product.inStock > 0 ? 'text-green-600' : 'text-red-600' }` }>
                        { product.inStock }
                      </span>
                    </div>
                  </div>
                </div>

                {/* Botón de acciones */ }
                <div className="flex justify-end mt-2">
                  <DeleteButton id={ product.id } />
                </div>
              </div>
            </div>
          </div>
        ) ) }
      </div>

      {/* Vista de tabla para tablets y desktop */ }
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
          <thead className="bg-myshop-gray">
            <tr>
              <th
                scope="col"
                className="text-sm font-semibold text-white px-4 py-3 text-left"
              >
                Imagen
              </th>
              <th
                scope="col"
                className="text-sm font-semibold text-white px-4 py-3 text-left"
              >
                Titulo
              </th>
              <th
                scope="col"
                className="text-sm font-semibold text-white px-4 py-3 text-left"
              >
                Marca
              </th>
              <th
                scope="col"
                className="text-sm font-semibold text-white px-4 py-3 text-left"
              >
                Contenido
              </th>
              <th
                scope="col"
                className="text-sm font-semibold text-white px-4 py-3 text-left"
              >
                Unidad de medida
              </th>
              <th
                scope="col"
                className="text-sm font-semibold text-white px-4 py-3 text-left"
              >
                Precio
              </th>
              <th
                scope="col"
                className="text-sm font-semibold text-white px-4 py-3 text-left"
              >
                Inventario
              </th>
              <th
                scope="col"
                className="text-sm font-semibold text-white px-4 py-3 text-left"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            { products.map( ( product ) => (
              <tr
                key={ product.id }
                className="bg-white border-b border-gray-200 transition duration-300 ease-in-out hover:bg-orange-50"
              >
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  <Link href={ `/product/${ product.slug }` }>
                    <ViewImage
                      src={ product.ProductImage[ 0 ]?.url }
                      width={ 80 }
                      height={ 80 }
                      alt={ product.title }
                      className="w-20 h-20 object-cover rounded"
                    />
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 font-light">
                  <Link
                    href={ `/admin/product/${ product.slug }` }
                    className="hover:text-myshop-orange transition-colors font-semibold"
                  >
                    { product.title }
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm font-bold text-gray-900">
                  { product.brand?.name }
                </td>
                <td className="px-4 py-3 text-sm font-bold text-gray-900">
                  { product.descriptionMeasure }
                </td>
                <td className="px-4 py-3 text-sm font-bold text-gray-900">
                  { product.measure }
                </td>
                <td className="px-4 py-3 text-sm font-bold text-gray-900">
                  { currencyFormat( product.price ) }
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 font-bold">
                  { product.inStock }
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 font-bold">
                  <DeleteButton id={ product.id } />
                </td>
              </tr>
            ) ) }
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <Pagination totalPages={ totalPages } />
      </div>
    </div>
  </>
  );
}
