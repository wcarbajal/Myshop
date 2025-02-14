'use client';
import Head from 'next/head';
import { getTokenIzi } from '@/actions';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';

interface Props {
  orderId: string;
  amount: number;
  email: string;
}



export const ButtonPay = ( { orderId, amount, email }: Props ) => {
  const [ token, setToken ] = useState( null );

  const handleClick = async () => {
    const tokenRecibe = await getTokenIzi( orderId, amount, email );
    setToken( tokenRecibe.formToken );


  };

  useEffect( () => {
    const script = document.createElement( 'script' );
    script.type = "text/javascript";
    script.src = "https://static.micuentaweb.pe/static/js/krypton-client/V4.0/stable/kr-payment-form.min.js";
    script.async = true;
    script.setAttribute( 'kr-public-key', process.env.IZIPAY_PUBLICKEY_TEST || '' );
    document.body.appendChild( script );



    return () => {
      document.body.removeChild( script );
    };
  }, [] );

  return (
    <>
      

      {/* <Button variant='outline' onClick={ handleClick }>ButtonPay </Button> */ }
      <div className="kr-embedded" kr-popin kr-form-token={ token }> </div>
    </>
  );
};
