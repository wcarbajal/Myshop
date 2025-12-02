import { getCategories } from '@/actions';
import { Footer, Sidebar, TopMenu } from '@/components';
import { auth } from '@/auth';

export default async function ShopLayout( { children }: {
  children: React.ReactNode;
} ) {

  const categorias = await getCategories();
  const session = await auth();
  const isAdmin = session?.user?.role === 'admin';

  return (
    <main className="min-h-screen">

      <TopMenu categorias={ categorias } isAdmin={ isAdmin } />
      <Sidebar />

      <div className="px-0 sm:px-10">
        { children }

      </div>

      <Footer />
    </main>
  );
}