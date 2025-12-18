"use client";

import { useForm } from "react-hook-form";
import { Brand,  ProductImage as ProductWithImage } from "@/interfaces";
import { createUpdateBrand, createUpdateProduct, deleteProductImage } from "@/actions";
import {  useRouter } from 'next/navigation';
import {  State } from '@prisma/client';
import Link from 'next/link';

interface Props {
  idBrand: string;
  nameBrand: string;
  stateBrand: State | undefined;
};

export const BrandForm = ( { idBrand, nameBrand, stateBrand }: Props ) => {

  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },

  } = useForm<Brand>( {
    defaultValues: {
      id: idBrand ?? "",
      name: nameBrand ?? "",
      state: stateBrand,
    },
  } );



  const onSubmit = async ( newBrand: Brand ) => {
    
    let identificador = newBrand.id === '' ? 'new' : newBrand.id;

    const brand = await createUpdateBrand( identificador, newBrand.name, newBrand.state! );
    console.log( "la marca que intento guardar: ", brand );

    if ( !brand.ok ) {
      alert( `Error: ${ brand.message }` );
      return;
    }
    if ( brand.ok ) {
      alert( 'Marca agregada con éxito' );
    }

    window.location.replace( `/admin/brands` );


  };

  return (
    <form
      onSubmit={ handleSubmit( onSubmit ) }
      className="flex flex-col px-5 mb-16 gap-3 "
    >
      {/* Textos */ }
      <div className="w-full">

        <div className="flex flex-col mb-2">
          <span>Nombre: </span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
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
          />
        </div>
        {
          errors.name && (
            <span className="text-red-500">{ errors.name.message }</span>
          )
        }

        <div className="flex flex-col mb-2">
          <span>Estado: </span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            { ...register( "state", { required: true } ) }
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>

      </div>

      <div className="flex justify-center gap-2">
        <Link href='/admin/brands' className="btn-secondary">Regresar</Link>
        <button className="btn-primary w-32">Guardar</button>
      </div>

    </form>


  );
};
