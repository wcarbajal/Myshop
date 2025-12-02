"use client";

import { useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { IoBarcode } from 'react-icons/io5';

interface Props {
  onProductFound: ( barcode: string ) => void;
}

export const AdminBarcodeSearch = ( { onProductFound }: Props ) => {
  const [ showScanner, setShowScanner ] = useState( false );
  const [ scanning, setScanning ] = useState( false );
  const [ message, setMessage ] = useState( 'Presiona "Iniciar Escaneo" para buscar un producto' );
  const [ html5QrCodeInstance, setHtml5QrCodeInstance ] = useState<Html5Qrcode | null>( null );

  const startScanning = async () => {
    try {
      setScanning( true );
      setMessage( 'Detectando cámaras disponibles...' );

      const html5QrCode = new Html5Qrcode( "admin-barcode-reader" );
      setHtml5QrCodeInstance( html5QrCode );

      const devices = await Html5Qrcode.getCameras();

      if ( !devices || devices.length === 0 ) {
        throw new Error( 'No se encontraron cámaras disponibles' );
      }

      // Priorizar cámara posterior
      const backCameras = devices.filter( d =>
        d.label?.toLowerCase().includes( 'back' ) ||
        d.label?.toLowerCase().includes( 'rear' ) ||
        d.label?.toLowerCase().includes( 'trasera' ) ||
        d.label?.toLowerCase().includes( 'posterior' )
      );
      const orderedDevices = [ ...backCameras, ...devices.filter( d => !backCameras.includes( d ) ) ];

      setMessage( 'Iniciando cámara...' );

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
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

      let cameraStarted = false;
      for ( let i = 0; i < orderedDevices.length; i++ ) {
        try {
          await html5QrCode.start(
            orderedDevices[ i ].id,
            config,
            async ( decodedText ) => {
              setMessage( `Código detectado: ${ decodedText }` );
              await html5QrCode.stop();
              setScanning( false );
              setShowScanner( false );

              // Buscar producto por código
              onProductFound( decodedText );
            },
            ( errorMessage ) => {
              // Errores normales de escaneo
            }
          );

          cameraStarted = true;
          setMessage( '📸 Cámara lista - Apunta al código de barras del producto' );
          break;

        } catch ( cameraError: any ) {
          if ( i === orderedDevices.length - 1 && !cameraStarted ) {
            throw new Error( 'No se pudo iniciar ninguna cámara.' );
          }
        }
      }

      if ( !cameraStarted ) {
        throw new Error( 'No se pudo iniciar la cámara' );
      }

    } catch ( err: any ) {
      let errorMsg = 'Error al acceder a la cámara.';

      if ( err.name === 'NotAllowedError' || err.message?.includes( 'Permission' ) ) {
        errorMsg = '❌ Permiso denegado. Permite el acceso a la cámara.';
      } else if ( err.name === 'NotFoundError' ) {
        errorMsg = '❌ No se encontró cámara disponible.';
      } else if ( err.message ) {
        errorMsg = `❌ Error: ${ err.message }`;
      }

      setMessage( errorMsg );
      setScanning( false );
    }
  };

  const stopScanning = async () => {
    try {
      if ( html5QrCodeInstance ) {
        try {
          const state = await html5QrCodeInstance.getState();
          if ( state === 2 ) {
            await html5QrCodeInstance.stop();
          }
        } catch ( innerErr ) {
          // Ignorar error si el scanner ya está detenido
        }
      }
    } catch ( err: any ) {
      // Ignorar cualquier error al detener
    } finally {
      setScanning( false );
      setShowScanner( false );
    }
  };

  return (
    <>
      <button
        onClick={ () => setShowScanner( true ) }
        className="flex items-center gap-2 px-3 py-2 bg-myshop-orange hover:bg-orange-600 text-white rounded transition-all"
        title="Buscar producto por código de barras"
      >
        <IoBarcode className="w-5 h-5" />
        <span className="hidden md:inline text-sm font-semibold">Buscar Producto</span>
      </button>

      { showScanner && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  🔍 Buscar Producto Registrado
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
                  <div id="admin-barcode-reader" className="w-full min-h-[300px]"></div>
                </div>

                {/* Mensajes */ }
                { message && (
                  <div className={ `p-4 rounded-lg ${ message.includes( 'Error' ) ? 'bg-red-100 text-red-700' :
                      message.includes( 'detectado' ) ? 'bg-green-100 text-green-700' :
                        'bg-blue-100 text-blue-700'
                    }` }>
                    <p className="whitespace-pre-line">{ message }</p>
                  </div>
                ) }

                {/* Botones */ }
                <div className="flex gap-3">
                  { !scanning ? (
                    <button
                      onClick={ startScanning }
                      className="btn-primary flex-1"
                    >
                      📷 Iniciar Escaneo
                    </button>
                  ) : (
                    <button
                      onClick={ stopScanning }
                      className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded transition-all flex-1"
                    >
                      ⏹ Detener
                    </button>
                  ) }
                  <button
                    onClick={ stopScanning }
                    className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded transition-all"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) }
    </>
  );
};
