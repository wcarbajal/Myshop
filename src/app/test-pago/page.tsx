import { CulqiCheckout } from '@/components/pasarela/CulqiCheckout';
import { CulqiDiagnostic } from '@/components/pasarela/CulqiDiagnostic';

export default function TestPagoPage() {
  // Obtener la llave pública del lado del servidor
  const publicKey = process.env.NEXT_PUBLIC_CULQI_PUBLIC_KEY;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */ }
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🧪 Prueba de Pago con Culqi
          </h1>
          <p className="text-gray-600">
            Página de prueba para testear la integración de pagos
          </p>
        </div>

        {/* Tarjetas de Prueba */ }
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">
            💳 Tarjetas de Prueba
          </h2>
          <div className="space-y-3 text-sm">
            <div className="bg-white p-3 rounded border border-blue-100">
              <p className="font-medium text-green-700 mb-1">✅ Pago Exitoso:</p>
              <p className="font-mono text-xs">4111 1111 1111 1111</p>
              <p className="text-gray-600">CVV: 123 | Fecha: 12/2025</p>
            </div>
            <div className="bg-white p-3 rounded border border-blue-100">
              <p className="font-medium text-red-700 mb-1">❌ Pago Rechazado:</p>
              <p className="font-mono text-xs">4000 0000 0000 0002</p>
              <p className="text-gray-600">CVV: 123 | Fecha: 12/2025</p>
            </div>
            <div className="bg-white p-3 rounded border border-blue-100">
              <p className="font-medium text-orange-700 mb-1">⏱️ Tarjeta Expirada:</p>
              <p className="font-mono text-xs">4000 0000 0000 0069</p>
              <p className="text-gray-600">CVV: 123 | Fecha: 12/2025</p>
            </div>
          </div>
        </div>

        {/* Detalles de la Orden Ficticia */ }
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Orden de Prueba
          </h2>
          <div className="space-y-2 text-gray-700 mb-6">
            <div className="flex justify-between py-2 border-b">
              <span>Orden ID:</span>
              <span className="font-mono text-sm">TEST-001</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Email:</span>
              <span className="text-sm">test@ejemplo.com</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Productos:</span>
              <span>3 items</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Subtotal:</span>
              <span>S/ 45.50</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>IGV (18%):</span>
              <span>S/ 8.19</span>
            </div>
            <div className="flex justify-between py-3 font-bold text-lg bg-gray-50 px-3 rounded">
              <span>Total:</span>
              <span className="text-myshop-orange">S/ 53.69</span>
            </div>
          </div>

          {/* Componente de Pago */ }
          <CulqiCheckout
            orderId="TEST-001"
            amount={ 53.69 }
            email="test@ejemplo.com"
            description="Orden de prueba - MyShop"
            publicKey={ publicKey }
          />
        </div>

        {/* Instrucciones */ }
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-md font-semibold text-yellow-900 mb-2">
            📝 Instrucciones:
          </h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-yellow-800">
            <li>Haz clic en el botón &quot;Pagar&quot;</li>
            <li>Se abrirá el modal de Culqi</li>
            <li>Usa una de las tarjetas de prueba de arriba</li>
            <li>Completa el formulario</li>
            <li>Observa el resultado (éxito o error)</li>
          </ol>
          <p className="mt-3 text-xs text-yellow-700">
            ⚠️ Esta es una prueba en modo sandbox. No se procesará dinero real.
          </p>
        </div>
      </div>

      {/* Componente de Diagnóstico */ }
      <CulqiDiagnostic />
    </div>
  );
}
