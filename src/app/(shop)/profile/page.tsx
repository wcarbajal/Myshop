import { auth } from "@/auth.config";
import { Title } from "@/components";
import Image from 'next/image';
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdOutlineAlternateEmail, MdCardTravel, MdOutlineGroup, MdOutlinePersonPin, MdOutlinePhoneIphone } from "react-icons/md";


export default async function ProfilePage() {
  const session = await auth();
 

  if ( !session?.user ) {
    // redirect('/auth/login?returnTo=/perfil');
    redirect( "/" );
  }

  return (
    <div className="flex flex-col items-center mb-10">
      {/*  <Title title="Perfil" /> */ }

      {/* <pre>{ JSON.stringify( session.user, null, 2 ) }</pre> */ }

      <div
        className="flex flex-col md:flex-row rounded-lg bg-slate-50 text-surface shadow-secondary-1 ">

        <div className="flex justify-center mt-10">
          <Avatar style={ { width: '150px', height: '170px' } }>
            <AvatarImage src={session?.user.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <div>
          <div className="flex items-center w-full gap-2 px-6 py-3">
            <MdOutlinePersonPin />
            <span className="text-base font-bold "> { session.user.name }</span>
          </div>

          <ul className="w-full">
          <li
              className="flex items-center w-full gap-2 px-6 py-3">
              <MdOutlineGroup color='green'/>
              { session.user.id }
            </li>
            <li
              className="flex items-center w-full gap-2 px-6 py-3">
              <MdCardTravel color='green'/>
              { session.user.role }
            </li>
            <li
              className=" flex items-center w-full gap-2 px-6 py-3">
              <MdOutlinePhoneIphone color='green'/>
              <span className=""> { session.user.telefono ?? '999999' } </span>
            </li>
            <li
              className="flex items-center w-full gap-2 px-6 py-3">
              <MdOutlineAlternateEmail color='green'/>
              { session.user.email }
            </li>
           
            
          </ul>

        </div>
      </div>

    </div>
  );
}
