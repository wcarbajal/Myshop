"use client";

import { useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { fetchProductByBarcode } from '@/actions';

interface ProductData {
  found: boolean;
  barcode: string;
  name?: string;
  brand?: string;
  description?: string;
  quantity?: string;
  category?: string;
  imageUrl?: string;
  price?: number;
  source?: string;
}

interface Props {
  onProductFound: ( data: ProductData ) => void;
  onClose: () => void;
}

export const BarcodeScanner = ( { onProductFound, onClose }: Props ) => {
  const [ scanning, setScanning ] = useState( false );
  const [ message, setMessage ] = useState( '' );
  const [ loading, setLoading ] = useState( false );

  const startScanning = async () => {
    try {
      setScanning( true );
      setMessage( 'Iniciando cámara...' );

      const html5QrCode = new Html5Qrcode( "barcode-reader" );

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        formatsToSupport: [
          // @ts-ignore
          Html5Qrcode.SCAN_TYPE_EAN_13,
          // @ts-ignore
          Html5Qrcode.SCAN_TYPE_EAN_8,
          // @ts-ignore
          Html5Qrcode.SCAN_TYPE_UPC_A,
          // @ts-ignore
          Html5Qrcode.SCAN_TYPE_UPC_E,
        ]
      };

      await html5QrCode.start(
        { facingMode: "environment" },
        config,
        async ( decodedText ) => {
          setMessage( `Código detectado: ${ decodedText }` );
          setLoading( true );

          // Detener el escaneo
          await html5QrCode.stop();
          setScanning( false );

          // Buscar información del producto
          setMessage( 'Buscando información del producto...' );
          const productData = await fetchProductByBarcode( decodedText );

          setLoading( false );

          if ( productData.found ) {
            setMessage( `¡Producto encontrado! ${ productData.name }` );
            onProductFound( productData );
          } else {
            setMessage( `Código escaneado: ${ decodedText }\nNo se encontró información. Puedes ingresar los datos manualmente.` );
            onProductFound( {
              found: false,
              barcode: decodedText
            } );
          }
        },
        ( errorMessage ) => {
          // Errores de escaneo (normales mientras busca código)
        }
      );

      setMessage( 'Apunta la cámara al código de barras' );
    } catch ( err ) {
      console.error( 'Error al iniciar el escáner:', err );
      setMessage( 'Error al acceder a la cámara. Verifica los permisos.' );
      setScanning( false );
    }
  };

  const stopScanning = async () => {
    try {
      const html5QrCode = new Html5Qrcode( "barcode-reader" );
      await html5QrCode.stop();
      setScanning( false );
      onClose();
    } catch ( err ) {
      console.error( 'Error al detener el escáner:', err );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Escanear Código de Barras
            </h2>
            <button
              onClick={ stopScanning }
              className="text-gray-500 hover:text-gray-700 text-3xl"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            {/* Área de escaneo */ }
            <div className="relative bg-gray-100 rounded-lg overflow-hidden">
              <div id="barcode-reader" className="w-full min-h-[300px]"></div>
            </div>

            {/* Mensajes */ }
            { message && (
              <div className={ `p-4 rounded-lg ${ message.includes( 'Error' ) ? 'bg-red-100 text-red-700' :
                  message.includes( 'encontrado' ) ? 'bg-green-100 text-green-700' :
                    'bg-blue-100 text-blue-700'
                }` }>
                <p className="whitespace-pre-line">{ message }</p>
              </div>
            ) }

            {/* Loading */ }
            { loading && (
              <div className="flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-plazavea-green"></div>
                <span className="ml-3 text-gray-600">Buscando producto...</span>
              </div>
            ) }

            {/* Botones */ }
            <div className="flex gap-3">
              { !scanning ? (
                <button
                  onClick={ startScanning }
                  disabled={ loading }
                  className="flex-1 bg-plazavea-green hover:bg-plazavea-green-dark text-white py-3 px-6 rounded-lg font-medium transition-colors disabled:bg-gray-400"
                >
                  { loading ? 'Procesando...' : 'Iniciar Escaneo' }
                </button>
              ) : (
                <button
                  onClick={ stopScanning }
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Detener Escaneo
                </button>
              ) }

              <button
                onClick={ onClose }
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>

            {/* Instrucciones */ }
            <div className="text-sm text-gray-600 space-y-2">
              <p className="font-medium">Instrucciones:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Permite el acceso a la cámara cuando se solicite</li>
                <li>Centra el código de barras en el cuadro</li>
                <li>Mantén la cámara estable y enfocada</li>
                <li>Asegúrate de tener buena iluminación</li>
                <li>Compatible con EAN-13, EAN-8, UPC-A, UPC-E</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
