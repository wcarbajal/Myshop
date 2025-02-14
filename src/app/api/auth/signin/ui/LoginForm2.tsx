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
        <form onSubmit={ form.handleSubmit( onSubmit ) } className="space-y-8" method='post'>
          <FormField
            control={ form.control }
            name="email"
            render={ ( { field } ) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="test@example.com" { ...field } />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            ) }
          />
          <FormField
            control={ form.control }
            name="password"
            render={ ( { field } ) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" { ...field } type='password' />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>

              </FormItem>
            ) }
          />
          {
            error && (
              <FormItem>
                <FormMessage >{ error }</FormMessage>
              </FormItem>
            )
          }
          <div className="flex justify-center">
            <Button variant='outline' type="submit" disabled={ isPending }>Aceptar</Button>

          </div>
        </form>
      </Form>
      <div className="mt-10 W-32 border-zinc-100 border "></div>
      <div className="flex justify-center mt-10">
          <span>¿No tienes una cuenta?</span>
        </div>

      <Link href={ '/auth/new-account' } className="flex justify-center" >
        <Button variant='outline' type="button" className="mt-10">Nuevo usuario</Button>
      </Link>
    </>
  );
};