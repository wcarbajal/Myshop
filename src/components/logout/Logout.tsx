'use client'
import { signOut } from 'next-auth/react';
import { Button } from '../ui/button';

export const Logout = () => {

  const handleLogout = async () => {
   await  signOut({
     callbackUrl: '/auth/login',
   });
    
  }

  return (
    <Button variant='outline' onClick={handleLogout}>Salir</Button>
  )
}