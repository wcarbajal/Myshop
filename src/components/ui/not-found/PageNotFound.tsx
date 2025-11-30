import Image from 'next/image';
import Link from 'next/link';
import { titleFont } from '@/config/fonts';

export const PageNotFound = () => {
  return (
    <div className="flex flex-col h-[800px] gap-5 w-full justify-center items-center align-middle">

      <div className="text-center px-5 mx-5">        
        <p className="font-semibold text-4xl">Pagina no encontrada.</p>
        
      </div>
      <div className="px-5 mx-5">
        <Image
          src="/imgs/page-not-found2.svg"
          alt="Page Not Found"
          className="p-5 sm:p-0"
          width={ 350 }
          height={ 350 }
        />

      </div>
      <div className="text-center px-5 mx-5">                
        <p className="font-light text-2xl">
          <span>Regresar al </span>
          <Link
            href='/'
            className=" hover:underline transition-all text-blue-500 font-bold"
          >
            inicio
          </Link>
        </p>
      </div>



    </div>
  );
};