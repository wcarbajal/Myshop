import { NextResponse } from 'next/server';
import Culqi from 'culqi-node';
import prisma from '@/lib/prisma';

/**
 * API Route para crear un cargo en Culqi
 * Este endpoint se llama desde el frontend después de obtener el token
 */
export async function POST( request: Request ) {
  try {
    const { token, amount, orderId, email, description } = await request.json();

    // Validar campos requeridos
    if ( !token || !amount || !email ) {
      return NextResponse.json(
        { error: 'Token, monto y email son obligatorios' },
        { status: 400 }
      );
    }

    // Inicializar cliente Culqi
    const culqi = new Culqi( {
      privateKey: process.env.CULQI_SECRET_KEY!,
    } );

    // Crear cargo
    const charge = await culqi.charges.createCharge( {
      amount: Math.round( amount * 100 ).toString(), // Convertir a céntimos y luego a string
      currency_code: 'PEN',
      email: email,
      source_id: token,
      description: description || `Orden #${ orderId }`,
      metadata: {
        order_id: orderId,
      },
    } );

    // Si el cargo fue exitoso
    if ( charge.object === 'charge' && charge.outcome.type === 'venta_exitosa' ) {
      // Actualizar la orden en la base de datos como pagada
      await prisma.order.update( {
        where: { id: orderId },
        data: {
          isPaid: true,
          paidAt: new Date(),
          transactionId: charge.id,
        },
      } );

      return NextResponse.json( {
        success: true,
        charge: {
          id: charge.id,
          amount: charge.amount,
          currency: charge.currency,
          email: charge.email,
          status: charge.outcome.type,
        },
      } );
    }

    // Si el cargo fue rechazado
    return NextResponse.json(
      {
        error: charge.outcome.user_message || 'El pago fue rechazado',
        code: charge.outcome.merchant_message,
      },
      { status: 400 }
    );

  } catch ( error: any ) {
    console.error( 'Error en create-charge:', error );

    return NextResponse.json(
      {
        error: error.user_message || error.message || 'Error al procesar el pago',
        details: error.merchant_message || 'Error interno',
      },
      { status: 500 }
    );
  }
}
