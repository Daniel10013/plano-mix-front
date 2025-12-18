import { redirect } from 'next/navigation';
import Layout from '@/src/components/Layout/Layout';

type MeResponse = {
  name: string;
  email: string;
  type: 'admin' | 'default';
};

async function getMe(): Promise<MeResponse | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/get-me`,
    {
      credentials: 'include',
      cache: 'no-store',
    }
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const me = await getMe();

  if (!me) {
    redirect('/login');
  }

  return (
    <Layout permission={me.type} userName={me.name}>
      {children}
    </Layout>
  );
}
