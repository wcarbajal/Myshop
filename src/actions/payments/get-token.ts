'use server';

import prisma from '@/lib/prisma';


export const getTokenIzi = async ( orderId: string, amount: number, email: string ) => {

  try {
    
    const login = "69223723";
    const privateKey = "testpassword_LUFhbJsH6aXjMSeufqGCEPpNZ23dMnFv94o6fSfqLODK0";
    const credentials = `${login}:${privateKey}`;
    const encodedCredentials = btoa(credentials);

    console.log({ credentials });
    console.log(`Authorization: Basic ${encodedCredentials}`);

    // Hacer la solicitud a la API de Iziipay
    const response: any = await fetch( 'https://api.micuentaweb.pe/api-payment/V4/Charge/CreatePayment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${encodedCredentials}`,
      },
      body: JSON.stringify({
        "amount": amount,
        "currency": "PEN",
        "description": `Compra de producto - ${ orderId }`,
        "customer": {
          "email": email,
          "name": email,
        },
        
      })
      
    } );
    const data = await response.json();
    console.log( { formToken: data.answer?.formToken } );

    if ( !data.success ) {
      return {
        ok: false,
        message: `No se encontró una orden con el ${ orderId }`,
      };
    }

    return { formToken: data.answer?.formToken  };


  } catch ( error ) {

    console.log( error );

    return {
      ok: false,
      message: 'No se pudo obtener token de IZIPAY'
    };

  }


};