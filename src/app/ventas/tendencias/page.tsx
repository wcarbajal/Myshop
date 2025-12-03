'use client';

import { useState } from 'react';
import {
  IoTrendingUp,
  IoTrendingDown,
  IoTime,
  IoCalendar,
  IoSearch,
  IoPeople,
  IoCart,
  IoFlash,
  IoStar,
  IoEye,
  IoHeart,
  IoStatsChart,
  IoSunny,
  IoMoon,
  IoCloudy,
} from 'react-icons/io5';

interface ProductoTendencia {
  id: string;
  nombre: string;
  categoria: string;
  vistas: number;
  busquedas: number;
  ventas: number;
  favoritos: number;
  crecimiento: number;
  temporada: 'subiendo' | 'estable' | 'bajando';
}

interface HorarioPico {
  hora: string;
  ventas: number;
  clientes: number;
  ticketPromedio: number;
  intensidad: number;
}

interface CategoriaTendencia {
  nombre: string;
  participacion: number;
  crecimiento: number;
  color: string;
}

interface ComportamientoCliente {
  tipo: string;
  descripcion: string;
  porcentaje: number;
  icono: string;
  color: string;
}

export default function TendenciasPage() {
  const [periodo, setPeriodo] = useState('mes');

  // Productos en tendencia
  const productosTendencia: ProductoTendencia[] = [
    {
      id: '1',
      nombre: 'Inka Kola 1.5L',
      categoria: 'Bebidas',
      vistas: 1245,
      busquedas: 389,
      ventas: 245,
      favoritos: 89,
      crecimiento: 45.3,
      temporada: 'subiendo',
    },
    {
      id: '2',
      nombre: 'Leche Gloria Entera',
      categoria: 'Lácteos',
      vistas: 1089,
      busquedas: 312,
      ventas: 198,
      favoritos: 76,
      crecimiento: 32.7,
      temporada: 'subiendo',
    },
    {
      id: '3',
      nombre: 'Pan Integral',
      categoria: 'Panadería',
      vistas: 987,
      busquedas: 267,
      ventas: 156,
      favoritos: 54,
      crecimiento: 18.4,
      temporada: 'estable',
    },
    {
      id: '4',
      nombre: 'Yogurt Laive',
      categoria: 'Lácteos',
      vistas: 856,
      busquedas: 234,
      ventas: 134,
      favoritos: 67,
      crecimiento: -5.2,
      temporada: 'bajando',
    },
    {
      id: '5',
      nombre: 'Arroz Costeño 5kg',
      categoria: 'Abarrotes',
      vistas: 745,
      busquedas: 198,
      ventas: 187,
      favoritos: 45,
      crecimiento: 12.8,
      temporada: 'estable',
    },
  ];

  // Horarios pico
  const horariosPico: HorarioPico[] = [
    { hora: '08:00 - 10:00', ventas: 45, clientes: 38, ticketPromedio: 42.50, intensidad: 75 },
    { hora: '10:00 - 12:00', ventas: 67, clientes: 52, ticketPromedio: 51.20, intensidad: 90 },
    { hora: '12:00 - 14:00', ventas: 89, clientes: 71, ticketPromedio: 58.90, intensidad: 100 },
    { hora: '14:00 - 16:00', ventas: 34, clientes: 28, ticketPromedio: 38.40, intensidad: 45 },
    { hora: '16:00 - 18:00', ventas: 56, clientes: 45, ticketPromedio: 47.80, intensidad: 70 },
    { hora: '18:00 - 20:00', ventas: 78, clientes: 63, ticketPromedio: 54.30, intensidad: 95 },
  ];

  // Categorías populares
  const categoriasTendencia: CategoriaTendencia[] = [
    { nombre: 'Bebidas', participacion: 28.5, crecimiento: 15.3, color: 'from-blue-500 to-blue-600' },
    { nombre: 'Lácteos', participacion: 24.2, crecimiento: 8.7, color: 'from-green-500 to-green-600' },
    { nombre: 'Abarrotes', participacion: 18.7, crecimiento: 5.2, color: 'from-yellow-500 to-yellow-600' },
    { nombre: 'Snacks', participacion: 14.3, crecimiento: -3.1, color: 'from-orange-500 to-orange-600' },
    { nombre: 'Panadería', participacion: 14.3, crecimiento: 12.4, color: 'from-purple-500 to-purple-600' },
  ];

  // Comportamiento del cliente
  const comportamientos: ComportamientoCliente[] = [
    {
      tipo: 'Compradores Frecuentes',
      descripcion: 'Realizan compras 3+ veces por semana',
      porcentaje: 35,
      icono: 'flash',
      color: 'from-green-500 to-green-600',
    },
    {
      tipo: 'Compradores de Fin de Semana',
      descripcion: 'Compran principalmente sábados y domingos',
      porcentaje: 28,
      icono: 'calendar',
      color: 'from-blue-500 to-blue-600',
    },
    {
      tipo: 'Compradores Nocturnos',
      descripcion: 'Prefieren horario 18:00 - 21:00',
      porcentaje: 22,
      icono: 'moon',
      color: 'from-purple-500 to-purple-600',
    },
    {
      tipo: 'Compradores Matutinos',
      descripcion: 'Compran temprano 08:00 - 10:00',
      porcentaje: 15,
      icono: 'sunny',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const getTemporadaIcon = (temporada: string) => {
    switch (temporada) {
      case 'subiendo':
        return <IoTrendingUp className="text-green-500 text-2xl" />;
      case 'bajando':
        return <IoTrendingDown className="text-red-500 text-2xl" />;
      default:
        return <IoCloudy className="text-gray-500 text-2xl" />;
    }
  };

  const getComportamientoIcon = (icono: string) => {
    switch (icono) {
      case 'flash':
        return <IoFlash className="text-2xl" />;
      case 'calendar':
        return <IoCalendar className="text-2xl" />;
      case 'moon':
        return <IoMoon className="text-2xl" />;
      case 'sunny':
        return <IoSunny className="text-2xl" />;
      default:
        return <IoPeople className="text-2xl" />;
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-myshop-orange to-orange-600 rounded-lg flex items-center justify-center">
              <IoStatsChart className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-myshop-gray">
                Tendencias de Consumo
              </h1>
              <p className="text-sm text-gray-500">Análisis de comportamiento y preferencias</p>
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
              <option value="semana">Esta Semana</option>
              <option value="mes">Este Mes</option>
              <option value="trimestre">Este Trimestre</option>
              <option value="año">Este Año</option>
            </select>
          </div>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-md p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <IoEye className="text-2xl" />
            </div>
            <IoTrendingUp className="text-2xl opacity-75" />
          </div>
          <div className="text-3xl font-bold mb-1">
            {productosTendencia.reduce((sum, p) => sum + p.vistas, 0).toLocaleString()}
          </div>
          <div className="text-sm opacity-90">Total Vistas</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-md p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <IoSearch className="text-2xl" />
            </div>
            <IoStatsChart className="text-2xl opacity-75" />
          </div>
          <div className="text-3xl font-bold mb-1">
            {productosTendencia.reduce((sum, p) => sum + p.busquedas, 0).toLocaleString()}
          </div>
          <div className="text-sm opacity-90">Búsquedas</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow-md p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <IoHeart className="text-2xl" />
            </div>
            <IoStar className="text-2xl opacity-75" />
          </div>
          <div className="text-3xl font-bold mb-1">
            {productosTendencia.reduce((sum, p) => sum + p.favoritos, 0)}
          </div>
          <div className="text-sm opacity-90">Favoritos</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg shadow-md p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <IoCart className="text-2xl" />
            </div>
            <IoFlash className="text-2xl opacity-75" />
          </div>
          <div className="text-3xl font-bold mb-1">
            {((productosTendencia.reduce((sum, p) => sum + p.ventas, 0) / 
              productosTendencia.reduce((sum, p) => sum + p.vistas, 0)) * 100).toFixed(1)}%
          </div>
          <div className="text-sm opacity-90">Tasa de Conversión</div>
        </div>
      </div>

      {/* Productos en tendencia y Categorías */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Productos más buscados */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-myshop-gray text-white px-6 py-4 flex items-center gap-3">
            <IoFlash className="text-2xl" />
            <h2 className="text-xl font-semibold">Productos en Tendencia</h2>
          </div>

          {/* Vista móvil */}
          <div className="md:hidden divide-y divide-gray-200">
            {productosTendencia.map((producto, index) => (
              <div key={producto.id} className="p-4 hover:bg-orange-50">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-myshop-orange to-orange-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{producto.nombre}</h3>
                    <p className="text-sm text-gray-500">{producto.categoria}</p>
                  </div>
                  {getTemporadaIcon(producto.temporada)}
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <IoEye className="text-blue-500" />
                    <span className="text-gray-600">{producto.vistas} vistas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoSearch className="text-green-500" />
                    <span className="text-gray-600">{producto.busquedas} búsquedas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoCart className="text-orange-500" />
                    <span className="text-gray-600">{producto.ventas} ventas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoHeart className="text-red-500" />
                    <span className="text-gray-600">{producto.favoritos} favoritos</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Crecimiento</span>
                    <span className={`font-bold flex items-center gap-1 ${
                      producto.crecimiento > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {producto.crecimiento > 0 ? <IoTrendingUp /> : <IoTrendingDown />}
                      {producto.crecimiento > 0 ? '+' : ''}{producto.crecimiento}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Vista desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-myshop-gray text-white">
                  <th className="px-6 py-3 text-left text-sm font-semibold">#</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Producto</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold">Vistas</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold">Búsquedas</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold">Ventas</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold">Favoritos</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold">Crecimiento</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {productosTendencia.map((producto, index) => (
                  <tr key={producto.id} className="hover:bg-orange-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-myshop-orange to-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-800">{producto.nombre}</div>
                      <div className="text-sm text-gray-500">{producto.categoria}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2 text-blue-600">
                        <IoEye />
                        <span className="font-medium">{producto.vistas}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <IoSearch />
                        <span className="font-medium">{producto.busquedas}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                        {producto.ventas}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2 text-red-500">
                        <IoHeart />
                        <span className="font-medium">{producto.favoritos}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`font-bold flex items-center justify-center gap-1 ${
                        producto.crecimiento > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {producto.crecimiento > 0 ? <IoTrendingUp /> : <IoTrendingDown />}
                        {producto.crecimiento > 0 ? '+' : ''}{producto.crecimiento}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {getTemporadaIcon(producto.temporada)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Categorías populares */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-myshop-gray text-white px-5 py-3 flex items-center gap-2">
            <IoStar className="text-xl" />
            <h3 className="font-semibold">Categorías Populares</h3>
          </div>
          <div className="p-4 space-y-4">
            {categoriasTendencia.map((categoria, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800">{categoria.nombre}</span>
                  <span className={`text-sm font-bold flex items-center gap-1 ${
                    categoria.crecimiento > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {categoria.crecimiento > 0 ? <IoTrendingUp /> : <IoTrendingDown />}
                    {categoria.crecimiento > 0 ? '+' : ''}{categoria.crecimiento}%
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`bg-gradient-to-r ${categoria.color} h-3 rounded-full transition-all`}
                        style={{ width: `${categoria.participacion}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 min-w-[50px] text-right">
                    {categoria.participacion}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Horarios pico */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-myshop-gray text-white px-6 py-4 flex items-center gap-3">
          <IoTime className="text-2xl" />
          <h2 className="text-xl font-semibold">Horarios Pico de Ventas</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {horariosPico.map((horario, index) => (
              <div
                key={index}
                className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border-l-4 border-myshop-orange hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <IoTime className="text-myshop-orange text-xl" />
                    <span className="font-bold text-gray-800">{horario.hora}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {horario.intensidad}% actividad
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Ventas</span>
                    <span className="font-bold text-blue-600">{horario.ventas}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Clientes</span>
                    <span className="font-bold text-purple-600">{horario.clientes}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Ticket Promedio</span>
                    <span className="font-bold text-green-600">S/ {horario.ticketPromedio.toFixed(2)}</span>
                  </div>
                </div>

                {/* Barra de intensidad */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-myshop-orange to-orange-600 h-2 rounded-full transition-all"
                    style={{ width: `${horario.intensidad}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comportamiento del cliente */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-myshop-gray text-white px-6 py-4 flex items-center gap-3">
          <IoPeople className="text-2xl" />
          <h2 className="text-xl font-semibold">Comportamiento del Cliente</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {comportamientos.map((comportamiento, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${comportamiento.color} text-white rounded-lg shadow-md p-5 hover:scale-105 transition-transform`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    {getComportamientoIcon(comportamiento.icono)}
                  </div>
                  <div className="text-3xl font-bold">{comportamiento.porcentaje}%</div>
                </div>
                <h3 className="font-bold text-lg mb-2">{comportamiento.tipo}</h3>
                <p className="text-sm opacity-90">{comportamiento.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}