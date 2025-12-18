'use client';

import { useEffect, useState } from 'react';

export function CulqiDiagnostic() {
  const [ diagnosticInfo, setDiagnosticInfo ] = useState( {
    publicKey: '',
    hasPublicKey: false,
    keyPreview: '',
    allEnvKeys: [] as string[],
  } );

  useEffect( () => {
    const publicKey = process.env.NEXT_PUBLIC_CULQI_PUBLIC_KEY || '';

    setDiagnosticInfo( {
      publicKey: publicKey,
      hasPublicKey: !!publicKey,
      keyPreview: publicKey ? `${ publicKey.substring( 0, 15 ) }...` : 'No configurada',
      allEnvKeys: Object.keys( process.env ).filter( key => key.startsWith( 'NEXT_PUBLIC_' ) ),
    } );

    // Log detallado en consola
    console.group( '🔍 Diagnóstico de Culqi' );
    console.log( 'Public Key configurada:', !!publicKey );
    console.log( 'Key preview:', publicKey ? `${ publicKey.substring( 0, 15 ) }...` : 'No configurada' );
    console.log( 'Todas las variables NEXT_PUBLIC_:', Object.keys( process.env ).filter( k => k.startsWith( 'NEXT_PUBLIC_' ) ) );
    console.groupEnd();
  }, [] );

  return (
    <div className="fixed bottom-4 right-4 bg-white border-2 border-gray-300 rounded-lg shadow-lg p-4 max-w-sm z-50">
      <h3 className="text-sm font-bold mb-2 flex items-center gap-2">
        🔍 Diagnóstico Culqi
        <span className={ `text-xs px-2 py-1 rounded ${ diagnosticInfo.hasPublicKey ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700' }` }>
          { diagnosticInfo.hasPublicKey ? '✅ OK' : '❌ Error' }
        </span>
      </h3>

      <div className="space-y-2 text-xs">
        <div className="border-b pb-2">
          <p className="text-gray-600">Public Key:</p>
          <p className="font-mono text-xs break-all">
            { diagnosticInfo.keyPreview }
          </p>
        </div>

        <div className="border-b pb-2">
          <p className="text-gray-600">Variables NEXT_PUBLIC_ disponibles:</p>
          <ul className="list-disc list-inside">
            { diagnosticInfo.allEnvKeys.map( key => (
              <li key={ key } className="text-gray-800">{ key }</li>
            ) ) }
          </ul>
        </div>

        <div className="pt-2">
          { !diagnosticInfo.hasPublicKey && (
            <div className="bg-red-50 border border-red-200 rounded p-2">
              <p className="text-red-700 font-semibold">⚠️ Acción Requerida:</p>
              <ol className="list-decimal list-inside text-red-600 mt-1">
                <li>Verifica .env.local</li>
                <li>Reinicia el servidor</li>
                <li>En Vercel: redeploy</li>
              </ol>
            </div>
          ) }
        </div>
      </div>
    </div>
  );
}
