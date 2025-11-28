
import { redirect } from 'next/navigation';
// import { getSession } from '@/lib/auth';
import Layout from "@/src/components/Layout/Layout";

export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
    // const session = await getSession(); // sua função de auth
    // if (!session) {
    //   redirect('/login'); // redireciona se não estiver logado
    // }
  return (
    <Layout>
        {children}
    </Layout>
  );
}
