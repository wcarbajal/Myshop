"use client";

import Link from "next/link";
import clsx from "clsx";
//import { useSession } from "next-auth/react";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";

import { useUIStore } from "@/store";
import { logout, retornarSession } from "@/actions";
import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Logout } from '@/components/logout/Logout';

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);



  //const { data: session, status,  update } = useSession();

  const [session, setSession] = useState<any>(null);
  const [status, setStatus] = useState<boolean>(false);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await retornarSession();
      setSession(sessionData);
      setStatus(sessionData ? true : false);
    };
    fetchSession();
  }, []);

  const isAuthenticated = status;
  
  const isAdmin = session?.user?.role === "admin";

   const handleLogout = async () => {
     await  signOut({
       callbackUrl: '/auth/login',
     });
      
    }


  return (
    <div>
      {/* Background black */}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
      )}

      {/* Blur */}
      {isSideMenuOpen && (
        <div
          onClick={closeMenu}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        />
      )}

      {/* Sidemenu */}
      <nav
        className={clsx(
          "fixed p-4 sm:p-5 right-0 top-0 w-[280px] sm:w-[310px] md:w-[450px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300 overflow-y-auto",
          {
            "translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        {/* Header del Sidebar con fondo gris oscuro */ }
        <div className="bg-myshop-gray -m-5 p-5 mb-5">
          <div className="flex justify-between items-center">
            <h2 className="text-white text-xl font-semibold">MENÚ</h2>
            <IoCloseOutline
              size={35}
              className="cursor-pointer text-white hover:text-myshop-orange transition-colors"
              onClick={() => closeMenu()}
            />
          </div>
        </div>

        {/* Input de búsqueda */}
        <div className="w-full relative mb-6">
          <IoSearchOutline size={20} className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-full bg-gray-50 rounded-lg pl-10 py-3 pr-4 text-base border border-gray-200 focus:outline-none focus:border-myshop-orange focus:ring-1 focus:ring-myshop-orange transition-colors"
          />
        </div>

        {/* Menú */}

        {/* Menú de usuario */ }
        <div className="space-y-2">
          {isAuthenticated && (
            <>
              <Link
                href="/profile"
                onClick={() => closeMenu()}
                className="flex items-center p-3 hover:bg-orange-50 rounded-lg transition-all group"
              >
                <IoPersonOutline size={24} className="text-myshop-gray group-hover:text-myshop-orange transition-colors" />
                <span className="ml-3 text-base text-myshop-gray group-hover:text-myshop-orange font-medium transition-colors">Mi Perfil</span>
              </Link>

              <Link
                href="/orders"
                onClick={() => closeMenu()}
                className="flex items-center p-3 hover:bg-orange-50 rounded-lg transition-all group"
              >
                <IoTicketOutline size={24} className="text-myshop-gray group-hover:text-myshop-orange transition-colors" />
                <span className="ml-3 text-base text-myshop-gray group-hover:text-myshop-orange font-medium transition-colors">Mis Órdenes</span>
              </Link>
            </>
          )}

          {isAuthenticated && (
            <Logout />
          )}

          {!isAuthenticated && (
            <Link
              href="/api/auth/signin"
              className="flex items-center p-3 bg-myshop-orange hover:bg-orange-600 rounded-lg transition-all text-white"
              onClick={() => closeMenu()}
            >
              <IoLogInOutline size={24} />
              <span className="ml-3 text-base font-semibold">Iniciar Sesión</span>
            </Link>
          )}
        </div>

        {/* Panel de Administración */ }
        {isAdmin && (
          <>
            <div className="my-6 border-t border-gray-200"></div>
            
            <div className="bg-gray-50 -mx-5 px-5 py-3 mb-4">
              <h3 className="text-myshop-gray font-bold text-sm uppercase tracking-wide">
                Panel de Administración
              </h3>
            </div>

            <div className="space-y-2">
              <Link
                href="/admin/brands"
                onClick={() => closeMenu()}
                className="flex items-center p-3 hover:bg-orange-50 rounded-lg transition-all group"
              >
                <IoTicketOutline size={24} className="text-myshop-gray group-hover:text-myshop-orange transition-colors" />
                <span className="ml-3 text-base text-myshop-gray group-hover:text-myshop-orange font-medium transition-colors">Marcas</span>
              </Link>

              <Link
                href="/admin/products"
                onClick={() => closeMenu()}
                className="flex items-center p-3 hover:bg-orange-50 rounded-lg transition-all group"
              >
                <IoShirtOutline size={24} className="text-myshop-gray group-hover:text-myshop-orange transition-colors" />
                <span className="ml-3 text-base text-myshop-gray group-hover:text-myshop-orange font-medium transition-colors">Productos</span>
              </Link>

              <Link
                href="/admin/orders"
                onClick={() => closeMenu()}
                className="flex items-center p-3 hover:bg-orange-50 rounded-lg transition-all group"
              >
                <IoTicketOutline size={24} className="text-myshop-gray group-hover:text-myshop-orange transition-colors" />
                <span className="ml-3 text-base text-myshop-gray group-hover:text-myshop-orange font-medium transition-colors">Órdenes</span>
              </Link>

              <Link
                href="/admin/users"
                onClick={() => closeMenu()}
                className="flex items-center p-3 hover:bg-orange-50 rounded-lg transition-all group"
              >
                <IoPeopleOutline size={24} className="text-myshop-gray group-hover:text-myshop-orange transition-colors" />
                <span className="ml-3 text-base text-myshop-gray group-hover:text-myshop-orange font-medium transition-colors">Usuarios</span>
              </Link>
            </div>
          </>
        )}
      </nav>
    </div>
  );
};
