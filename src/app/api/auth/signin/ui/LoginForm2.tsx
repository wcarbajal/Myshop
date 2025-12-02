'use client';
import { useState, useTransition } from 'react';
import { useRouter } from "next/navigation";
import { z } from 'zod';
import { loginSchema } from "@/lib/auth-schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginAction } from '@/actions/auth/auth-actions';
import Link from 'next/link';



export const LoginForm2 = () => {

  const [ error, setError ] = useState<String | null>( null );
  const [ isPending, startTransition ] = useTransition();

  const router = useRouter();


  const form = useForm<z.infer<typeof loginSchema>>( {
    resolver: zodResolver( loginSchema ),
    defaultValues: {
      email: '',
      password: '',
    },
  } );
  async function onSubmit( values: z.infer<typeof loginSchema> ) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    setError( null );

    startTransition( async () => {

      const response = await loginAction( values );

      if ( response?.error ) {
        setError( response.error );

      } else {
        router.push( "/" );
      }

    } );


  }
  return (
    <>

      <Form { ...form }>
        <form onSubmit={ form.handleSubmit( onSubmit ) } className="space-y-6" method='post'>
          <FormField
            control={ form.control }
            name="email"
            render={ ( { field } ) => (
              <FormItem>
                <FormLabel className="text-myshop-gray font-semibold">Correo Electrónico</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ejemplo@correo.com"
                    { ...field }
                    className="border-gray-300 focus:border-myshop-orange focus:ring-myshop-orange"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            ) }
          />
          <FormField
            control={ form.control }
            name="password"
            render={ ( { field } ) => (
              <FormItem>
                <FormLabel className="text-myshop-gray font-semibold">Contraseña</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingresa tu contraseña"
                    { ...field }
                    type='password'
                    className="border-gray-300 focus:border-myshop-orange focus:ring-myshop-orange"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            ) }
          />
          {
            error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                { error }
              </div>
            )
          }
          <Button
            type="submit"
            disabled={ isPending }
            className="w-full bg-myshop-orange hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            { isPending ? 'Ingresando...' : 'Iniciar Sesión' }
          </Button>
        </form>
      </Form>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-center text-gray-600 mb-4">
          ¿No tienes una cuenta?
        </p>
        <Link href={ '/auth/new-account' } className="block" >
          <Button
            variant='outline'
            type="button"
            className="w-full border-myshop-orange text-myshop-orange hover:bg-myshop-orange hover:text-white transition-colors"
          >
            Crear Cuenta Nueva
          </Button>
        </Link>
      </div>
    </>
  );
};