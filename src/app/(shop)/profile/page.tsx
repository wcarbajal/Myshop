import { auth } from "@/auth";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChangePasswordForm } from "@/components/profile/ChangePasswordForm";
import { MdOutlineAlternateEmail, MdCardTravel, MdOutlineGroup, MdOutlinePhoneIphone } from "react-icons/md";


export default async function ProfilePage() {
  const session = await auth();


  if ( !session?.user ) {
    // redirect('/api/auth/signin?returnTo=/perfil');
    redirect( "/" );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Title title="Mi Perfil" className="mb-8" />

        {/* Card principal con sombra y diseño moderno */ }
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header del card con gradiente Sodimac */ }
          <div className="bg-gradient-to-r from-myshop-orange to-orange-500 h-32 sm:h-40"></div>

          {/* Contenido del perfil */ }
          <div className="relative px-6 sm:px-8 pb-8">
            {/* Avatar superpuesto */ }
            <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
              <div className="-mt-16 sm:-mt-20 mb-4 sm:mb-0">
                <div className="relative">
                  <Avatar className="w-32 h-32 sm:w-40 sm:h-40 border-4 border-white shadow-lg">
                    <AvatarImage src={ session.user.image ?? '' } />
                    <AvatarFallback className="bg-myshop-gray text-white text-4xl font-bold">
                      { session.user.name?.charAt( 0 ).toUpperCase() || 'U' }
                    </AvatarFallback>
                  </Avatar>
                  {/* Badge de role */ }
                  <div className={ `absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-xs font-semibold text-white shadow-md ${ session.user.role === 'admin' ? 'bg-myshop-orange' : 'bg-green-500' }` }>
                    { session.user.role === 'admin' ? 'ADMIN' : 'USER' }
                  </div>
                </div>
              </div>

              {/* Nombre y título */ }
              <div className="flex-1 pb-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-myshop-gray">
                  { session.user.name }
                </h2>
                <p className="text-gray-500 mt-1">Miembro de MyShop</p>
              </div>
            </div>

            {/* Información del usuario */ }
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */ }
              <div className="bg-gray-50 rounded-xl p-4 hover:bg-orange-50 transition-colors duration-300 border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-myshop-orange rounded-lg flex items-center justify-center">
                      <MdOutlineAlternateEmail className="text-white text-xl" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</p>
                    <p className="text-sm font-semibold text-gray-900 truncate mt-1">
                      { session.user.email }
                    </p>
                  </div>
                </div>
              </div>

              {/* Teléfono */ }
              <div className="bg-gray-50 rounded-xl p-4 hover:bg-orange-50 transition-colors duration-300 border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-myshop-orange rounded-lg flex items-center justify-center">
                      <MdOutlinePhoneIphone className="text-white text-xl" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Teléfono</p>
                    <p className="text-sm font-semibold text-gray-900 truncate mt-1">
                      { session.user.telefono || 'No registrado' }
                    </p>
                  </div>
                </div>
              </div>

              {/* Role */ }
              <div className="bg-gray-50 rounded-xl p-4 hover:bg-orange-50 transition-colors duration-300 border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-myshop-orange rounded-lg flex items-center justify-center">
                      <MdCardTravel className="text-white text-xl" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Rol</p>
                    <p className="text-sm font-semibold text-gray-900 capitalize mt-1">
                      { session.user.role }
                    </p>
                  </div>
                </div>
              </div>

              {/* ID de Usuario */ }
              <div className="bg-gray-50 rounded-xl p-4 hover:bg-orange-50 transition-colors duration-300 border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-myshop-orange rounded-lg flex items-center justify-center">
                      <MdOutlineGroup className="text-white text-xl" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">ID de Usuario</p>
                    <p className="text-sm font-semibold text-gray-900 truncate mt-1 font-mono">
                      { session.user.id?.split( '-' ).at( -1 ) || 'N/A' }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón de editar perfil (opcional) */ }
            <div className="mt-8 flex justify-center sm:justify-end">
              <button className="px-6 py-3 bg-myshop-orange hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                Editar Perfil
              </button>
            </div>
          </div>

          {/* Sección de cambiar contraseña */ }
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
