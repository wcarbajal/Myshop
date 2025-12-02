
import { titleFont } from '@/config/fonts';
import { LoginForm2 } from './ui/LoginForm2';
import Link from 'next/link';

interface Props {
  searchParams: {
    verified: boolean;
  };
}

export default function LoginPage( { searchParams }: Props ) {

  const { verified } = searchParams;
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header con estilo propio */ }
      <div className="bg-myshop-gray py-4 shadow-md">
        <div className="container mx-auto px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className={ `${ titleFont.className } antialiased font-bold text-2xl text-myshop-orange` }>
              Mary
            </span>
            <span className="text-white text-xl font-semibold">| Shop</span>
          </Link>
        </div>
      </div>

      {/* Contenedor del formulario */ }
      <div className="flex justify-center items-center py-6 sm:py-12 px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <h1 className={ `${ titleFont.className } text-2xl sm:text-3xl mb-2 text-myshop-gray text-center` }>
            Iniciar Sesión
          </h1>
          <p className="text-center text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
            Ingresa a tu cuenta
          </p>

          {
            verified && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-center">
                ✅ Tu cuenta ha sido verificada, ahora puedes ingresar.
              </div>
            )
          }

          <LoginForm2 />
        </div>
      </div>
    </div>
  );
}