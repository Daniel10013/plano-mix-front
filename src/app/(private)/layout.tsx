'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  const isResetPassword = pathname === '/reset-password';

  useEffect(() => {
    if (isResetPassword) {
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
      } catch (_) {
      } finally {
        setLoading(false);
      }
    };

    getMe();
  }, [router, isResetPassword]);

  if (loading) return null;

  return <>{children}</>;
}
