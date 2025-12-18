'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MdLock } from "react-icons/md";

export const ChangePasswordForm = () => {
  const [ newPassword, setNewPassword ] = useState( '' );
  const [ confirmPassword, setConfirmPassword ] = useState( '' );
  const [ error, setError ] = useState( '' );
  const [ success, setSuccess ] = useState( '' );

  const handleSubmit = ( e: React.FormEvent ) => {
    e.preventDefault();
    setError( '' );
    setSuccess( '' );

    // Validación de campos vacíos
    if ( !newPassword || !confirmPassword ) {
      setError( 'Todos los campos son obligatorios' );
      return;
    }

    // Validación de longitud mínima
    if ( newPassword.length < 6 ) {
      setError( 'La contraseña debe tener al menos 6 caracteres' );
      return;
    }

    // Validación de que las contraseñas coincidan
    if ( newPassword !== confirmPassword ) {
      setError( 'Las contraseñas no coinciden' );
      return;
    }

    // Si todo es válido
    setSuccess( 'Las contraseñas coinciden. Procesando cambio...' );
    // Aquí iría la lógica para cambiar la contraseña
  };

  return (
    <div className="px-6 sm:px-8 pb-8 border-t border-gray-200">
      <div className="pt-8">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-10 h-10 bg-myshop-orange rounded-lg flex items-center justify-center">
            <MdLock className="text-white text-xl" />
          </div>
          <h3 className="text-xl font-bold text-myshop-gray">Cambiar Contraseña</h3>
        </div>

        <form onSubmit={ handleSubmit }>
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-end">
            {/* Input Nueva Contraseña */ }
            <div className="flex-1">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Nueva Contraseña
              </label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Ingresa tu nueva contraseña"
                className="w-full"
                value={ newPassword }
                onChange={ ( e ) => setNewPassword( e.target.value ) }
              />
            </div>

            {/* Input Confirmar Contraseña */ }
            <div className="flex-1">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar Contraseña
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirma tu nueva contraseña"
                className="w-full"
                value={ confirmPassword }
                onChange={ ( e ) => setConfirmPassword( e.target.value ) }
              />
            </div>

            {/* Botón Cambiar Contraseña */ }
            <div className="flex-1 md:flex-initial md:min-w-[200px]">
              <Button
                type="submit"
                className="w-full bg-myshop-orange hover:bg-orange-600 text-white font-semibold h-10"
              >
                Cambiar Contraseña
              </Button>
            </div>
          </div>

          {/* Mensajes de error y éxito */ }
          { error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 font-medium">{ error }</p>
            </div>
          ) }

          { success && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-600 font-medium">{ success }</p>
            </div>
          ) }
        </form>
      </div>
    </div>
  );
};
