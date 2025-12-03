'use client';

import { useState } from 'react';
import {
  IoSearch,
  IoFilter,
  IoEye,
  IoCash,
  IoCard,
  IoCalendar,
  IoPersonOutline,
  IoReceiptOutline,
  IoTimeOutline,
  IoCloseCircle,
  IoCheckmarkCircle,
  IoCartOutline,
  IoPrintOutline,
  IoDownloadOutline,
  IoLocation,
} from 'react-icons/io5';

interface ProductoVenta {
  id: string;
  codigoean13: string;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

interface VentaHistorial {
  id: string;
  numeroFactura: string;
  fecha: string;
  hora: string;
  cliente: {
    nombre: string;
    documento: string;
    tipo: 'DNI' | 'RUC';
    direccion?: string;
    telefono?: string;
  };
  productos: ProductoVenta[];
  subtotal: number;
  igv: number;
  total: number;
  metodoPago: 'efectivo' | 'tarjeta' | 'yape';
  cajero: string;
  estado: 'completado' | 'anulado';
  montoPagado?: number;
  cambio?: number;
}

export default function HistorialPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroMetodoPago, setFiltroMetodoPago] = useState<string>('todos');
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [ventaSeleccionada, setVentaSeleccionada] = useState<VentaHistorial | null>(null);
  const [mostrarDetalle, setMostrarDetalle] = useState(false);

  // Datos de muestra - Historial de ventas
  const ventasHistorial: VentaHistorial[] = [
    {
      id: '1',
      numeroFactura: 'F001-00156',
      fecha: '2025-12-02',
      hora: '15:30',
      cliente: {
        nombre: 'Juan Pérez García',
        documento: '12345678',
        tipo: 'DNI',
        direccion: 'Av. Principal 123, Lima',
        telefono: '987654321',
      },
      productos: [
        { id: '1', codigoean13: '7751271013130', nombre: 'Inka Kola 1.5L', cantidad: 2, precioUnitario: 4.50, subtotal: 9.00 },
        { id: '2', codigoean13: '7751271013147', nombre: 'Leche Gloria Entera', cantidad: 3, precioUnitario: 5.20, subtotal: 15.60 },
        { id: '3', codigoean13: '7751271013154', nombre: 'Pan Integral', cantidad: 1, precioUnitario: 3.80, subtotal: 3.80 },
      ],
      subtotal: 28.40,
      igv: 5.11,
      total: 33.51,
      metodoPago: 'efectivo',
      cajero: 'María García',
      estado: 'completado',
      montoPagado: 50.00,
      cambio: 16.49,
    },
    {
      id: '2',
      numeroFactura: 'F001-00155',
      fecha: '2025-12-02',
      hora: '14:15',
      cliente: {
        nombre: 'Comercial ABC SAC',
        documento: '20123456789',
        tipo: 'RUC',
        direccion: 'Jr. Comercio 456, Lima',
        telefono: '014567890',
      },
      productos: [
        { id: '1', codigoean13: '7751271013161', nombre: 'Arroz Costeño 5kg', cantidad: 5, precioUnitario: 18.50, subtotal: 92.50 },
        { id: '2', codigoean13: '7751271013178', nombre: 'Aceite Primor 1L', cantidad: 3, precioUnitario: 12.80, subtotal: 38.40 },
      ],
      subtotal: 130.90,
      igv: 23.56,
      total: 154.46,
      metodoPago: 'tarjeta',
      cajero: 'Carlos López',
      estado: 'completado',
    },
    {
      id: '3',
      numeroFactura: 'F001-00154',
      fecha: '2025-12-02',
      hora: '12:45',
      cliente: {
        nombre: 'Ana María Torres',
        documento: '87654321',
        tipo: 'DNI',
        telefono: '912345678',
      },
      productos: [
        { id: '1', codigoean13: '7751271013185', nombre: 'Yogurt Laive 1L', cantidad: 4, precioUnitario: 6.50, subtotal: 26.00 },
        { id: '2', codigoean13: '7751271013192', nombre: 'Galletas Soda', cantidad: 2, precioUnitario: 3.20, subtotal: 6.40 },
      ],
      subtotal: 32.40,
      igv: 5.83,
      total: 38.23,
      metodoPago: 'yape',
      cajero: 'María García',
      estado: 'completado',
    },
    {
      id: '4',
      numeroFactura: 'F001-00153',
      fecha: '2025-12-01',
      hora: '18:20',
      cliente: {
        nombre: 'Pedro Sánchez',
        documento: '11223344',
        tipo: 'DNI',
        telefono: '998877665',
      },
      productos: [
        { id: '1', codigoean13: '7751271013208', nombre: 'Cerveza Cristal Pack 6', cantidad: 2, precioUnitario: 24.50, subtotal: 49.00 },
      ],
      subtotal: 49.00,
      igv: 8.82,
      total: 57.82,
      metodoPago: 'efectivo',
      cajero: 'Juan Pérez',
      estado: 'anulado',
      montoPagado: 60.00,
      cambio: 2.18,
    },
    {
      id: '5',
      numeroFactura: 'F001-00152',
      fecha: '2025-12-01',
      hora: '16:10',
      cliente: {
        nombre: 'Rosa Díaz Mendoza',
        documento: '55667788',
        tipo: 'DNI',
        direccion: 'Calle Las Flores 789',
        telefono: '955443322',
      },
      productos: [
        { id: '1', codigoean13: '7751271013215', nombre: 'Detergente Ariel 1kg', cantidad: 2, precioUnitario: 15.90, subtotal: 31.80 },
        { id: '2', codigoean13: '7751271013222', nombre: 'Papel Higiénico Elite 12u', cantidad: 1, precioUnitario: 18.50, subtotal: 18.50 },
        { id: '3', codigoean13: '7751271013239', nombre: 'Jabón Dove 3pack', cantidad: 1, precioUnitario: 12.30, subtotal: 12.30 },
      ],
      subtotal: 62.60,
      igv: 11.27,
      total: 73.87,
      metodoPago: 'tarjeta',
      cajero: 'Carlos López',
      estado: 'completado',
    },
  ];

  // Filtrar ventas
  const ventasFiltradas = ventasHistorial.filter((venta) => {
    const matchSearch =
      venta.numeroFactura.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venta.cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venta.cliente.documento.includes(searchTerm);

    const matchMetodoPago = filtroMetodoPago === 'todos' || venta.metodoPago === filtroMetodoPago;
    const matchEstado = filtroEstado === 'todos' || venta.estado === filtroEstado;

    let matchFecha = true;
    if (fechaInicio && fechaFin) {
      matchFecha = venta.fecha >= fechaInicio && venta.fecha <= fechaFin;
    }

    return matchSearch && matchMetodoPago && matchEstado && matchFecha;
  });

  const getMetodoPagoIcon = (metodo: string) => {
    switch (metodo) {
      case 'efectivo':
        return <IoCash className="text-green-600 text-xl" />;
      case 'tarjeta':
        return <IoCard className="text-blue-600 text-xl" />;
      case 'yape':
        return <div className="w-5 h-5 bg-purple-600 text-white rounded flex items-center justify-center font-bold text-xs">Y</div>;
      default:
        return null;
    }
  };

  const getEstadoBadge = (estado: string) => {
    if (estado === 'completado') {
      return (
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1">
          <IoCheckmarkCircle />
          Completado
        </span>
      );
    }
    return (
      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold flex items-center gap-1">
        <IoCloseCircle />
        Anulado
      </span>
    );
  };

  const verDetalle = (venta: VentaHistorial) => {
    setVentaSeleccionada(venta);
    setMostrarDetalle(true);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-myshop-orange to-orange-600 rounded-lg flex items-center justify-center">
            <IoReceiptOutline className="text-2xl text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-myshop-gray">Historial de Ventas</h1>
            <p className="text-sm text-gray-500">Busca y consulta ventas anteriores</p>
          </div>
        </div>

        {/* Búsqueda y filtros */}
        <div className="space-y-4">
          {/* Barra de búsqueda */}
          <div className="relative">
            <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Buscar por número de factura, cliente o documento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-myshop-orange"
            />
          </div>

          {/* Filtros */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Método de Pago</label>
              <select
                value={filtroMetodoPago}
                onChange={(e) => setFiltroMetodoPago(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-myshop-orange"
              >
                <option value="todos">Todos</option>
                <option value="efectivo">Efectivo</option>
                <option value="tarjeta">Tarjeta</option>
                <option value="yape">Yape</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-myshop-orange"
              >
                <option value="todos">Todos</option>
                <option value="completado">Completado</option>
                <option value="anulado">Anulado</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicio</label>
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-myshop-orange"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Fin</label>
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-myshop-orange"
              />
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="mt-4 text-sm text-gray-600">
          Mostrando <span className="font-semibold text-myshop-orange">{ventasFiltradas.length}</span> de{' '}
          <span className="font-semibold">{ventasHistorial.length}</span> ventas
        </div>
      </div>

      {/* Listado de ventas */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-myshop-gray text-white px-6 py-4">
          <h2 className="text-xl font-semibold">Resultados de Búsqueda</h2>
        </div>

        {/* Vista móvil - Cards */}
        <div className="md:hidden divide-y divide-gray-200">
          {ventasFiltradas.map((venta) => (
            <div key={venta.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-bold text-gray-800">{venta.numeroFactura}</div>
                  <div className="text-sm text-gray-500">
                    {venta.fecha} - {venta.hora}
                  </div>
                </div>
                {getEstadoBadge(venta.estado)}
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-sm">
                  <IoPersonOutline className="text-gray-400" />
                  <span className="text-gray-700">{venta.cliente.nombre}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">Doc:</span>
                  <span className="text-gray-700">{venta.cliente.documento}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getMetodoPagoIcon(venta.metodoPago)}
                    <span className="text-sm text-gray-600 capitalize">{venta.metodoPago}</span>
                  </div>
                  <span className="text-xl font-bold text-green-600">S/ {venta.total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => verDetalle(venta)}
                className="w-full px-4 py-2 bg-myshop-orange text-white rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
              >
                <IoEye />
                Ver Detalle
              </button>
            </div>
          ))}
        </div>

        {/* Vista desktop - Tabla */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-myshop-gray text-white">
                <th className="px-6 py-3 text-left text-sm font-semibold">Factura</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Fecha/Hora</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Cliente</th>
                <th className="px-6 py-3 text-center text-sm font-semibold">Items</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">Total</th>
                <th className="px-6 py-3 text-center text-sm font-semibold">Pago</th>
                <th className="px-6 py-3 text-center text-sm font-semibold">Estado</th>
                <th className="px-6 py-3 text-center text-sm font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ventasFiltradas.map((venta) => (
                <tr key={venta.id} className="hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-800">{venta.numeroFactura}</div>
                    <div className="text-xs text-gray-500">Cajero: {venta.cajero}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <IoCalendar className="text-gray-400" />
                      {venta.fecha}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <IoTimeOutline className="text-gray-400" />
                      {venta.hora}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">{venta.cliente.nombre}</div>
                    <div className="text-sm text-gray-500">
                      {venta.cliente.tipo}: {venta.cliente.documento}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {venta.productos.length}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-xl font-bold text-green-600">S/ {venta.total.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {getMetodoPagoIcon(venta.metodoPago)}
                      <span className="text-sm text-gray-600 capitalize">{venta.metodoPago}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">{getEstadoBadge(venta.estado)}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => verDetalle(venta)}
                      className="px-4 py-2 bg-myshop-orange text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors inline-flex items-center gap-2"
                    >
                      <IoEye />
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {ventasFiltradas.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            <IoSearch className="text-6xl mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No se encontraron ventas</p>
            <p className="text-sm">Intenta con otros criterios de búsqueda</p>
          </div>
        )}
      </div>

      {/* Modal de detalle */}
      {mostrarDetalle && ventaSeleccionada && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header del modal */}
            <div className="bg-myshop-gray text-white px-6 py-4 flex items-center justify-between sticky top-0">
              <div className="flex items-center gap-3">
                <IoReceiptOutline className="text-2xl" />
                <div>
                  <h2 className="text-xl font-bold">Detalle de Venta</h2>
                  <p className="text-sm opacity-90">{ventaSeleccionada.numeroFactura}</p>
                </div>
              </div>
              <button
                onClick={() => setMostrarDetalle(false)}
                className="text-white hover:text-red-300 transition-colors"
              >
                <IoCloseCircle className="text-3xl" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Información general */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Datos de venta */}
                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <IoReceiptOutline className="text-myshop-orange" />
                    Información de Venta
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Número de Factura</span>
                      <p className="font-semibold text-gray-800">{ventaSeleccionada.numeroFactura}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Fecha y Hora</span>
                      <p className="font-semibold text-gray-800">
                        {ventaSeleccionada.fecha} - {ventaSeleccionada.hora}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Cajero</span>
                      <p className="font-semibold text-gray-800">{ventaSeleccionada.cajero}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Estado</span>
                      <div className="mt-1">{getEstadoBadge(ventaSeleccionada.estado)}</div>
                    </div>
                  </div>
                </div>

                {/* Datos del cliente */}
                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <IoPersonOutline className="text-myshop-orange" />
                    Información del Cliente
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Nombre</span>
                      <p className="font-semibold text-gray-800">{ventaSeleccionada.cliente.nombre}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Documento</span>
                      <p className="font-semibold text-gray-800">
                        {ventaSeleccionada.cliente.tipo}: {ventaSeleccionada.cliente.documento}
                      </p>
                    </div>
                    {ventaSeleccionada.cliente.telefono && (
                      <div>
                        <span className="text-sm text-gray-500">Teléfono</span>
                        <p className="font-semibold text-gray-800">{ventaSeleccionada.cliente.telefono}</p>
                      </div>
                    )}
                    {ventaSeleccionada.cliente.direccion && (
                      <div>
                        <span className="text-sm text-gray-500">Dirección</span>
                        <p className="font-semibold text-gray-800">{ventaSeleccionada.cliente.direccion}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Productos */}
              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <IoCartOutline className="text-myshop-orange" />
                  Productos Vendidos
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-300">
                        <th className="text-left py-2 text-sm font-semibold text-gray-700">Código</th>
                        <th className="text-left py-2 text-sm font-semibold text-gray-700">Producto</th>
                        <th className="text-center py-2 text-sm font-semibold text-gray-700">Cant.</th>
                        <th className="text-right py-2 text-sm font-semibold text-gray-700">P. Unit.</th>
                        <th className="text-right py-2 text-sm font-semibold text-gray-700">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ventaSeleccionada.productos.map((producto) => (
                        <tr key={producto.id} className="border-b border-gray-200">
                          <td className="py-3 text-sm text-gray-600">{producto.codigoean13}</td>
                          <td className="py-3 font-medium text-gray-800">{producto.nombre}</td>
                          <td className="py-3 text-center text-gray-700">{producto.cantidad}</td>
                          <td className="py-3 text-right text-gray-700">S/ {producto.precioUnitario.toFixed(2)}</td>
                          <td className="py-3 text-right font-semibold text-gray-800">
                            S/ {producto.subtotal.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Totales y pago */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Resumen de pago */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-5">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    {getMetodoPagoIcon(ventaSeleccionada.metodoPago)}
                    Método de Pago
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Método:</span>
                      <span className="font-semibold text-gray-800 capitalize">{ventaSeleccionada.metodoPago}</span>
                    </div>
                    {ventaSeleccionada.montoPagado && (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Monto Pagado:</span>
                          <span className="font-semibold text-gray-800">S/ {ventaSeleccionada.montoPagado.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Cambio:</span>
                          <span className="font-semibold text-green-600">S/ {ventaSeleccionada.cambio?.toFixed(2)}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Totales */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-5">
                  <h3 className="font-bold text-gray-800 mb-4">Resumen de Facturación</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-semibold text-gray-800">S/ {ventaSeleccionada.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">IGV (18%):</span>
                      <span className="font-semibold text-gray-800">S/ {ventaSeleccionada.igv.toFixed(2)}</span>
                    </div>
                    <div className="border-t-2 border-green-300 pt-2 mt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-800">Total:</span>
                        <span className="text-2xl font-bold text-green-600">
                          S/ {ventaSeleccionada.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Acciones */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <IoPrintOutline className="text-xl" />
                  Imprimir Factura
                </button>
                <button className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                  <IoDownloadOutline className="text-xl" />
                  Descargar PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}