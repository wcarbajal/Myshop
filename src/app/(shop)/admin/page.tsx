import Link from 'next/link';
import {
  IoTicketOutline,
  IoShirtOutline,
  IoPeopleOutline,
  IoStatsChartOutline,
  IoPricetagsOutline,
  IoCartOutline,
  IoGridOutline,
  IoCashOutline
} from 'react-icons/io5';
import { Title } from '@/components';

export default function AdminPage() {

  const adminOptions = [
    {
      title: 'Productos',
      description: 'Gestiona el catálogo de productos',
      icon: IoShirtOutline,
      href: '/admin/products',
      color: 'from-blue-500 to-blue-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Órdenes',
      description: 'Administra pedidos y ventas',
      icon: IoTicketOutline,
      href: '/admin/orders',
      color: 'from-green-500 to-green-600',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'Usuarios',
      description: 'Control de usuarios del sistema',
      icon: IoPeopleOutline,
      href: '/admin/users',
      color: 'from-purple-500 to-purple-600',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Marcas',
      description: 'Gestiona marcas de productos',
      icon: IoPricetagsOutline,
      href: '/admin/brands',
      color: 'from-orange-500 to-orange-600',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    },
    {
      title: 'Categorías',
      description: 'Organiza categorías de productos',
      icon: IoGridOutline,
      href: '/admin/categories',
      color: 'from-pink-500 to-pink-600',
      iconBg: 'bg-pink-100',
      iconColor: 'text-pink-600'
    },
    {
      title: 'Ventas',
      description: 'Reportes y estadísticas de ventas',
      icon: IoCashOutline,
      href: '/ventas',
      color: 'from-emerald-500 to-emerald-600',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */ }
        <div className="mb-8">
          <Title
            title="Panel de Administración"
            subtitle="Gestiona tu tienda desde un solo lugar"
            className="mb-2"
          />
          <p className="text-gray-600 text-sm sm:text-base">
            Selecciona una opción para comenzar
          </p>
        </div>

        {/* Grid de opciones */ }
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          { adminOptions.map( ( option ) => {
            const IconComponent = option.icon;
            return (
              <Link
                key={ option.href }
                href={ option.href }
                className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
              >
                {/* Gradiente de fondo (visible en hover) */ }
                <div className={ `absolute inset-0 bg-gradient-to-br ${ option.color } opacity-0 group-hover:opacity-5 transition-opacity duration-300` }></div>

                <div className="relative p-6">
                  {/* Icono */ }
                  <div className={ `${ option.iconBg } w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300` }>
                    <IconComponent className={ `${ option.iconColor } text-3xl sm:text-4xl` } />
                  </div>

                  {/* Contenido */ }
                  <h3 className="text-xl sm:text-2xl font-bold text-myshop-gray mb-2 group-hover:text-myshop-orange transition-colors">
                    { option.title }
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    { option.description }
                  </p>

                  {/* Flecha indicadora */ }
                  <div className="mt-4 flex items-center text-myshop-orange font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Ir a { option.title }</span>
                    <svg
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Borde animado */ }
                <div className={ `absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${ option.color } transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300` }></div>
              </Link>
            );
          } ) }
        </div>

        {/* Estadísticas rápidas */ }
        <div className="mt-12 bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-bold text-myshop-gray mb-4">Acceso Rápido</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link
              href="/admin/product/new"
              className="flex flex-col items-center p-4 bg-gradient-to-br from-myshop-orange to-orange-600 rounded-xl text-white hover:shadow-lg transition-all transform hover:scale-105"
            >
              <IoShirtOutline className="text-3xl mb-2" />
              <span className="text-sm font-semibold text-center">Nuevo Producto</span>
            </Link>

            <Link
              href="/admin/orders"
              className="flex flex-col items-center p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-xl text-white hover:shadow-lg transition-all transform hover:scale-105"
            >
              <IoCartOutline className="text-3xl mb-2" />
              <span className="text-sm font-semibold text-center">Ver Órdenes</span>
            </Link>

            <Link
              href="/admin/users"
              className="flex flex-col items-center p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl text-white hover:shadow-lg transition-all transform hover:scale-105"
            >
              <IoPeopleOutline className="text-3xl mb-2" />
              <span className="text-sm font-semibold text-center">Gestionar Usuarios</span>
            </Link>

            <Link
              href="/ventas"
              className="flex flex-col items-center p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl text-white hover:shadow-lg transition-all transform hover:scale-105"
            >
              <IoStatsChartOutline className="text-3xl mb-2" />
              <span className="text-sm font-semibold text-center">Ver Estadísticas</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}