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
    const isResetPassword = pathname === '/reset-password';
    const token = searchParams.get('token');

    if (isResetPassword && token) {
      setLoading(false);
      return;
    }

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
        // ignora erro
      } finally {
        setLoading(false);
      }
    };

    getMe();
  }, [router, pathname, searchParams]);

  if (loading) return null;

  return <>{children}</>;
}
