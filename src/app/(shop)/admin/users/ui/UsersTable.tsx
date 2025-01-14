'use client';

import { changeUserRole } from '@/actions';
import { ViewImage } from '@/components';

import { UserDeleteButton } from '@/components/users/UserDeleteButton';
import type { User } from '@/interfaces';
import Link from 'next/link';
import { TbEdit } from 'react-icons/tb';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  users: User[];
}

export const UsersTable = ( { users }: Props ) => {


  return (

    <>
      <table className="hidden sm:table  min-w-full">
        <thead className="bg-gray-200 border-b">
          <tr>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Imagen
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
              Email
            </th>

            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Telefono
            </th>

            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Role
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Acciones
            </th>

          </tr>
        </thead>
        <tbody>
          { users.map( ( user ) => (
            <tr
              key={ user.id }
              className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
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
                <Link href={ `/admin/user/${ user.id }` } className="font-semibold text-base hover:text-blue-700">
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

      <div className="sm:hidden  m-1">


        {
          users.map( ( user ) => (
            <Card
              key={ user.id }
              className="flex items-center relative gap-4 py-4 px-6 mb-5 transition duration-300 ease-in-out hover:bg-gray-100"
            >
              <Link href={ `/admin/user/${ user.id }` } className="hover:text-blue-500">
                <ViewImage
                  src={ user.image ?? process.env.NO_IMAGE_URL }
                  width={ 80 }
                  height={ 100 }
                  alt={ user.name }
                  className="w-20 h-20 object-cover rounded"
                />
              </Link>
              <div className="flex flex-col gap-1  w-full" >
                <Link href={ `/admin/user/${ user.id }` } className="w-32 hover:text-blue-500">
                  <span className="text-sm text-gray-900 font-bold">{ user.name }</span>
                </Link>
                <span className="text-sm text-blue-600 font-medium">{ user.email }</span>
                <span className="text-sm text-gray-900 font-light">{ user.telefono }</span>
                <select
                  value={ user.role }
                  onChange={ e => changeUserRole( user.id, e.target.value ) }
                  className="text-sm text-gray-900 bg-slate-100 rounded-md">
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>

                <div className="absolute top-1 right-1 gap-2 justify-end">
                  <UserDeleteButton userdId={ user.id } nombre={ user.name } />
                </div>
              </div>
            </Card>
          ) )
        }


      </div>

    </>
  );
};
