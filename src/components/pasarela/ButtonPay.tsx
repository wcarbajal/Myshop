'use client';


import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { CreateOrderData, CreateOrderActions, OnApproveActions, OnApproveData } from '@paypal/paypal-js';
import { paypalCheckPayment, setTransactionId } from '@/actions';

const checkout = new Izipay({config: iziConfig});

const iziConfig = {
 config: {
   render: {
      typeForm: 'pop-up'
   },   
 }
};


interface Props {
  orderId: string;
  amount: number;
}



export const ButtonPay = ({ orderId, amount }: Props) => {

  const callbackResponsePayment = (response) => console.log(response);

try {
  checkout &&
    checkout.LoadForm({
      authorization: 'TU_TOKEN_SESSION',
      keyRSA: '69223723:testpublickey_vVmOc94UuRI8a7zBpuYKYJUnXM5haOjVijE2x3PuE1iNf',
      callbackResponse: callbackResponsePayment
    });
} catch (error) {
  console.log(error.message, error.Errors, error.date);
}



  return (
   render (
    <Izipay
      config={config}
    />
  )
  )
}
