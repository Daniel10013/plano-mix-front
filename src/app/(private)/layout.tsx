'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from "@/src/components/Layout/Layout";

type MeResponse = {
  name: string;
  email: string;
  type: 'admin' | 'default';
};

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [me, setMe] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMe = async () => {

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/get-me`,
          {
            credentials: 'include',
            cache: 'no-store',
          }
        );


        if (!res.ok) {
          router.replace('/login');
          return;
        }

        const data = await res.json();
        setMe(data);
      } catch (err) {
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    };

    getMe();
  }, [router]);

  if (loading) return null;

  if (!me) return null;

  return (
    <Layout permission={me.type} userName={me.name}>
      {children}
    </Layout>
  );
}
