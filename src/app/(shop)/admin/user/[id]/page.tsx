

import { Title } from '@/components';
import { redirect } from 'next/navigation';
import { UserForm } from './ui/UserForm';
import { getUserById } from '@/actions';
import { Span } from 'next/dist/trace';


interface Props {
  params: {
    id: string;
  };
}



export default async function UserPage( { params }: Props ) {


  const { id } = params;

  const [ user ] = await Promise.all( [

    getUserById( id )
    
    ])

  if ( !user && id !== 'new' ) {
    redirect( '/admin/users' );

  }



  const title = ( id === 'new' ) ? 'Nuevo usuario' : 'Editar usuario';

  return (
    <>
      <Title title={ title } />

      <UserForm user={ user ?? {}} />

      

      


    </>
  );
}