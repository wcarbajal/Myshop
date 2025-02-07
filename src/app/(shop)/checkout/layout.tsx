'use client'
import { auth } from '../../../auth';
import { useRouter } from 'next/navigation';
;
import { useEffect } from 'react';

export default function CheckoutLayout({children}: {
 children: React.ReactNode;
}) {

  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await auth();
        if (!session?.user) {
          router.replace('/auth/login');
        }
      } catch (error) {
        console.error('Error checking session:', error);
        //router.replace('/auth/login');
      }
    };

    checkSession();
  }, [router]);
  
  return (
    <>
    { children }
    </>
  );
}