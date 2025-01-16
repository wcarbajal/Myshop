
import { titleFont } from '@/config/fonts';
import { LoginForm } from './ui/LoginForm';
import { LoginForm2 } from './ui/LoginForm2';

interface Props {
  searchParams: {
    verified: boolean
  }
}

export default function LoginPage({ searchParams }:Props) {

  const { verified } = searchParams;
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <h1 className={ `${ titleFont.className } text-4xl mb-5` }>Ingresar</h1>
      {
        verified && (
          <div className="text-center text-green-500 font-bold mb-5">
            Tu cuenta ha sido verificada, ahora puedes ingresar.
          </div>
        )
      }

      <LoginForm2 />
    </div>
  );
}