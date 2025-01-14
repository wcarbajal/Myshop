"use client";

import { useForm } from "react-hook-form";
import { User } from "@/interfaces";
import { createUpdateUser, } from "@/actions";
import { useRouter } from 'next/navigation';
import { State } from '@prisma/client';
import Link from 'next/link';
import { ViewImage } from '@/components';


interface Props {
  user: Partial<User>;
};


interface FormInputs {
  name: string;
  email: string;
  telefono: string;
  password: string;
  repassword: string;
  role: string;
  image: FileList;
  state: State;
  createdAt: Date;
  updatedAt: Date;
}

export const UserForm = ( { user }: Props ) => {

  const router = useRouter();

  const isNew = user!.id ? false : true;

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },

  } = useForm<FormInputs>( {
    defaultValues: {
      name: user!.name ?? '',
      email: user!.email ?? '',
      telefono: user!.telefono ?? '',
      password: '',
      role: user!.role,
      image: undefined,
      state: user!.state ?? undefined,
      createdAt: user!.createdAt ?? undefined,
      updatedAt: user!.updatedAt ?? undefined

    },
  } );

  const onSubmit = async ( data: FormInputs ) => {

    const formData = new FormData();
    console.log( 'Formdata', { formData } );

    const { image, ...userToSave } = data;


    if ( user!.id ) {
      formData.append( "id", user!.id ?? "" );
    }

    formData.append( "name", userToSave.name );
    formData.append( "role", userToSave.role );
    formData.append( "email", userToSave.email );
    formData.append( "telefono", userToSave.telefono );
    formData.append( "password", userToSave.password );
    formData.append( "state", userToSave.state );

    formData.append( "image", image[ 0 ] );

    const mensaje = await createUpdateUser( formData );
    console.log(  mensaje.message  );

    
    //window.location.replace( `/admin/user/${user.id}` ); 


  };

  return (
    <form
      onSubmit={ handleSubmit( onSubmit ) }
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
      autoComplete="off"
    >

      <div className="flex items-end flex-col">

        <ViewImage
          alt={ user.name ?? "" }
          src={ user.image ?? process.env.NOT_IMAGE_URL }
          width={ 400 }
          height={ 400 }          
          className="rounded shadow-md object-cover w-full max-w-[600px]"
        />


      </div>

      <div className="w-full">

        {/* Nombre */ }
        <div className="flex flex-col mb-2">
          <span>Nombre: </span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-100"
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

        {/* Rol */ }
        <div className="flex flex-col mb-2">
          <span>Rol: </span>
          <select
            className="p-2 border rounded-md bg-gray-100"
            { ...register( "role", { required: true } ) }
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        {/* Email */ }
        <div className="flex flex-col mb-2">
          <span>E-mail: </span>
          <input
            type="email"
            className="p-2 border rounded-md bg-gray-100"
            { ...register( "email", {
              required: {
                value: true,
                message: "El email es obligatorio",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Ingrese un email válido",
              },

            } ) }
          />
        </div>
        {
          errors.email && (
            <span className="text-red-500">{ errors.email.message }</span>
          )
        }
        {/* Telefono */ }
        <div className="flex flex-col mb-2">
          <span>Telefono celular: </span>
          <input
            type="tel"
            className="p-2 border rounded-md bg-gray-100"
            { ...register( "telefono", {
              required: {
                value: true,
                message: "El nombre es obligatorio",
              },
              pattern: {
                value: /^(0051|\+51)?(9\d\d)-? ?(\d\d)-? ?(\d)-? ?(\d)-? ?(\d\d)$/,
                message: "Ingrese un numero celular válido (9 dígitos).",
              },
            } ) }
          />
        </div>
        {
          errors.telefono && (
            <span className="text-red-500">{ errors.telefono.message }</span>
          )
        }


        {/* Estado */ }
        <div className="flex flex-col mb-2">
          <span>Estado: </span>
          <select
            className="p-2 border rounded-md bg-gray-100"
            { ...register( "state", { required: true } ) }
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>

        {/* Password */ }
        <div className="flex flex-col mb-2">
          <span>Actualizar password: </span>
          <input
            type="password"
            className="p-2 border rounded-md bg-gray-100"
            { ...register( "password", {
              validate: ( value ) => {
                if ( !isNew || value ) {
                  return true;
                } else {
                  return 'Debe registrar password';
                }
              },
            } ) }
          />
        </div>
        {
          errors.password && (
            <span className="text-red-500">{ errors.password.message }</span>
          )
        }
        <div className="flex flex-col mb-2">
          <span>Re-ingresar actulización de password: </span>
          <input
            type="password"
            className="p-2 border rounded-md bg-gray-100"
            { ...register( "repassword", {
              required: {
                value: false,
                message: "Debe confirmar password",
              },
              validate: ( value ) => value === watch( 'password' ) || 'Las contraseñas no coinciden',
            } ) }
          />
        </div>
        {
          errors.repassword && (
            <span className="text-red-500">{ errors.repassword.message }</span>
          )
        }
        <div>
          <input
            type="file"
            className="flex items-center h-10 w-full text-lg border rounded-md bg-gray-100"

            accept="image/png, image/jpeg, image/avif"

            { ...register( "image" ) }
          />
        </div>


      </div>

      <div className="sm:flex sm:justify-center w-full sm:mt-10 sm:col-span-2 ">

        <Link href='/admin/users' className="btn-secondary">Regresar</Link>
        <button className="btn-primary w-32">Guardar</button>
      </div>

    </form>


  );
};
