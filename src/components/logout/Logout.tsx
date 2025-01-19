'use client';

import { logout } from '@/actions';
import {

  IoLogOutOutline,

} from "react-icons/io5";


export const Logout = () => {

  const handleLogout = async () => {
    await logout();

  };

  return (
    <button onClick={ handleLogout } className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">

      <IoLogOutOutline size={ 30 } />
      <span className="ml-3 text-xl">Salir</span>
    </button>
  );
};