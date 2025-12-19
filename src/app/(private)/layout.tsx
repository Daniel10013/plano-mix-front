'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMe = async () => {
      // ✅ libera reset-password se tiver token
      if (pathname === '/reset-password') {
        const token = searchParams.get('token');
        if (token) {
          setLoading(false);
          return;
        }
      }

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
        // ignora
      } finally {
        setLoading(false);
      }
    };

    getMe();
  }, [router, pathname, searchParams]);

  if (loading) return null;

  return <>{children}</>;
}
