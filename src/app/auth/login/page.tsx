
import { titleFont } from '@/config/fonts';
import { LoginForm } from './ui/LoginForm';
import { LoginForm2 } from './ui/LoginForm2';

interface Props {}

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <h1 className={ `${ titleFont.className } text-4xl mb-5` }>Ingresar</h1>

      <LoginForm2 />
    </div>
  );
}