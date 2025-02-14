import { auth } from '@/auth';
import { Title } from "@/components";
import { AddressForm } from "./ui/AddressForm";

import { getCountries, getUserAddress } from "@/actions";
import { redirect } from 'next/navigation';

export default async function AddressPage() {

  const countries = await getCountries();

  const session = await auth();

  

  if ( !session?.user ) {
    redirect( '/api/auth/signin' );
  }

const userAddress = await getUserAddress(session.user.id) ?? undefined;




  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Dirección" subtitle="Dirección de entrega" />
        <span>Continuar</span>

         <AddressForm countries={ countries } userStoredAddress={ userAddress } /> 
      </div>
    </div>
  );
}
