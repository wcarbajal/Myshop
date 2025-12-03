'use client';

import { useState } from 'react';
import { IoCalendarOutline, IoCashOutline, IoCardOutline, IoTimeOutline, IoPersonOutline, IoFilter } from 'react-icons/io5';

interface VentaDelDia {
  id: string;
  hora: string;
  cajero: string;
  productos: number;
  subtotal: number;
  igv: number;
  total: number;
  metodoPago: 'efectivo' | 'tarjeta' | 'yape';
}

type TipoReporte = 'dia' | 'rango' | 'mes' | 'año';

export default function ReporteDeVentas() {
  const [ tipoReporte, setTipoReporte ] = useState<TipoReporte>( 'dia' );
  const [ selectedDate, setSelectedDate ] = useState<string>(
    new Date().toISOString().split( 'T' )[ 0 ]
  );
  const [ fechaInicio, setFechaInicio ] = useState<string>(
    new Date().toISOString().split( 'T' )[ 0 ]
  );
  const [ fechaFin, setFechaFin ] = useState<string>(
    new Date().toISOString().split( 'T' )[ 0 ]
  );
  const [ mesSeleccionado, setMesSeleccionado ] = useState<string>(
    `${ new Date().getFullYear() }-${ String( new Date().getMonth() + 1 ).padStart( 2, '0' ) }`
  );
  const [ añoSeleccionado, setAñoSeleccionado ] = useState<string>(
    String( new Date().getFullYear() )
  );

  // Datos de muestra
  const ventasDelDia: VentaDelDia[] = [
    {
      id: 'V-001',
      hora: '08:30',
      cajero: 'María García',
      productos: 5,
      subtotal: 42.50,
      igv: 7.65,
      total: 50.15,
      metodoPago: 'efectivo',
    },
    {
      id: 'V-002',
      hora: '09:15',
      cajero: 'Juan Pérez',
      productos: 3,
      subtotal: 28.00,
      igv: 5.04,
      total: 33.04,
      metodoPago: 'tarjeta',
    },
    {
      id: 'V-003',
      hora: '10:45',
      cajero: 'María García',
      productos: 8,
      subtotal: 67.30,
      igv: 12.11,
      total: 79.41,
      metodoPago: 'yape',
    },
    {
      id: 'V-004',
      hora: '11:20',
      cajero: 'Carlos López',
      productos: 2,
      subtotal: 15.80,
      igv: 2.84,
      total: 18.64,
      metodoPago: 'efectivo',
    },
    {
      id: 'V-005',
      hora: '12:00',
      cajero: 'Juan Pérez',
      productos: 6,
      subtotal: 54.20,
      igv: 9.76,
      total: 63.96,
      metodoPago: 'tarjeta',
    },
    {
      id: 'V-006',
      hora: '14:30',
      cajero: 'María García',
      productos: 4,
      subtotal: 35.90,
      igv: 6.46,
      total: 42.36,
      metodoPago: 'efectivo',
    },
    {
      id: 'V-007',
      hora: '15:45',
      cajero: 'Carlos López',
      productos: 7,
      subtotal: 61.50,
      igv: 11.07,
      total: 72.57,
      metodoPago: 'yape',
    },
    {
      id: 'V-008',
      hora: '16:20',
      cajero: 'Juan Pérez',
      productos: 3,
      subtotal: 23.40,
      igv: 4.21,
      total: 27.61,
      metodoPago: 'tarjeta',
    },
  ];

  // Calcular totales del día
  const totalVentas = ventasDelDia.length;
  const totalSubtotal = ventasDelDia.reduce( ( sum, venta ) => sum + venta.subtotal, 0 );
  const totalIGV = ventasDelDia.reduce( ( sum, venta ) => sum + venta.igv, 0 );
  const totalGeneral = ventasDelDia.reduce( ( sum, venta ) => sum + venta.total, 0 );

  // Contar por método de pago
  const ventasEfectivo = ventasDelDia.filter( v => v.metodoPago === 'efectivo' );
  const ventasTarjeta = ventasDelDia.filter( v => v.metodoPago === 'tarjeta' );
  const ventasYape = ventasDelDia.filter( v => v.metodoPago === 'yape' );

  const totalEfectivo = ventasEfectivo.reduce( ( sum, v ) => sum + v.total, 0 );
  const totalTarjeta = ventasTarjeta.reduce( ( sum, v ) => sum + v.total, 0 );
  const totalYape = ventasYape.reduce( ( sum, v ) => sum + v.total, 0 );

  const getMetodoPagoIcon = ( metodo: string ) => {
    switch ( metodo ) {
      case 'efectivo':
        return <IoCashOutline className="text-green-600" />;
      case 'tarjeta':
        return <IoCardOutline className="text-blue-600" />;
      case 'yape':
        return <div className="text-purple-600 font-bold text-sm">Y</div>;
      default:
        return null;
    }
  };

  // Función para obtener el título según el tipo de reporte
  const getTituloReporte = () => {
    switch ( tipoReporte ) {
      case 'dia':
        return 'Reporte de Ventas por Día';
      case 'rango':
        return 'Reporte de Ventas por Rango';
      case 'mes':
        return 'Reporte de Ventas por Mes';
      case 'año':
        return 'Reporte de Ventas por Año';
      default:
        return 'Reporte de Ventas';
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */ }
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-myshop-orange to-orange-600 rounded-lg flex items-center justify-center">
            <IoFilter className="text-2xl text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-myshop-gray">
              { getTituloReporte() }
            </h1>
            <p className="text-sm text-gray-500">Selecciona el tipo de reporte y periodo</p>
          </div>
        </div>

        {/* Tipo de reporte */ }
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Tipo de Reporte
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={ () => setTipoReporte( 'dia' ) }
              className={ `px-4 py-3 rounded-lg font-medium transition-all ${ tipoReporte === 'dia'
                ? 'bg-myshop-orange text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }` }
            >
              Día Específico
            </button>
            <button
              onClick={ () => setTipoReporte( 'rango' ) }
              className={ `px-4 py-3 rounded-lg font-medium transition-all ${ tipoReporte === 'rango'
                ? 'bg-myshop-orange text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }` }
            >
              Rango de Días
            </button>
            <button
              onClick={ () => setTipoReporte( 'mes' ) }
              className={ `px-4 py-3 rounded-lg font-medium transition-all ${ tipoReporte === 'mes'
                ? 'bg-myshop-orange text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }` }
            >
              Mes
            </button>
            <button
              onClick={ () => setTipoReporte( 'año' ) }
              className={ `px-4 py-3 rounded-lg font-medium transition-all ${ tipoReporte === 'año'
                ? 'bg-myshop-orange text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }` }
            >
              Año
            </button>
          </div>
        </div>

        {/* Selectores de fecha según tipo */ }
        <div className="flex items-start gap-4">
          <IoCalendarOutline className="text-2xl text-myshop-orange mt-2" />
          
          <div className="flex-1">
            {/* Día específico */ }
            { tipoReporte === 'dia' && (
              <div>
                <label className="block text-sm text-gray-600 mb-2 font-medium">
                  Seleccionar Fecha
                </label>
                <input
                  type="date"
                  value={ selectedDate }
                  onChange={ ( e ) => setSelectedDate( e.target.value ) }
                  className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-myshop-orange"
                />
              </div>
            ) }

            {/* Rango de días */ }
            { tipoReporte === 'rango' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2 font-medium">
                    Fecha Inicio
                  </label>
                  <input
                    type="date"
                    value={ fechaInicio }
                    onChange={ ( e ) => setFechaInicio( e.target.value ) }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-myshop-orange"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2 font-medium">
                    Fecha Fin
                  </label>
                  <input
                    type="date"
                    value={ fechaFin }
                    onChange={ ( e ) => setFechaFin( e.target.value ) }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-myshop-orange"
                  />
                </div>
              </div>
            ) }

            {/* Mes */ }
            { tipoReporte === 'mes' && (
              <div>
                <label className="block text-sm text-gray-600 mb-2 font-medium">
                  Seleccionar Mes y Año
                </label>
                <input
                  type="month"
                  value={ mesSeleccionado }
                  onChange={ ( e ) => setMesSeleccionado( e.target.value ) }
                  className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-myshop-orange"
                />
              </div>
            ) }

            {/* Año */ }
            { tipoReporte === 'año' && (
              <div>
                <label className="block text-sm text-gray-600 mb-2 font-medium">
                  Seleccionar Año
                </label>
                <select
                  value={ añoSeleccionado }
                  onChange={ ( e ) => setAñoSeleccionado( e.target.value ) }
                  className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-myshop-orange"
                >
                  { Array.from( { length: 10 }, ( _, i ) => new Date().getFullYear() - i ).map( ( year ) => (
                    <option key={ year } value={ year }>
                      { year }
                    </option>
                  ) ) }
                </select>
              </div>
            ) }

            {/* Botón generar reporte */ }
            <button className="mt-4 px-6 py-2 bg-myshop-orange text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors shadow-md">
              Generar Reporte
            </button>
          </div>
        </div>
      </div>

      {/* Resumen del día */ }
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-90">Total Ventas</span>
            <IoCashOutline className="text-2xl" />
          </div>
          <div className="text-3xl font-bold">{ totalVentas }</div>
          <div className="text-xs opacity-75 mt-1">ventas realizadas</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-90">Subtotal</span>
            <IoCashOutline className="text-2xl" />
          </div>
          <div className="text-3xl font-bold">S/ { totalSubtotal.toFixed( 2 ) }</div>
          <div className="text-xs opacity-75 mt-1">sin IGV</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-90">IGV (18%)</span>
            <IoCashOutline className="text-2xl" />
          </div>
          <div className="text-3xl font-bold">S/ { totalIGV.toFixed( 2 ) }</div>
          <div className="text-xs opacity-75 mt-1">impuesto</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-90">Total General</span>
            <IoCashOutline className="text-2xl" />
          </div>
          <div className="text-3xl font-bold">S/ { totalGeneral.toFixed( 2 ) }</div>
          <div className="text-xs opacity-75 mt-1">con IGV</div>
        </div>
      </div>

      {/* Resumen por método de pago */ }
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
          <div className="flex items-center gap-3 mb-2">
            <IoCashOutline className="text-2xl text-green-600" />
            <span className="font-semibold text-gray-700">Efectivo</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">S/ { totalEfectivo.toFixed( 2 ) }</div>
          <div className="text-sm text-gray-500">{ ventasEfectivo.length } ventas</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
          <div className="flex items-center gap-3 mb-2">
            <IoCardOutline className="text-2xl text-blue-600" />
            <span className="font-semibold text-gray-700">Tarjeta</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">S/ { totalTarjeta.toFixed( 2 ) }</div>
          <div className="text-sm text-gray-500">{ ventasTarjeta.length } ventas</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 h-6 bg-purple-600 text-white rounded flex items-center justify-center font-bold text-sm">
              Y
            </div>
            <span className="font-semibold text-gray-700">Yape</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">S/ { totalYape.toFixed( 2 ) }</div>
          <div className="text-sm text-gray-500">{ ventasYape.length } ventas</div>
        </div>
      </div>

      {/* Listado de ventas */ }
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-myshop-gray text-white px-6 py-4">
          <h2 className="text-xl font-semibold">Detalle de Ventas</h2>
        </div>

        {/* Vista móvil - Cards */ }
        <div className="md:hidden divide-y divide-gray-200">
          { ventasDelDia.map( ( venta ) => (
            <div key={ venta.id } className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-myshop-orange text-white rounded-full flex items-center justify-center font-bold">
                    { venta.id.split( '-' )[ 1 ] }
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{ venta.id }</div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <IoTimeOutline />
                      { venta.hora }
                    </div>
                  </div>
                </div>
                <div className="text-2xl">
                  { getMetodoPagoIcon( venta.metodoPago ) }
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Cajero:</span>
                  <div className="font-medium text-gray-800">{ venta.cajero }</div>
                </div>
                <div>
                  <span className="text-gray-500">Productos:</span>
                  <div className="font-medium text-gray-800">{ venta.productos }</div>
                </div>
                <div>
                  <span className="text-gray-500">Subtotal:</span>
                  <div className="font-medium text-gray-800">S/ { venta.subtotal.toFixed( 2 ) }</div>
                </div>
                <div>
                  <span className="text-gray-500">IGV:</span>
                  <div className="font-medium text-gray-800">S/ { venta.igv.toFixed( 2 ) }</div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-700">Total:</span>
                  <span className="text-2xl font-bold text-myshop-orange">
                    S/ { venta.total.toFixed( 2 ) }
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
                <th className="px-6 py-3 text-left text-sm font-semibold">Venta</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Hora</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Cajero</th>
                <th className="px-6 py-3 text-center text-sm font-semibold">Productos</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">Subtotal</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">IGV</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">Total</th>
                <th className="px-6 py-3 text-center text-sm font-semibold">Pago</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              { ventasDelDia.map( ( venta ) => (
                <tr key={ venta.id } className="hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-myshop-orange text-white rounded-full flex items-center justify-center font-bold text-sm">
                        { venta.id.split( '-' )[ 1 ] }
                      </div>
                      <span className="font-semibold text-gray-800">{ venta.id }</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <IoTimeOutline />
                      { venta.hora }
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <IoPersonOutline />
                      { venta.cajero }
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      { venta.productos }
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-gray-700">
                    S/ { venta.subtotal.toFixed( 2 ) }
                  </td>
                  <td className="px-6 py-4 text-right text-gray-600">
                    S/ { venta.igv.toFixed( 2 ) }
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-lg font-bold text-myshop-orange">
                      S/ { venta.total.toFixed( 2 ) }
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="text-2xl">
                        { getMetodoPagoIcon( venta.metodoPago ) }
                      </div>
                      <span className="text-sm text-gray-600 capitalize">
                        { venta.metodoPago }
                      </span>
                    </div>
                  </td>
                </tr>
              ) ) }
            </tbody>
            <tfoot className="bg-gray-50">
              <tr className="font-bold text-gray-800">
                <td colSpan={ 4 } className="px-6 py-4 text-right">
                  TOTALES DEL DÍA:
                </td>
                <td className="px-6 py-4 text-right">
                  S/ { totalSubtotal.toFixed( 2 ) }
                </td>
                <td className="px-6 py-4 text-right">
                  S/ { totalIGV.toFixed( 2 ) }
                </td>
                <td className="px-6 py-4 text-right text-myshop-orange text-xl">
                  S/ { totalGeneral.toFixed( 2 ) }
                </td>
                <td className="px-6 py-4"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}