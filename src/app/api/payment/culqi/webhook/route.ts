import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

/**
 * Webhook de Culqi para recibir notificaciones de pagos
 * Configurar esta URL en el panel de Culqi:
 * https://tu-dominio.com/api/payment/culqi/webhook
 */
export async function POST( request: Request ) {
  try {
    const body = await request.json();

    // Obtener headers para validación (opcional pero recomendado)
    const headersList = headers();
    const signature = headersList.get( 'x-culqi-signature' );

    console.log( 'Webhook recibido:', body );

    // Validar el evento
    if ( !body.type || !body.data ) {
      return NextResponse.json(
        { error: 'Evento inválido' },
        { status: 400 }
      );
    }

    // Procesar según el tipo de evento
    switch ( body.type ) {
      case 'charge.succeeded':
        // Pago exitoso
        await handleChargeSucceeded( body.data );
        break;

      case 'charge.failed':
        // Pago fallido
        await handleChargeFailed( body.data );
        break;

      case 'refund.created':
        // Devolución creada
        await handleRefundCreated( body.data );
        break;

      default:
        console.log( 'Evento no manejado:', body.type );
    }

    // Responder con 200 para confirmar recepción
    return NextResponse.json( { received: true } );

  } catch ( error ) {
    console.error( 'Error en webhook:', error );
    return NextResponse.json(
      { error: 'Error procesando webhook' },
      { status: 500 }
    );
  }
}

async function handleChargeSucceeded( data: any ) {
  try {
    console.log( 'Pago exitoso:', data.id );

    const orderId = data.metadata?.order_id;

    if ( !orderId ) {
      console.error( 'No se encontró order_id en metadata' );
      return;
    }

    // TODO: Actualizar la orden en la base de datos
    // const { PrismaClient } = await import('@prisma/client');
    // const prisma = new PrismaClient();

    // await prisma.order.update({
    //   where: { id: orderId },
    //   data: {
    //     isPaid: true,
    //     paidAt: new Date(),
    //     transactionId: data.id,
    //   },
    // });

    // await prisma.$disconnect();

    console.log( `Orden ${ orderId } marcada como pagada` );

    // TODO: Enviar email de confirmación al cliente

  } catch ( error ) {
    console.error( 'Error en handleChargeSucceeded:', error );
  }
}

async function handleChargeFailed( data: any ) {
  try {
    console.log( 'Pago fallido:', data.id );

    // TODO: Registrar el intento fallido
    // TODO: Notificar al cliente si es necesario

  } catch ( error ) {
    console.error( 'Error en handleChargeFailed:', error );
  }
}

async function handleRefundCreated( data: any ) {
  try {
    console.log( 'Devolución creada:', data.id );

    // TODO: Actualizar el estado de la orden
    // TODO: Notificar al cliente

  } catch ( error ) {
    console.error( 'Error en handleRefundCreated:', error );
  }
}
