import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { IoArrowBack, IoMenu } from 'react-icons/io5';
import { Sidebar } from '@/components';
import { BackButton } from './ui/BackButton';

export default async function VentasLayout( { children }: {
  children: React.ReactNode;
} ) {

  const session = await auth();

  if ( session?.user.role !== 'admin' ) {
    redirect( '/api/auth/signin' );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header simplificado para ventas */ }
      <header className="bg-myshop-gray shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo y título */ }
            <div className="flex items-center space-x-4">
              <BackButton />
              <div className="h-8 w-px bg-gray-600"></div>
              <h1 className="text-white text-xl sm:text-2xl font-bold">
                <span className="text-myshop-orange">Mary</span> | Ventas
              </h1>
            </div>

            {/* Usuario info */ }
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block text-right">
                <p className="text-white text-sm font-semibold">{ session.user.name }</p>
                <p className="text-gray-300 text-xs">{ session.user.role }</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Sidebar />

      <div className="px-4 sm:px-6 lg:px-8 py-6">
        { children }
      </div>
    </main>
  );
}