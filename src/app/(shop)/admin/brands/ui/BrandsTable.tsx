'use client'
import { changeBrandState } from '@/actions';
import { BrandDeleteButton } from '@/components';
import { Brand } from '@/interfaces/brand.interface';
import Link from 'next/link';

interface Props {
  brands: Brand[];

}



export const BrandsTable = ( { brands } : Props) => {
  return (
    <table className="min-w-full">
      <thead className="bg-gray-200 border-b">
        <tr>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            #ID
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Nombre completo
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Estado
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Opciones
          </th>
        </tr>
      </thead>
      <tbody>
        { brands.map( ( brand ) => (
          <tr
            key={ brand.id }
            className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
          >
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              <Link href={ `/admin/brand/${ brand.id }` } className="hover:text-blue-500">

                { brand.id.split( "-" ).at( -1 ) }
              </Link>
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              <Link href={ `/admin/brand/${ brand.id }` } className="hover:text-blue-500">

                { brand.name }
              </Link>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">


              <select
                value={ brand.state?.toString() }
                onChange={ e => changeBrandState( brand.id, e.target.value ) }
                className="text-sm w-full p-2 text-gray-900">
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
              {/* { brand.state } */ }
            </td>


            <td className="text-sm text-gray-900 font-light px-6 w-32">
              <div className="flex gap-2 ">
                <BrandDeleteButton brandId={ brand.id } />
              </div>
            </td>
          </tr>
        ) ) }


      </tbody>
    </table>
  );
};