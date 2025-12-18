'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { culqiConfig } from '@/config/culqi';

interface Props {
  orderId: string;
  amount: number; // Monto en soles (ej: 100.50)
  email: string;
  description?: string;
  publicKey?: string; // Llave pública de Culqi
}

declare global {
  interface Window {
    Culqi: any;
    culqi: () => void;
  }
}

export const CulqiCheckout = ( { orderId, amount, email, description, publicKey }: Props ) => {
  const [ isLoading, setIsLoading ] = useState( false );
  const [ error, setError ] = useState<string | null>( null );
  const [ success, setSuccess ] = useState( false );

  // Intentar obtener la llave pública de diferentes fuentes
  const culqiPublicKey = publicKey || culqiConfig.publicKey;

  // Debug: mostrar la llave en consola (solo para desarrollo)
  useEffect( () => {
    if ( process.env.NODE_ENV === 'development' ) {
      console.log( '🔑 Culqi Public Key:', culqiPublicKey ? 'Configurada ✅' : 'No configurada ❌' );
      console.log( '🔑 Key value:', culqiPublicKey );
    }
  }, [ culqiPublicKey ] );

  useEffect( () => {
    if ( !culqiPublicKey ) {
      setError( 'Error de configuración: Llave pública de Culqi no disponible' );
      console.error( '❌ No se encontró NEXT_PUBLIC_CULQI_PUBLIC_KEY' );
    }
  }, [ culqiPublicKey ] );

  const processPayment = useCallback( async ( token: string ) => {
    try {
      setIsLoading( true );
      setError( null );

      const response = await fetch( '/api/payment/culqi/create-charge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( {
          token,
          amount,
          orderId,
          email,
          description: description || `Pago de orden #${ orderId }`,
        } ),
      } );

      const data = await response.json();

      if ( response.ok && data.success ) {
        setSuccess( true );
        setError( null );

        // Redirigir a página de éxito después de 2 segundos
        setTimeout( () => {
          window.location.href = `/orders/${ orderId }`;
        }, 2000 );
      } else {
        setError( data.error || 'Error al procesar el pago' );
      }
    } catch ( err ) {
      console.error( 'Error procesando pago:', err );
      setError( 'Error al procesar el pago. Por favor, intenta nuevamente.' );
    } finally {
      setIsLoading( false );
    }
  }, [ amount, orderId, email, description ] );

  useEffect( () => {
    // Cargar el script de Culqi Checkout
    const script = document.createElement( 'script' );
    script.src = 'https://checkout.culqi.com/js/v4';
    script.async = true;
    document.body.appendChild( script );

    script.onload = () => {
      // Verificar que tengamos la llave pública
      if ( !culqiPublicKey ) {
        console.error( 'NEXT_PUBLIC_CULQI_PUBLIC_KEY no está definida' );
        setError( 'Error de configuración: Llave pública no definida' );
        return;
      }

      if ( window.Culqi ) {
        window.Culqi.publicKey = culqiPublicKey;

        // Configurar opciones de Culqi
        window.Culqi.options( {
          lang: 'es',
          installments: false,
          paymentMethods: {
            tarjeta: true,
            yape: false,
            billetera: false,
            bancaMovil: false,
            agente: false,
            cuotealo: false,
          },
          style: {
            logo: '',
            maincolor: '#f97316', // Color naranja de tu marca
            buttontext: '#ffffff',
            maintext: '#4a5568',
            desctext: '#718096',
          },
        } );
      }

      // Definir la función global para manejar la respuesta de Culqi
      window.culqi = async function () {
        if ( window.Culqi.token ) {
          const token = window.Culqi.token.id;
          await processPayment( token );
        } else if ( window.Culqi.error ) {
          setError( window.Culqi.error.user_message );
          setIsLoading( false );
        }
      };
    };

    return () => {
      if ( document.body.contains( script ) ) {
        document.body.removeChild( script );
      }
    };
  }, [ processPayment, culqiPublicKey ] );

  const handlePayClick = () => {
    if ( !window.Culqi ) {
      setError( 'Error al cargar el sistema de pagos. Recarga la página.' );
      return;
    }

    setError( null );

    // Generar un ID de orden corto para Culqi (máximo 25 caracteres alfanuméricos)
    // Culqi requiere que sea alfanumérico y sin caracteres especiales
    const shortOrderId = orderId.replace( /-/g, '' ).substring( 0, 25 );

    // Configurar los datos del pago
    window.Culqi.settings( {
      title: 'MyShop',
      currency: 'PEN',
      description: description || `Orden #${ orderId }`,
      amount: Math.round( amount * 100 ), // Convertir a céntimos
      order: shortOrderId,
    } );

    // Abrir el modal de Culqi
    window.Culqi.open();
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={ handlePayClick }
        disabled={ isLoading || success }
        className="w-full bg-myshop-orange hover:bg-orange-600 text-white font-semibold h-12"
      >
        { isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Procesando...
          </span>
        ) : success ? (
          <span className="flex items-center gap-2">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M5 13l4 4L19 7" />
            </svg>
            ¡Pago Exitoso!
          </span>
        ) : (
          `Pagar S/ ${ amount.toFixed( 2 ) }`
        ) }
      </Button>

      {/* Mensaje de error */ }
      { error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 text-red-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-red-800">Error en el pago</p>
              <p className="text-sm text-red-600 mt-1">{ error }</p>
            </div>
          </div>
        </div>
      ) }

      {/* Mensaje de éxito */ }
      { success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-green-800">¡Pago procesado exitosamente!</p>
              <p className="text-sm text-green-600 mt-1">Redirigiendo...</p>
            </div>
          </div>
        </div>
      ) }

      {/* Logos de métodos de pago */ }
      <div className="flex items-center justify-center gap-3 pt-4 pb-2 opacity-70">
        <span className="text-xs text-gray-500">Aceptamos:</span>
        <div className="flex gap-2">
          <span className="text-xs font-medium text-gray-600">Visa</span>
          <span className="text-xs font-medium text-gray-600">Mastercard</span>
          <span className="text-xs font-medium text-gray-600">Yape</span>
        </div>
      </div>
    </div>
  );
};
