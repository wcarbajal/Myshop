import Link from 'next/link';
import {
  IoCashOutline,
  IoStatsChartOutline,
  IoReceiptOutline,
  IoTrendingUpOutline,
  IoCalendarOutline,
  IoDocumentTextOutline,
  IoBarChartOutline,
  IoPieChartOutline,
  IoCartOutline,
  IoTimeOutline,
  IoAnalyticsOutline,
  IoWalletOutline
} from 'react-icons/io5';
import { Title } from '@/components';

export default function VentasPage() {

  const ventasOptions = [
    {
      title: 'Nueva Venta',
      description: 'Registrar una nueva venta o pedido',
      icon: IoCartOutline,
      href: '/ventas/nuevo',
      color: 'from-green-500 to-green-600',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      featured: true
    },   
    {
      title: 'Reporte de Ventas',
      description: 'Informes detallados de ventas',
      icon: IoDocumentTextOutline,
      href: '/ventas/reportes',
      color: 'from-purple-500 to-purple-600',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Estadísticas',
      description: 'Análisis y métricas de ventas',
      icon: IoBarChartOutline,
      href: '/ventas/estadisticas',
      color: 'from-orange-500 to-orange-600',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    },
    {
      title: 'Ventas por Marca',
      description: 'Análisis de ventas por marca',
      icon: IoPieChartOutline,
      href: '/ventas/marcas',
      color: 'from-pink-500 to-pink-600',
      iconBg: 'bg-pink-100',
      iconColor: 'text-pink-600'
    },
    {
      title: 'Tendencias',
      description: 'Productos y categorías más vendidos',
      icon: IoTrendingUpOutline,
      href: '/ventas/tendencias',
      color: 'from-teal-500 to-teal-600',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600'
    },   
    {
      title: 'Historial',
      description: 'Consultar ventas anteriores',
      icon: IoTimeOutline,
      href: '/ventas/historial',
      color: 'from-cyan-500 to-cyan-600',
      iconBg: 'bg-cyan-100',
      iconColor: 'text-cyan-600'
    }
  ];

  // Métricas rápidas
  const quickStats = [
    {
      label: 'Ventas Hoy',
      value: 'S/ 0.00',
      icon: IoCashOutline,
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'Órdenes',
      value: '0',
      icon: IoReceiptOutline,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Promedio',
      value: 'S/ 0.00',
      icon: IoStatsChartOutline,
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Mes Actual',
      value: 'S/ 0.00',
      icon: IoWalletOutline,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-0 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */ }
        <div className="mb-8">
          <Title
            title="Módulo de Ventas"
            subtitle="Gestiona y analiza todas tus ventas"
            className="mb-2"
          />
          <p className="text-gray-600 text-sm sm:text-base">
            Control completo de ventas, reportes y estadísticas
          </p>
        </div>

        {/* Métricas Rápidas */ }
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          { quickStats.map( ( stat, index ) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={ index }
                className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-xs sm:text-sm font-medium mb-1">{ stat.label }</p>
                    <p className="text-xl sm:text-2xl font-bold text-myshop-gray">{ stat.value }</p>
                  </div>
                  <div className={ `w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gradient-to-br ${ stat.color } flex items-center justify-center` }>
                    <IconComponent className="text-white text-2xl sm:text-3xl" />
                  </div>
                </div>
              </div>
            );
          } ) }
        </div>

        {/* Grid de opciones principales */ }
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          { ventasOptions.map( ( option ) => {
            const IconComponent = option.icon;
            return (
              <Link
                key={ option.href }
                href={ option.href }
                className={ `group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 ${ option.featured ? 'ring-2 ring-myshop-orange ring-offset-2' : '' }` }
              >
                {/* Badge de destacado */ }
                { option.featured && (
                  <div className="absolute top-4 right-4 bg-myshop-orange text-white text-xs font-bold px-2 py-1 rounded-full">
                    DESTACADO
                  </div>
                ) }

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
                    <span>Acceder</span>
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

        {/* Acciones rápidas */ }
        <div className="mt-12 bg-gradient-to-br from-myshop-orange to-orange-600 rounded-2xl shadow-xl p-6 sm:p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/ventas/nuevo"
              className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-xl p-4 transition-all transform hover:scale-105 flex items-center space-x-3"
            >
              <IoCartOutline className="text-3xl" />
              <div>
                <p className="font-bold">Nueva Venta</p>
                <p className="text-xs opacity-90">Registrar ahora</p>
              </div>
            </Link>

            <Link
              href="/ventas/dia"
              className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-xl p-4 transition-all transform hover:scale-105 flex items-center space-x-3"
            >
              <IoCashOutline className="text-3xl" />
              <div>
                <p className="font-bold">Ventas del Día</p>
                <p className="text-xs opacity-90">Ver resumen</p>
              </div>
            </Link>

            <Link
              href="/ventas/reportes"
              className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-xl p-4 transition-all transform hover:scale-105 flex items-center space-x-3"
            >
              <IoDocumentTextOutline className="text-3xl" />
              <div>
                <p className="font-bold">Generar Reporte</p>
                <p className="text-xs opacity-90">Exportar datos</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}