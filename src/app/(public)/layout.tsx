// import { cookies } from "next/headers";
// import { jwtDecode } from "jwt-decode";
// import { redirect } from "next/navigation";
// import { JwtPayload } from "@/src/types/Users/Users";

// export default async function PublicLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const cookieStore = cookies();
//   const token = (await cookieStore).get("auth_token");
//   console.log(token);
//   if (!token) {
//     return <>{children}</>;
//   }

//   try {
//     const tokenValue = jwtDecode<JwtPayload>(token.value);

//     if (tokenValue.exp * 1000 < Date.now()) {
//       return <>{children}</>;
//     }

//     redirect("/home");
//   } catch {
//     return <>{children}</>;
//   }
// }
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
      console.log('[PUBLIC LAYOUT] chamando /me');

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/get-me`,
          {
            credentials: 'include',
            cache: 'no-store',
          }
        );

        console.log('[PUBLIC LAYOUT] status /me:', res.status);

        if (res.ok) {
          const data = await res.json();
          console.log('[PUBLIC LAYOUT] ME:', data);
          router.replace('/home');
          return;
        }

        console.log('[PUBLIC LAYOUT] não logado');
      } catch (err) {
        console.error('[PUBLIC LAYOUT] erro no /me', err);
      } finally {
        setLoading(false);
      }
    };

    getMe();
  }, [router]);

  if (loading) return null; // ou loader

  return <>{children}</>;
}
