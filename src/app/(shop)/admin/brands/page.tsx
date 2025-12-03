
// https://tailwindcomponents.com/component/hoverable-table

import { getPaginatedBrands } from "@/actions";
import { Pagination, Title } from "@/components";

export const revalidate = 0;

import Link from "next/link";
import { redirect } from "next/navigation";
import { BrandsTable } from './ui/BrandsTable';



export default async function BrandsPage() {

  const { ok, brands = [], message } = await getPaginatedBrands();

  if ( !ok ) {
    console.error( 'Error al obtener las marcas:', message );
    redirect( "/api/auth/signin" );
  }

  if ( brands.length === 0 ) {
    return <div>No se encontraron marcas. Por favor, agregue algunas marcas.</div>;
  }



  return (
    <>
      <Title title="Mantenimianeto de marcas" />

      <div className="flex justify-end mb-5">
        <Link href="/admin/brand/new" className="btn-primary">
          Nueva marca
        </Link>
      </div>

      <div className="mb-10">

        <BrandsTable brands={ brands } />


        <Pagination totalPages={ 1 } />
      </div>
    </>
  );
}
