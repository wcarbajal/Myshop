'use client';

import { DeleteUser } from '@/actions';
import { TiDelete } from "react-icons/ti";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from 'react';


interface Props {
  userdId: string;
  nombre: string;
}

export const UserDeleteButton = ( { userdId, nombre }: Props ) => {

  const [ isOpen, setIsOpen ] = useState( false );


  const handleDeleteUser = async () => {

    const registro = await DeleteUser( userdId );    
    window.location.reload(); // Reload the page to reflect the changes in the database.
  };


  return (
    <>
      <button className="hover:text-blue-500" onClick={ () => setIsOpen(true) }>
        <TiDelete size={ 30 } color='brown' />
      </button>
      <AlertDialog
       open={isOpen}
       onOpenChange={setIsOpen}
       >
        
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro de eliminar al usuario {nombre}?</AlertDialogTitle>
            <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente al usuario.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};