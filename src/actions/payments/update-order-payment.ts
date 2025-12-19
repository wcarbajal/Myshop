'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

/**
 * Actualiza el estado de pago de una orden
 * @param orderId - ID de la orden
 * @param transactionId - ID de la transacción de pago
 * @returns Resultado de la operación
 */
export const updateOrderPayment = async ( orderId: string, transactionId: string ) => {

  try {

    const order = await prisma.order.update( {
      where: { id: orderId },
      data: {
        isPaid: true,
        paidAt: new Date(),
        transactionId: transactionId
      }
    } );

    if ( !order ) {
      return {
        ok: false,
        message: `No se encontró una orden con el id ${ orderId }`,
      };
    }

    // Revalidar la página de la orden para mostrar el nuevo estado
    revalidatePath( `/orders/${ orderId }` );

    return {
      ok: true,
      message: 'Pago confirmado exitosamente'
    };

  } catch ( error ) {

    console.log( error );

    return {
      ok: false,
      message: 'No se pudo actualizar el estado de pago'
    };

  }

};
