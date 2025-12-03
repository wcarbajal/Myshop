'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  IoSearch,
  IoTrash,
  IoAdd,
  IoRemove,
  IoCash,
  IoCard,
  IoQrCode,
  IoClose,
  IoBarcode,
  IoCheckmarkCircle
} from 'react-icons/io5';

interface SaleItem {
  id: string;
  codigoean13: string;
  title: string;
  price: number;
  quantity: number;
  inStock: number;
  image?: string;
}

type PaymentMethod = 'efectivo' | 'tarjeta' | 'yape';

export default function NuevaVentaPage() {
  const [ items, setItems ] = useState<SaleItem[]>( [] );
  const [ searchQuery, setSearchQuery ] = useState( '' );
  const [ searchResults, setSearchResults ] = useState<SaleItem[]>( [] );
  const [ isSearching, setIsSearching ] = useState( false );
  const [ showResults, setShowResults ] = useState( false );
  const [ showPaymentModal, setShowPaymentModal ] = useState( false );
  const [ paymentMethod, setPaymentMethod ] = useState<PaymentMethod>( 'efectivo' );
  const [ amountReceived, setAmountReceived ] = useState( '' );
  const [ isProcessing, setIsProcessing ] = useState( false );

  // Calcular totales
  const total = items.reduce( ( sum, item ) => sum + item.price * item.quantity, 0 );
  const subtotal = total / 1.18;
  const igv = total - subtotal;
  const cambio = amountReceived ? parseFloat( amountReceived ) - total : 0;

  // Buscar producto (simulado - deberás conectar con tu API)
  const handleSearchProduct = async ( query: string ) => {
    if ( !query || query.trim().length < 2 ) {
      setSearchResults( [] );
      setShowResults( false );
      return;
    }

    setIsSearching( true );
    setShowResults( true );

    try {
      // TODO: Reemplazar con tu API real
      // const response = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`);
      // const data = await response.json();

      // Simulación de búsqueda - reemplazar con tu API
      const mockProducts: SaleItem[] = [
        {
          id: '1',
          codigoean13: '7750885005814',
          title: 'Gaseosa Inka Kola 1L',
          price: 4.50,
          inStock: 20,
          quantity: 1,
          image: undefined
        },
        {
          id: '2',
          codigoean13: '7622201234567',
          title: 'Leche Gloria Entera 1L',
          price: 5.20,
          inStock: 15,
          quantity: 1,
          image: undefined
        },
        {
          id: '3',
          codigoean13: '7750885001234',
          title: 'Arroz Paisana 1Kg',
          price: 3.80,
          inStock: 30,
          quantity: 1,
          image: undefined
        }
      ];

      // Filtrar por query (simulación)
      const filtered = mockProducts.filter( product =>
        product.title.toLowerCase().includes( query.toLowerCase() ) ||
        product.codigoean13.includes( query )
      );

      setSearchResults( filtered );
    } catch ( error ) {
      console.error( 'Error buscando productos:', error );
      setSearchResults( [] );
    } finally {
      setIsSearching( false );
    }
  };

  // Agregar producto a la venta
  const addItem = ( product: any ) => {
    const existingItem = items.find( item => item.id === product.id );

    if ( existingItem ) {
      updateQuantity( product.id, existingItem.quantity + 1 );
    } else {
      setItems( [ ...items, { ...product, quantity: 1 } ] );
    }
    setSearchQuery( '' );
    setSearchResults( [] );
    setShowResults( false );
  };

  // Manejar cambio en búsqueda
  const handleSearchChange = ( value: string ) => {
    setSearchQuery( value );
    handleSearchProduct( value );
  };

  // Actualizar cantidad
  const updateQuantity = ( id: string, newQuantity: number ) => {
    const item = items.find( i => i.id === id );
    if ( !item ) return;

    if ( newQuantity <= 0 ) {
      removeItem( id );
      return;
    }

    if ( newQuantity > item.inStock ) {
      alert( `Stock insuficiente. Disponible: ${ item.inStock }` );
      return;
    }

    setItems( items.map( item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ) );
  };

  // Eliminar producto
  const removeItem = ( id: string ) => {
    setItems( items.filter( item => item.id !== id ) );
  };

  // Procesar pago
  const handlePayment = async () => {
    if ( items.length === 0 ) {
      alert( 'Agrega productos a la venta' );
      return;
    }

    if ( paymentMethod === 'efectivo' && parseFloat( amountReceived ) < total ) {
      alert( 'El monto recibido es insuficiente' );
      return;
    }

    setIsProcessing( true );

    try {
      // TODO: Implementar lógica de pago y actualización de inventario
      // await createSale({
      //   items,
      //   paymentMethod,
      //   total,
      //   amountReceived: parseFloat(amountReceived)
      // });

      // Simular proceso
      await new Promise( resolve => setTimeout( resolve, 1500 ) );

      alert( '¡Venta registrada exitosamente!' );

      // Limpiar formulario
      setItems( [] );
      setShowPaymentModal( false );
      setAmountReceived( '' );
      setPaymentMethod( 'efectivo' );
    } catch ( error ) {
      alert( 'Error al procesar la venta' );
      console.error( error );
    } finally {
      setIsProcessing( false );
    }
  };

  // Cancelar venta
  const cancelSale = () => {
    if ( items.length > 0 && confirm( '¿Deseas cancelar esta venta?' ) ) {
      setItems( [] );
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-4 max-w-[1800px] mx-auto">
      {/* Panel Izquierdo - Productos */ }
      <div className="flex-1 bg-white rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col">
        {/* Header */ }
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-myshop-gray mb-4">Nueva Venta</h2>

          {/* Búsqueda */ }
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl z-10" />
              <input
                type="text"
                value={ searchQuery }
                onChange={ ( e ) => handleSearchChange( e.target.value ) }
                onFocus={ () => searchResults.length > 0 && setShowResults( true ) }
                placeholder="Buscar por código, nombre o descripción..."
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-myshop-orange focus:outline-none"
              />

              {/* Resultados de búsqueda */ }
              { showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-20 max-h-96 overflow-auto">
                  { isSearching ? (
                    <div className="p-4 text-center text-gray-500">
                      <div className="w-6 h-6 border-2 border-myshop-orange border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                      Buscando...
                    </div>
                  ) : (
                    <>
                      <div className="sticky top-0 bg-gray-50 px-4 py-2 border-b border-gray-200">
                        <p className="text-sm text-gray-600 font-semibold">
                          { searchResults.length } resultado(s) encontrado(s)
                        </p>
                      </div>
                      { searchResults.map( ( product ) => (
                        <button
                          key={ product.id }
                          onClick={ () => addItem( product ) }
                          className="w-full p-3 hover:bg-orange-50 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-0"
                        >
                          {/* Imagen */ }
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            { product.image ? (
                              <Image src={ product.image } alt={ product.title } width={ 48 } height={ 48 } className="w-full h-full object-contain" />
                            ) : (
                              <span className="text-2xl">📦</span>
                            ) }
                          </div>

                          {/* Info */ }
                          <div className="flex-1 text-left min-w-0">
                            <h4 className="font-semibold text-myshop-gray truncate text-sm">{ product.title }</h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>{ product.codigoean13 }</span>
                              <span>•</span>
                              <span className={ `font-semibold ${ product.inStock > 0 ? 'text-green-600' : 'text-red-600' }` }>
                                Stock: { product.inStock }
                              </span>
                            </div>
                          </div>

                          {/* Precio */ }
                          <div className="text-right flex-shrink-0">
                            <p className="font-bold text-myshop-orange text-lg">S/ { product.price.toFixed( 2 ) }</p>
                          </div>
                        </button>
                      ) ) }
                    </>
                  ) }
                </div>
              ) }

              { showResults && !isSearching && searchResults.length === 0 && searchQuery.length >= 2 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-20 p-4 text-center text-gray-500">
                  <IoSearch className="text-4xl mx-auto mb-2 text-gray-300" />
                  <p>No se encontraron productos</p>
                </div>
              ) }
            </div>
            <button
              type="button"
              className="px-6 py-3 bg-myshop-orange hover:bg-orange-600 text-white rounded-xl font-semibold transition-all flex items-center gap-2"
            >
              <IoBarcode className="text-xl" />
              <span className="hidden sm:inline">Escanear</span>
            </button>
          </div>

          {/* Overlay para cerrar resultados */ }
          { showResults && (
            <div
              className="fixed inset-0 z-10"
              onClick={ () => setShowResults( false ) }
            />
          ) }
        </div>

        {/* Lista de productos */ }
        <div className="flex-1 overflow-auto">
          { items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <IoSearch className="text-6xl mb-4" />
              <p className="text-lg">Busca y agrega productos a la venta</p>
            </div>
          ) : (
            <div className="space-y-3">
              { items.map( ( item ) => (
                <div
                  key={ item.id }
                  className="bg-gray-50 rounded-xl p-4 flex items-center gap-4 hover:bg-gray-100 transition-colors"
                >
                  {/* Imagen */ }
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                    { item.image ? (
                      <Image src={ item.image } alt={ item.title } width={ 64 } height={ 64 } className="w-full h-full object-contain" />
                    ) : (
                      <div className="text-gray-300 text-2xl">📦</div>
                    ) }
                  </div>

                  {/* Info */ }
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-myshop-gray truncate">{ item.title }</h3>
                    <p className="text-sm text-gray-500">Stock: { item.inStock }</p>
                    <p className="text-lg font-bold text-myshop-orange">S/ { item.price.toFixed( 2 ) }</p>
                  </div>

                  {/* Controles de cantidad */ }
                  <div className="flex items-center gap-2">
                    <button
                      onClick={ () => updateQuantity( item.id, item.quantity - 1 ) }
                      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <IoRemove />
                    </button>
                    <input
                      type="number"
                      value={ item.quantity }
                      onChange={ ( e ) => updateQuantity( item.id, parseInt( e.target.value ) || 0 ) }
                      className="w-16 text-center py-1 border-2 border-gray-200 rounded-lg font-semibold"
                      min="1"
                      max={ item.inStock }
                    />
                    <button
                      onClick={ () => updateQuantity( item.id, item.quantity + 1 ) }
                      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <IoAdd />
                    </button>
                  </div>

                  {/* Subtotal y eliminar */ }
                  <div className="flex items-center gap-3">
                    <p className="font-bold text-lg text-myshop-gray min-w-[80px] text-right">
                      S/ { ( item.price * item.quantity ).toFixed( 2 ) }
                    </p>
                    <button
                      onClick={ () => removeItem( item.id ) }
                      className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <IoTrash />
                    </button>
                  </div>
                </div>
              ) ) }
            </div>
          ) }
        </div>
      </div>

      {/* Panel Derecho - Resumen y Pago */ }
      <div className="lg:w-96 bg-white rounded-2xl shadow-lg p-6 flex flex-col">
        {/* Resumen */ }
        <h3 className="text-xl font-bold text-myshop-gray mb-4">Resumen de Venta</h3>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal:</span>
            <span className="font-semibold">S/ { subtotal.toFixed( 2 ) }</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>IGV (18%):</span>
            <span className="font-semibold">S/ { igv.toFixed( 2 ) }</span>
          </div>
          <div className="h-px bg-gray-200"></div>
          <div className="flex justify-between text-2xl font-bold text-myshop-gray">
            <span>Total:</span>
            <span className="text-myshop-orange">S/ { total.toFixed( 2 ) }</span>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Productos:</span>
              <span className="font-semibold">{ items.reduce( ( sum, item ) => sum + item.quantity, 0 ) }</span>
            </div>
          </div>
        </div>

        {/* Botones de acción */ }
        <div className="mt-auto space-y-3">
          <button
            onClick={ () => setShowPaymentModal( true ) }
            disabled={ items.length === 0 }
            className="w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            PROCESAR PAGO
          </button>

          <button
            onClick={ cancelSale }
            className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all"
          >
            Cancelar Venta
          </button>
        </div>
      </div>

      {/* Modal de Pago */ }
      { showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-myshop-gray">Procesar Pago</h3>
              <button
                onClick={ () => setShowPaymentModal( false ) }
                className="text-gray-400 hover:text-gray-600"
              >
                <IoClose className="text-3xl" />
              </button>
            </div>

            {/* Total a pagar */ }
            <div className="bg-gradient-to-r from-myshop-orange to-orange-600 text-white rounded-xl p-6 mb-6 text-center">
              <p className="text-sm opacity-90 mb-1">Total a Pagar</p>
              <p className="text-4xl font-bold">S/ { total.toFixed( 2 ) }</p>
            </div>

            {/* Métodos de pago */ }
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Método de Pago</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={ () => setPaymentMethod( 'efectivo' ) }
                  className={ `p-4 rounded-xl border-2 transition-all ${ paymentMethod === 'efectivo'
                    ? 'border-myshop-orange bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                    }` }
                >
                  <IoCash className={ `text-3xl mx-auto mb-2 ${ paymentMethod === 'efectivo' ? 'text-myshop-orange' : 'text-gray-400' }` } />
                  <p className="text-xs font-semibold">Efectivo</p>
                </button>

                <button
                  onClick={ () => setPaymentMethod( 'tarjeta' ) }
                  className={ `p-4 rounded-xl border-2 transition-all ${ paymentMethod === 'tarjeta'
                    ? 'border-myshop-orange bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                    }` }
                >
                  <IoCard className={ `text-3xl mx-auto mb-2 ${ paymentMethod === 'tarjeta' ? 'text-myshop-orange' : 'text-gray-400' }` } />
                  <p className="text-xs font-semibold">Tarjeta</p>
                </button>

                <button
                  onClick={ () => setPaymentMethod( 'yape' ) }
                  className={ `p-4 rounded-xl border-2 transition-all ${ paymentMethod === 'yape'
                    ? 'border-myshop-orange bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                    }` }
                >
                  <IoQrCode className={ `text-3xl mx-auto mb-2 ${ paymentMethod === 'yape' ? 'text-myshop-orange' : 'text-gray-400' }` } />
                  <p className="text-xs font-semibold">Yape</p>
                </button>
              </div>
            </div>

            {/* Monto recibido (solo para efectivo) */ }
            { paymentMethod === 'efectivo' && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Monto Recibido</label>
                <input
                  type="number"
                  value={ amountReceived }
                  onChange={ ( e ) => setAmountReceived( e.target.value ) }
                  placeholder="0.00"
                  step="0.01"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-myshop-orange focus:outline-none text-lg font-semibold"
                />
                { cambio > 0 && (
                  <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700">
                      Cambio: <span className="font-bold text-lg">S/ { cambio.toFixed( 2 ) }</span>
                    </p>
                  </div>
                ) }
              </div>
            ) }

            {/* Botones */ }
            <div className="flex gap-3">
              <button
                onClick={ () => setShowPaymentModal( false ) }
                className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={ handlePayment }
                disabled={ isProcessing || ( paymentMethod === 'efectivo' && parseFloat( amountReceived ) < total ) }
                className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-all disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                { isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Procesando...
                  </>
                ) : (
                  <>
                    <IoCheckmarkCircle className="text-xl" />
                    Confirmar Pago
                  </>
                ) }
              </button>
            </div>
          </div>
        </div>
      ) }
    </div>
  );
}