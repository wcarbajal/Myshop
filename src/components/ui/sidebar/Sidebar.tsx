"use client";

import Link from "next/link";
import clsx from "clsx";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";

import { useUIStore } from "@/store";
import { useSession } from 'next-auth/react';
import { Logout } from '@/components/logout/Logout';

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  // Usar directamente useSession de next-auth
  const { data: session, status } = useSession();

  const isAuthenticated = status === "authenticated";
  const isAdmin = session?.user?.role === "admin";

  return (
    <div>
      {/* Background black */}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-30 bg-black opacity-30" />
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
          "fixed p-4 sm:p-5 right-0 top-0 w-[280px] sm:w-[310px] md:w-[450px] h-screen bg-white z-40 shadow-2xl transform transition-all duration-300 overflow-y-auto",
          {
            "translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        {/* Header del Sidebar con fondo gris oscuro */}
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

        {/* Menú */}

        {/* Menú de usuario */}
        <div className="space-y-2 ">
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

          {isAuthenticated && <Logout />}

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

        {/* Panel de Administración */}
        {isAdmin && (
          <>
            <div className="  my-2 border-t border-gray-200"></div>

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
                href="/ventas"
                onClick={() => closeMenu()}
                className="flex items-center p-3 hover:bg-orange-50 rounded-lg transition-all group"
              >
                <IoTicketOutline size={24} className="text-myshop-gray group-hover:text-myshop-orange transition-colors" />
                <span className="ml-3 text-base text-myshop-gray group-hover:text-myshop-orange font-medium transition-colors">Ventas</span>
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