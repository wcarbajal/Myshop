'use client';

import { logout } from '@/actions';
import { IoLogOutOutline } from "react-icons/io5";


export const Logout = () => {

  const handleLogout = async () => {
    await logout();
  };

  return (
    <button 
      onClick={ handleLogout } 
      className="flex w-full items-center p-3 hover:bg-red-50 rounded-lg transition-all group"
    >
      <IoLogOutOutline size={ 24 } className="text-red-600 group-hover:text-red-700 transition-colors" />
      <span className="ml-3 text-base text-red-600 group-hover:text-red-700 font-medium transition-colors">Cerrar Sesión</span>
    </button>
  );
};