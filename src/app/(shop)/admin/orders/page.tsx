export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table
import { getPaginatedOrders } from "@/actions";
import { Pagination, Title } from "@/components";

import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

export default async function OrdersPage() {

  const { ok, orders = [] } = await getPaginatedOrders();

  if ( !ok ) {
    redirect( "/api/auth/signin" );
  }

  return (
    <>
      <Title title="Todas las orders" />

      <div className="mb-10">
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
                  <Link href={ `/orders/${ order.id }` } className="text-myshop-orange hover:text-orange-600 transition-colors font-semibold">
                    Ver orden
                  </Link>
                </td>
              </tr>
            ) ) }


          </tbody>
        </table>

        <Pagination totalPages={ 1 } />
      </div>
    </>
  );
}
