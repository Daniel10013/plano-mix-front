'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
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

        if (res.ok) {
          router.replace('/home');
          return;
        }


      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    getMe();
  }, [router]);

  if (loading) return null;

  return <>{children}</>;
}
