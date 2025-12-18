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
      console.log('--- PUBLIC LAYOUT START ---');

      // 1️⃣ Ver cookies no browser
      console.log('[PUBLIC] document.cookie:', document.cookie);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/get-me`,
          {
            credentials: 'include',
            cache: 'no-store',
          }
        );

        console.log('[PUBLIC] /get-me status:', res.status);
        console.log('[PUBLIC] response headers:', [...res.headers.entries()]);

        if (res.ok) {
          const data = await res.json();
          console.log('[PUBLIC] /get-me DATA:', data);

          console.log('[PUBLIC] USUÁRIO LOGADO → redirect /home');
          router.replace('/home');
          return;
        }

        console.log('[PUBLIC] NÃO LOGADO (status != 200)');

      } catch (err) {
        console.error('[PUBLIC] ERRO NO FETCH /get-me:', err);
      } finally {
        console.log('[PUBLIC] FIM PUBLIC LAYOUT');
        setLoading(false);
      }
    };

    getMe();
  }, [router]);

  if (loading) return null;

  return <>{children}</>;
}
