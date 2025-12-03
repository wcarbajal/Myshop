'use client';

import { useState } from 'react';
import {
  IoStatsChart,
  IoTrendingUp,
  IoTrendingDown,
  IoCart,
  IoPeople,
  IoShirt,
  IoPricetag,
  IoCalendar,
  IoCash,
  IoStar,
  IoBarChart,
} from 'react-icons/io5';

interface TopProduct {
  id: string;
  nombre: string;
  marca: string;
  ventas: number;
  ingresos: number;
  stock: number;
}

interface TopBrand {
  id: string;
  nombre: string;
  productos: number;
  ventas: number;
  ingresos: number;
}

interface RecentOrder {
  id: string;
  fecha: string;
  cliente: string;
  productos: number;
  total: number;
  estado: 'completado' | 'pendiente' | 'cancelado';
}

export default function EstadisticasPage() {
  const [ periodo, setPeriodo ] = useState( 'mes' ); // dia, semana, mes, año

  // Datos de ejemplo - Métricas principales
  const metricas = {
    ventasTotales: 12450.75,
    variacionVentas: 12.5,
    ordenes: 156,
    variacionOrdenes: -3.2,
    clientes: 89,
    variacionClientes: 8.7,
    ticketPromedio: 79.81,
    variacionTicket: 5.3,
  };

  // Top 5 Productos más vendidos
  const topProductos: TopProduct[] = [
    { id: '1', nombre: 'Inka Kola 1.5L', marca: 'Inka Kola', ventas: 245, ingresos: 1102.50, stock: 150 },
    { id: '2', nombre: 'Leche Gloria Entera', marca: 'Gloria', ventas: 198, ingresos: 1029.60, stock: 80 },
    { id: '3', nombre: 'Arroz Costeño 5kg', marca: 'Costeño', ventas: 187, ingresos: 710.60, stock: 45 },
    { id: '4', nombre: 'Aceite Primor 1L', marca: 'Primor', ventas: 156, ingresos: 780.00, stock: 120 },
    { id: '5', nombre: 'Azúcar Rubia 1kg', marca: 'Cartavio', ventas: 143, ingresos: 500.50, stock: 200 },
  ];

  // Top 5 Marcas
  const topMarcas: TopBrand[] = [
    { id: '1', nombre: 'Gloria', productos: 24, ventas: 542, ingresos: 3240.80 },
    { id: '2', nombre: 'Inka Kola', productos: 12, ventas: 489, ingresos: 2934.50 },
    { id: '3', nombre: 'Costeño', productos: 8, ventas: 356, ingresos: 2140.60 },
    { id: '4', nombre: 'Primor', productos: 15, ventas: 298, ingresos: 1788.40 },
    { id: '5', nombre: 'Laive', productos: 18, ventas: 267, ingresos: 1602.30 },
  ];

  // Órdenes recientes
  const ordenesRecientes: RecentOrder[] = [
    { id: 'ORD-2025-156', fecha: '2025-12-02 15:30', cliente: 'Juan Pérez', productos: 5, total: 125.50, estado: 'completado' },
    { id: 'ORD-2025-155', fecha: '2025-12-02 14:15', cliente: 'María García', productos: 3, total: 89.90, estado: 'completado' },
    { id: 'ORD-2025-154', fecha: '2025-12-02 12:45', cliente: 'Carlos López', productos: 8, total: 234.75, estado: 'pendiente' },
    { id: 'ORD-2025-153', fecha: '2025-12-02 11:20', cliente: 'Ana Martínez', productos: 2, total: 45.60, estado: 'completado' },
    { id: 'ORD-2025-152', fecha: '2025-12-02 10:00', cliente: 'Pedro Sánchez', productos: 6, total: 187.30, estado: 'cancelado' },
  ];

  const getEstadoBadge = ( estado: string ) => {
    const styles = {
      completado: 'bg-green-100 text-green-700',
      pendiente: 'bg-yellow-100 text-yellow-700',
      cancelado: 'bg-red-100 text-red-700',
    };
    return styles[ estado as keyof typeof styles ] || styles.pendiente;
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */ }
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-myshop-orange to-orange-600 rounded-lg flex items-center justify-center">
              <IoStatsChart className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-myshop-gray">
                Estadísticas de Ventas
              </h1>
              <p className="text-sm text-gray-500">Panel de métricas y análisis</p>
            </div>
          </div>

          {/* Selector de periodo */ }
          <div className="flex items-center gap-2">
            <IoCalendar className="text-xl text-gray-500" />
            <select
              value={ periodo }
              onChange={ ( e ) => setPeriodo( e.target.value ) }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-myshop-orange"
            >
              <option value="dia">Hoy</option>
              <option value="semana">Esta Semana</option>
              <option value="mes">Este Mes</option>
              <option value="año">Este Año</option>
            </select>
          </div>
        </div>
      </div>

      {/* Métricas principales */ }
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Ventas Totales */ }
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-md p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <IoCash className="text-2xl" />
            </div>
            <div className="flex items-center gap-1 text-sm">
              { metricas.variacionVentas > 0 ? (
                <>
                  <IoTrendingUp className="text-lg" />
                  <span>+{ metricas.variacionVentas }%</span>
                </>
              ) : (
                <>
                  <IoTrendingDown className="text-lg" />
                  <span>{ metricas.variacionVentas }%</span>
                </>
              ) }
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">S/ { metricas.ventasTotales.toFixed( 2 ) }</div>
          <div className="text-sm opacity-90">Ventas Totales</div>
        </div>

        {/* Órdenes */ }
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-md p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <IoCart className="text-2xl" />
            </div>
            <div className="flex items-center gap-1 text-sm">
              { metricas.variacionOrdenes > 0 ? (
                <>
                  <IoTrendingUp className="text-lg" />
                  <span>+{ metricas.variacionOrdenes }%</span>
                </>
              ) : (
                <>
                  <IoTrendingDown className="text-lg" />
                  <span>{ metricas.variacionOrdenes }%</span>
                </>
              ) }
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">{ metricas.ordenes }</div>
          <div className="text-sm opacity-90">Órdenes</div>
        </div>

        {/* Clientes */ }
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow-md p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <IoPeople className="text-2xl" />
            </div>
            <div className="flex items-center gap-1 text-sm">
              { metricas.variacionClientes > 0 ? (
                <>
                  <IoTrendingUp className="text-lg" />
                  <span>+{ metricas.variacionClientes }%</span>
                </>
              ) : (
                <>
                  <IoTrendingDown className="text-lg" />
                  <span>{ metricas.variacionClientes }%</span>
                </>
              ) }
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">{ metricas.clientes }</div>
          <div className="text-sm opacity-90">Clientes Activos</div>
        </div>

        {/* Ticket Promedio */ }
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg shadow-md p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <IoBarChart className="text-2xl" />
            </div>
            <div className="flex items-center gap-1 text-sm">
              { metricas.variacionTicket > 0 ? (
                <>
                  <IoTrendingUp className="text-lg" />
                  <span>+{ metricas.variacionTicket }%</span>
                </>
              ) : (
                <>
                  <IoTrendingDown className="text-lg" />
                  <span>{ metricas.variacionTicket }%</span>
                </>
              ) }
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">S/ { metricas.ticketPromedio.toFixed( 2 ) }</div>
          <div className="text-sm opacity-90">Ticket Promedio</div>
        </div>
      </div>

      {/* Top Productos y Marcas */ }
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 Productos */ }
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-myshop-gray text-white px-6 py-4 flex items-center gap-3">
            <IoShirt className="text-2xl" />
            <h2 className="text-xl font-semibold">Top 5 Productos</h2>
          </div>
          <div className="divide-y divide-gray-200">
            { topProductos.map( ( producto, index ) => (
              <div key={ producto.id } className="p-4 hover:bg-orange-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-myshop-orange to-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    { index + 1 }
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate">{ producto.nombre }</h3>
                    <p className="text-sm text-gray-500">{ producto.marca }</p>
                    <div className="grid grid-cols-3 gap-3 mt-2">
                      <div>
                        <span className="text-xs text-gray-500">Ventas</span>
                        <p className="font-bold text-blue-600">{ producto.ventas }</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Ingresos</span>
                        <p className="font-bold text-green-600">S/ { producto.ingresos.toFixed( 2 ) }</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Stock</span>
                        <p className={ `font-bold ${ producto.stock < 50 ? 'text-red-600' : 'text-gray-700' }` }>
                          { producto.stock }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) ) }
          </div>
        </div>

        {/* Top 5 Marcas */ }
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-myshop-gray text-white px-6 py-4 flex items-center gap-3">
            <IoPricetag className="text-2xl" />
            <h2 className="text-xl font-semibold">Top 5 Marcas</h2>
          </div>
          <div className="divide-y divide-gray-200">
            { topMarcas.map( ( marca, index ) => (
              <div key={ marca.id } className="p-4 hover:bg-orange-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    { index + 1 }
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-lg">{ marca.nombre }</h3>
                    <div className="grid grid-cols-3 gap-3 mt-2">
                      <div>
                        <span className="text-xs text-gray-500">Productos</span>
                        <p className="font-bold text-purple-600">{ marca.productos }</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Ventas</span>
                        <p className="font-bold text-blue-600">{ marca.ventas }</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Ingresos</span>
                        <p className="font-bold text-green-600">S/ { marca.ingresos.toFixed( 2 ) }</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) ) }
          </div>
        </div>
      </div>

      {/* Órdenes Recientes */ }
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-myshop-gray text-white px-6 py-4 flex items-center gap-3">
          <IoCart className="text-2xl" />
          <h2 className="text-xl font-semibold">Órdenes Recientes</h2>
        </div>

        {/* Vista móvil - Cards */ }
        <div className="md:hidden divide-y divide-gray-200">
          { ordenesRecientes.map( ( orden ) => (
            <div key={ orden.id } className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-semibold text-gray-800">{ orden.id }</div>
                  <div className="text-sm text-gray-500">{ orden.fecha }</div>
                </div>
                <span className={ `px-3 py-1 rounded-full text-xs font-medium ${ getEstadoBadge( orden.estado ) }` }>
                  { orden.estado }
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Cliente:</span>
                  <div className="font-medium text-gray-800">{ orden.cliente }</div>
                </div>
                <div>
                  <span className="text-gray-500">Productos:</span>
                  <div className="font-medium text-gray-800">{ orden.productos }</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">Total:</span>
                  <span className="text-xl font-bold text-myshop-orange">
                    S/ { orden.total.toFixed( 2 ) }
                  </span>
                </div>
              </div>
            </div>
          ) ) }
        </div>

        {/* Vista desktop - Tabla */ }
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-myshop-gray text-white">
                <th className="px-6 py-3 text-left text-sm font-semibold">Orden</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Fecha</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Cliente</th>
                <th className="px-6 py-3 text-center text-sm font-semibold">Productos</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">Total</th>
                <th className="px-6 py-3 text-center text-sm font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              { ordenesRecientes.map( ( orden ) => (
                <tr key={ orden.id } className="hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-800">{ orden.id }</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">{ orden.fecha }</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <IoPeople className="text-gray-400" />
                      { orden.cliente }
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      { orden.productos }
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-lg font-bold text-myshop-orange">
                      S/ { orden.total.toFixed( 2 ) }
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={ `px-3 py-1 rounded-full text-xs font-medium ${ getEstadoBadge( orden.estado ) }` }>
                      { orden.estado }
                    </span>
                  </td>
                </tr>
              ) ) }
            </tbody>
          </table>
        </div>
      </div>

      {/* Resumen adicional */ }
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-green-500">
          <div className="flex items-center gap-3 mb-3">
            <IoStar className="text-3xl text-green-600" />
            <div>
              <div className="text-2xl font-bold text-gray-800">{ topProductos.reduce( ( acc, p ) => acc + p.ventas, 0 ) }</div>
              <div className="text-sm text-gray-500">Productos Vendidos</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-blue-500">
          <div className="flex items-center gap-3 mb-3">
            <IoPricetag className="text-3xl text-blue-600" />
            <div>
              <div className="text-2xl font-bold text-gray-800">{ topMarcas.reduce( ( acc, m ) => acc + m.productos, 0 ) }</div>
              <div className="text-sm text-gray-500">Productos en Catálogo</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-purple-500">
          <div className="flex items-center gap-3 mb-3">
            <IoCart className="text-3xl text-purple-600" />
            <div>
              <div className="text-2xl font-bold text-gray-800">
                { ordenesRecientes.filter( o => o.estado === 'completado' ).length }
              </div>
              <div className="text-sm text-gray-500">Órdenes Completadas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}