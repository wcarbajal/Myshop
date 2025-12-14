"use client";

import { useForm } from "react-hook-form";
import { createUpdateBrand } from "@/actions";
import { State } from '@prisma/client';
import { useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  onClose: () => void;
  onBrandCreated: () => void;
}

interface FormInputs {
  name: string;
  state: State;
}

export const BrandModalForm = ( { onClose, onBrandCreated }: Props ) => {

  const [ isSubmitting, setIsSubmitting ] = useState( false );
  const [ errorMessage, setErrorMessage ] = useState<string | null>( null );
  const [ successMessage, setSuccessMessage ] = useState<string | null>( null );

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormInputs>( {
    defaultValues: {
      name: "",
      state: 'activo',
    },
  } );

  const onSubmit = async ( data: FormInputs ) => {
    setIsSubmitting( true );
    setErrorMessage( null );
    setSuccessMessage( null );

    try {
      const { ok, message } = await createUpdateBrand( 'new', data.name, data.state );

      if ( ok ) {
        setSuccessMessage( message || '✅ Marca creada exitosamente' );
        // Esperar 2 segundos antes de cerrar y recargar
        await new Promise( resolve => setTimeout( resolve, 2000 ) );
        onBrandCreated(); // Esto cierra el modal y recarga
      } else {
        setErrorMessage( message || 'Error al crear la marca' );
        setIsSubmitting( false );
      }
    } catch ( error ) {
      console.error( 'Error al crear la marca:', error );
      setErrorMessage( 'Error inesperado al crear la marca. Intenta nuevamente.' );
      setIsSubmitting( false );
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={ ( e ) => {
        e.stopPropagation();
        e.preventDefault();
      } }
    >
      <div
        className="bg-white rounded-lg shadow-2xl max-w-md w-full"
        onClick={ ( e ) => {
          e.stopPropagation();
          e.preventDefault();
        } }
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-myshop-gray">
          <h3 className="text-lg font-semibold text-white">🏷️ Nueva Marca</h3>
          <button
            type="button"
            onClick={ onClose }
            className="text-white hover:text-red-300 text-2xl font-bold"
            disabled={ isSubmitting }
          >
            ×
          </button>
        </div>

        <form
          onSubmit={ ( e ) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit( onSubmit )( e );
          } }
          className="p-6"
        >
          {/* Mensajes de error y éxito */ }
          { errorMessage && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              ❌ { errorMessage }
            </div>
          ) }
          { successMessage && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              ✅ { successMessage }
            </div>
          ) }

          <div className="flex flex-col mb-4">
            <label className="mb-2 font-semibold">Nombre:</label>
            <input
              type="text"
              className="p-2 border rounded-md bg-gray-200"
              placeholder="Ej: Coca Cola"
              { ...register( "name", {
                required: {
                  value: true,
                  message: "El nombre es obligatorio",
                },
                minLength: {
                  value: 3,
                  message: "El nombre debe tener al menos 3 caracteres",
                },
                maxLength: {
                  value: 30,
                  message: "El nombre no debe tener más de 30 caracteres",
                },
              } ) }
              disabled={ isSubmitting }
            />
            {
              errors.name && (
                <span className="text-sm text-red-500 mt-1">{ errors.name.message }</span>
              )
            }
          </div>

          <div className="flex flex-col mb-6">
            <label className="mb-2 font-semibold">Estado:</label>
            <select
              className="p-2 border rounded-md bg-gray-200"
              { ...register( "state", { required: true } ) }
              disabled={ isSubmitting }
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={ onClose }
              className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all"
              disabled={ isSubmitting }
            >
              Regresar
            </button>
            <button
              type="submit"
              onClick={ ( e ) => e.stopPropagation() }
              className="px-6 py-2 bg-myshop-orange hover:bg-orange-600 text-white rounded-lg font-semibold transition-all disabled:opacity-50"
              disabled={ isSubmitting }
            >
              { isSubmitting ? 'Guardando...' : 'Guardar' }
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return typeof window !== 'undefined'
    ? createPortal( modalContent, document.body )
    : null;
};
