import { NextResponse } from 'next/server';

/**
 * API Route para crear token de Culqi
 * Este endpoint se llama desde el frontend con los datos de la tarjeta
 */
export async function POST( request: Request ) {
  try {
    const { card_number, cvv, expiration_month, expiration_year, email } = await request.json();

    // Validar campos requeridos
    if ( !card_number || !cvv || !expiration_month || !expiration_year || !email ) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' },
        { status: 400 }
      );
    }

    // Crear token usando la API de Culqi
    const response = await fetch( 'https://secure.culqi.com/v2/tokens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ process.env.NEXT_PUBLIC_CULQI_PUBLIC_KEY }`,
      },
      body: JSON.stringify( {
        card_number,
        cvv,
        expiration_month,
        expiration_year,
        email,
      } ),
    } );

    const data = await response.json();

    if ( !response.ok ) {
      return NextResponse.json(
        { error: data.user_message || 'Error al crear el token' },
        { status: response.status }
      );
    }

    return NextResponse.json( { token: data } );
  } catch ( error ) {
    console.error( 'Error en create-token:', error );
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
