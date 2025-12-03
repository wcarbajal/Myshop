export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table
import { getOrdersByUser } from "@/actions";
import { Title } from "@/components";

import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

export default async function OrdersPage() {
  const { ok, orders = [] } = await getOrdersByUser();

  if ( !ok ) {
    redirect( "/api/auth/signin" );
  }

  return (
    <>
      <Title title="Orders" />

      <div className="mb-10">
        {/* Vista de lista para móviles */ }
        <div className="md:hidden space-y-4">
          { orders.map( ( order ) => (
            <div
              key={ order.id }
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4"
            >
              <div className="space-y-3">
                {/* ID de orden */ }
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs text-gray-500 font-medium">ORDEN</span>
                    <p className="text-sm font-bold text-myshop-gray">
                      #{ order.id.split( "-" ).at( -1 ) }
                    </p>
                  </div>

                  {/* Estado */ }
                  <div className="flex items-center">
                    { order.isPaid ? (
                      <>
                        <IoCardOutline className="text-green-600 text-lg" />
                        <span className="ml-2 text-sm font-semibold text-green-600">Pagada</span>
                      </>
                    ) : (
                      <>
                        <IoCardOutline className="text-red-600 text-lg" />
                        <span className="ml-2 text-sm font-semibold text-red-600">No Pagada</span>
                      </>
                    ) }
                  </div>
                </div>

                {/* Nombre del cliente */ }
                <div>
                  <span className="text-xs text-gray-500 font-medium">CLIENTE</span>
                  <p className="text-sm text-gray-900">
                    { order.OrderAddress?.firstName } { order.OrderAddress?.lastName }
                  </p>
                </div>

                {/* Botón ver orden */ }
                <div className="pt-2 border-t border-gray-200">
                  <Link
                    href={ `/orders/${ order.id }` }
                    className="block text-center bg-myshop-orange hover:bg-orange-600 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Ver Orden
                  </Link>
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
                  className="text-sm font-semibold text-white px-6 py-4 text-left"
                >
                  #ID
                </th>
                <th
                  scope="col"
                  className="text-sm font-semibold text-white px-6 py-4 text-left"
                >
                  Nombre completo
                </th>
                <th
                  scope="col"
                  className="text-sm font-semibold text-white px-6 py-4 text-left"
                >
                  Estado
                </th>
                <th
                  scope="col"
                  className="text-sm font-semibold text-white px-6 py-4 text-left"
                >
                  Opciones
                </th>
              </tr>
            </thead>
            <tbody>
              { orders.map( ( order ) => (
                <tr
                  key={ order.id }
                  className="bg-white border-b border-gray-200 transition duration-300 ease-in-out hover:bg-orange-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    { order.id.split( "-" ).at( -1 ) }
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    { order.OrderAddress?.firstName } { order.OrderAddress?.lastName }
                  </td>
                  <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    { order.isPaid ? (
                      <>
                        <IoCardOutline className="text-green-800" />
                        <span className="mx-2 text-green-800">Pagada</span>
                      </>
                    ) : (
                      <>
                        <IoCardOutline className="text-red-800" />
                        <span className="mx-2 text-red-800">No Pagada</span>
                      </>
                    ) }
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 ">
                    <Link href={ `/orders/${ order.id }` } className="hover:underline">
                      Ver orden
                    </Link>
                  </td>
                </tr>
              ) ) }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
