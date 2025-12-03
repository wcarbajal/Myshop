'use client';

import { useState } from 'react';
import {
  IoPricetag,
  IoTrendingUp,
  IoTrendingDown,
  IoCash,
  IoCart,
  IoBarChart,
  IoCalendar,
  IoStatsChart,
  IoCheckmarkCircle,
} from 'react-icons/io5';

interface MarcaVenta {
  id: string;
  nombre: string;
  logo?: string;
  productosVendidos: number;
  cantidadProductos: number;
  ingresos: number;
  participacion: number;
  crecimiento: number;
  color: string;
}

export default function VentasPorMarca() {
  const [periodo, setPeriodo] = useState('mes');

  // Datos de muestra - Marcas con ventas
  const marcasVentas: MarcaVenta[] = [
    {
      id: '1',
      nombre: 'Gloria',
      productosVendidos: 542,
      cantidadProductos: 24,
      ingresos: 3240.80,
      participacion: 26.5,
      crecimiento: 12.3,
      color: 'from-red-500 to-red-600',
    },
    {
      id: '2',
      nombre: 'Inka Kola',
      productosVendidos: 489,
      cantidadProductos: 12,
      ingresos: 2934.50,
      participacion: 24.0,
      crecimiento: 8.7,
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      id: '3',
      nombre: 'Costeño',
      productosVendidos: 356,
      cantidadProductos: 8,
      ingresos: 2140.60,
      participacion: 17.5,
      crecimiento: -3.2,
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: '4',
      nombre: 'Primor',
      productosVendidos: 298,
      cantidadProductos: 15,
      ingresos: 1788.40,
      participacion: 14.6,
      crecimiento: 5.4,
      color: 'from-green-500 to-green-600',
    },
    {
      id: '5',
      nombre: 'Laive',
      productosVendidos: 267,
      cantidadProductos: 18,
      ingresos: 1602.30,
      participacion: 13.1,
      crecimiento: 15.8,
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: '6',
      nombre: 'Alicorp',
      productosVendidos: 198,
      cantidadProductos: 22,
      ingresos: 1188.50,
      participacion: 9.7,
      crecimiento: -1.5,
      color: 'from-orange-500 to-orange-600',
    },
    {
      id: '7',
      nombre: 'San Fernando',
      productosVendidos: 145,
      cantidadProductos: 10,
      ingresos: 870.20,
      participacion: 7.1,
      crecimiento: 6.2,
      color: 'from-pink-500 to-pink-600',
    },
    {
      id: '8',
      nombre: 'Nestlé',
      productosVendidos: 89,
      cantidadProductos: 14,
      ingresos: 534.60,
      participacion: 4.4,
      crecimiento: 3.1,
      color: 'from-indigo-500 to-indigo-600',
    },
  ];

  // Calcular totales
  const totalIngresos = marcasVentas.reduce((sum, marca) => sum + marca.ingresos, 0);
  const totalProductosVendidos = marcasVentas.reduce((sum, marca) => sum + marca.productosVendidos, 0);
  const totalProductosCatalogo = marcasVentas.reduce((sum, marca) => sum + marca.cantidadProductos, 0);
  const promedioIngresos = totalIngresos / marcasVentas.length;

  // Top 3 marcas
  const top3Marcas = marcasVentas.slice(0, 3);

  // Marcas con mejor crecimiento
  const mejorCrecimiento = [...marcasVentas].sort((a, b) => b.crecimiento - a.crecimiento).slice(0, 3);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-myshop-orange to-orange-600 rounded-lg flex items-center justify-center">
              <IoPricetag className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-myshop-gray">
                Ventas por Marcas
              </h1>
              <p className="text-sm text-gray-500">Análisis de rendimiento por marca</p>
            </div>
          </div>

          {/* Selector de periodo */}
          <div className="flex items-center gap-2">
            <IoCalendar className="text-xl text-gray-500" />
            <select
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
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

      {/* Métricas principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-md p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <IoCash className="text-2xl" />
            </div>
            <IoTrendingUp className="text-2xl opacity-75" />
          </div>
          <div className="text-3xl font-bold mb-1">S/ {totalIngresos.toFixed(2)}</div>
          <div className="text-sm opacity-90">Ingresos Totales</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-md p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <IoCart className="text-2xl" />
            </div>
            <IoBarChart className="text-2xl opacity-75" />
          </div>
          <div className="text-3xl font-bold mb-1">{totalProductosVendidos}</div>
          <div className="text-sm opacity-90">Productos Vendidos</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow-md p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <IoPricetag className="text-2xl" />
            </div>
            <IoStatsChart className="text-2xl opacity-75" />
          </div>
          <div className="text-3xl font-bold mb-1">{marcasVentas.length}</div>
          <div className="text-sm opacity-90">Marcas Activas</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg shadow-md p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <IoBarChart className="text-2xl" />
            </div>
            <IoCheckmarkCircle className="text-2xl opacity-75" />
          </div>
          <div className="text-3xl font-bold mb-1">S/ {promedioIngresos.toFixed(2)}</div>
          <div className="text-sm opacity-90">Promedio por Marca</div>
        </div>
      </div>

      {/* Top 3 Marcas destacadas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {top3Marcas.map((marca, index) => (
          <div
            key={marca.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-myshop-orange hover:shadow-xl transition-shadow"
          >
            <div className={`bg-gradient-to-br ${marca.color} text-white p-6`}>
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-2xl">
                  #{index + 1}
                </div>
                <IoTrendingUp className="text-3xl" />
              </div>
              <h3 className="text-2xl font-bold mb-1">{marca.nombre}</h3>
              <div className="text-sm opacity-90">{marca.participacion}% del mercado</div>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Ingresos</span>
                <span className="text-xl font-bold text-green-600">S/ {marca.ingresos.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Productos Vendidos</span>
                <span className="text-lg font-bold text-blue-600">{marca.productosVendidos}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Crecimiento</span>
                <span className={`text-lg font-bold flex items-center gap-1 ${marca.crecimiento > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {marca.crecimiento > 0 ? <IoTrendingUp /> : <IoTrendingDown />}
                  {marca.crecimiento > 0 ? '+' : ''}{marca.crecimiento}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ranking completo y análisis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ranking completo */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-myshop-gray text-white px-6 py-4 flex items-center gap-3">
            <IoBarChart className="text-2xl" />
            <h2 className="text-xl font-semibold">Ranking de Marcas</h2>
          </div>

          {/* Vista móvil - Cards */}
          <div className="md:hidden divide-y divide-gray-200">
            {marcasVentas.map((marca, index) => (
              <div key={marca.id} className="p-4 hover:bg-orange-50">
                <div className="flex items-start gap-4 mb-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${marca.color} text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0`}>
                    #{index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">{marca.nombre}</h3>
                    <p className="text-sm text-gray-500">{marca.cantidadProductos} productos</p>
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-semibold ${marca.crecimiento > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {marca.crecimiento > 0 ? <IoTrendingUp /> : <IoTrendingDown />}
                    {marca.crecimiento > 0 ? '+' : ''}{marca.crecimiento}%
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <span className="text-xs text-gray-500">Vendidos</span>
                    <p className="font-bold text-blue-600">{marca.productosVendidos}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Ingresos</span>
                    <p className="font-bold text-green-600">S/ {marca.ingresos.toFixed(2)}</p>
                  </div>
                </div>

                {/* Barra de participación */}
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>Participación</span>
                    <span className="font-semibold">{marca.participacion}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`bg-gradient-to-r ${marca.color} h-2 rounded-full transition-all`}
                      style={{ width: `${marca.participacion}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Vista desktop - Tabla */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-myshop-gray text-white">
                  <th className="px-6 py-3 text-left text-sm font-semibold">Ranking</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Marca</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold">Productos</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold">Vendidos</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold">Ingresos</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold">Participación</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold">Crecimiento</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {marcasVentas.map((marca, index) => (
                  <tr key={marca.id} className="hover:bg-orange-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className={`w-10 h-10 bg-gradient-to-br ${marca.color} text-white rounded-full flex items-center justify-center font-bold`}>
                        #{index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-800 text-lg">{marca.nombre}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        {marca.cantidadProductos}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {marca.productosVendidos}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-lg font-bold text-green-600">
                        S/ {marca.ingresos.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-sm font-semibold text-gray-700">{marca.participacion}%</span>
                        <div className="w-full max-w-[100px] bg-gray-200 rounded-full h-2">
                          <div
                            className={`bg-gradient-to-r ${marca.color} h-2 rounded-full`}
                            style={{ width: `${marca.participacion}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`flex items-center justify-center gap-1 font-bold ${marca.crecimiento > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {marca.crecimiento > 0 ? <IoTrendingUp className="text-lg" /> : <IoTrendingDown className="text-lg" />}
                        {marca.crecimiento > 0 ? '+' : ''}{marca.crecimiento}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Panel lateral - Mejores crecimientos */}
        <div className="space-y-6">
          {/* Mejor crecimiento */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-green-600 text-white px-5 py-3 flex items-center gap-2">
              <IoTrendingUp className="text-xl" />
              <h3 className="font-semibold">Mejor Crecimiento</h3>
            </div>
            <div className="p-4 space-y-3">
              {mejorCrecimiento.map((marca, index) => (
                <div key={marca.id} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">{marca.nombre}</div>
                    <div className="text-xs text-gray-500">S/ {marca.ingresos.toFixed(2)}</div>
                  </div>
                  <div className="text-green-600 font-bold text-lg">
                    +{marca.crecimiento}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resumen de productos */}
          <div className="bg-white rounded-lg shadow-md p-5">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <IoStatsChart className="text-myshop-orange text-xl" />
              Resumen General
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm text-gray-600">Total Productos</span>
                <span className="text-xl font-bold text-blue-600">{totalProductosCatalogo}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm text-gray-600">Total Vendidos</span>
                <span className="text-xl font-bold text-green-600">{totalProductosVendidos}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <span className="text-sm text-gray-600">Tasa de Rotación</span>
                <span className="text-xl font-bold text-orange-600">
                  {((totalProductosVendidos / totalProductosCatalogo) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}