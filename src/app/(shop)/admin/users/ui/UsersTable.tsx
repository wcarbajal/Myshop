'use client';

import { changeUserRole } from '@/actions';
import { ViewImage } from '@/components';

import { UserDeleteButton } from '@/components/users/UserDeleteButton';
import type { User } from '@/interfaces';
import Link from 'next/link';

interface Props {
  users: User[];
}

export const UsersTable = ( { users }: Props ) => {


  return (

    <>
      {/* Vista de lista para móviles */ }
      <div className="md:hidden space-y-4">
        { users.map( ( user ) => (
          <div
            key={ user.id }
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex gap-4 p-4">
              {/* Imagen a la izquierda */ }
              <div className="flex-shrink-0">
                <Link href={ `/admin/user/${ user.id }` }>
                  <ViewImage
                    src={ user.image ?? process.env.NO_IMAGE_URL }
                    width={ 100 }
                    height={ 100 }
                    alt={ user.name }
                    className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                  />
                </Link>
              </div>

              {/* Datos a la derecha */ }
              <div className="flex-1 flex flex-col justify-between min-w-0">
                {/* Información del usuario */ }
                <div className="space-y-1">
                  <Link
                    href={ `/admin/user/${ user.id }` }
                    className="text-base font-semibold text-myshop-gray hover:text-myshop-orange transition-colors line-clamp-2"
                  >
                    { user.name }
                  </Link>

                  <div className="space-y-1 text-xs">
                    <div>
                      <span className="font-medium text-gray-600">Email: </span>
                      <span className="text-blue-600 break-all">{ user.email }</span>
                    </div>

                    <div>
                      <span className="font-medium text-gray-600">Teléfono: </span>
                      <span className="text-gray-900">{ user.telefono || 'N/A' }</span>
                    </div>

                    <div>
                      <span className="font-medium text-gray-600">Role: </span>
                      <select
                        value={ user.role }
                        onChange={ e => changeUserRole( user.id, e.target.value ) }
                        className="text-xs p-1 text-gray-900 bg-gray-50 border border-gray-300 rounded"
                      >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Botón de acciones */ }
                <div className="flex justify-end mt-2">
                  <UserDeleteButton userdId={ user.id } nombre={ user.name } />
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
              className="text-sm font-semibold text-white px-6 py-4 text-left"
            >
              Imagen
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
              Email
            </th>

            <th
              scope="col"
              className="text-sm font-semibold text-white px-6 py-4 text-left"
            >
              Telefono
            </th>

            <th
              scope="col"
              className="text-sm font-semibold text-white px-6 py-4 text-left"
            >
              Role
            </th>
            <th
              scope="col"
              className="text-sm font-semibold text-white px-6 py-4 text-left"
            >
              Acciones
            </th>

          </tr>
        </thead>
        <tbody>
          { users.map( ( user ) => (
            <tr
              key={ user.id }
              className="bg-white border-b border-gray-200 transition duration-300 ease-in-out hover:bg-orange-50"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <Link href={ `/admin/user/${ user.id }` }>
                  <ViewImage
                    src={ user.image ?? process.env.NO_IMAGE_URL }
                    width={ 80 }
                    height={ 80 }
                    alt={ user.name }
                    className="w-20 h-20 object-cover rounded"
                  />
                </Link>
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <Link href={ `/admin/user/${ user.id }` } className="font-semibold text-base hover:text-myshop-orange transition-colors">
                  { user.name }
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-blue-600 ">
                { user.email }
              </td>

              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                { user.telefono }
              </td>
              <td className="  text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                <select
                  value={ user.role }
                  onChange={ e => changeUserRole( user.id, e.target.value ) }
                  className="text-sm w-full p-2 text-gray-900">
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>

              </td>
              <td className="text-sm text-gray-900 font-light px-6 w-32">
                <div className="flex gap-2 ">
                  <UserDeleteButton userdId={ user.id } nombre={ user.name } />
                </div>
              </td>

            </tr>
          ) ) }
        </tbody>
        </table>
      </div>
    </>
  );
};
