/**
 * Configuración de Culqi
 * Maneja las llaves públicas y secretas de forma centralizada
 */

export const culqiConfig = {
  publicKey: process.env.NEXT_PUBLIC_CULQI_PUBLIC_KEY || '',
  secretKey: process.env.CULQI_SECRET_KEY || '',

  // Validar que las llaves estén configuradas
  isConfigured: () => {
    return Boolean( culqiConfig.publicKey && culqiConfig.secretKey );
  },

  // Validar solo la llave pública (para uso en cliente)
  hasPublicKey: () => {
    return Boolean( culqiConfig.publicKey );
  }
};

// Log de advertencia si no están configuradas (solo en desarrollo)
if ( process.env.NODE_ENV === 'development' && !culqiConfig.isConfigured() ) {
  console.warn(
    '⚠️ Culqi no está completamente configurado. ' +
    'Asegúrate de tener NEXT_PUBLIC_CULQI_PUBLIC_KEY y CULQI_SECRET_KEY en tu .env'
  );
}
