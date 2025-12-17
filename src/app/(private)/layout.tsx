// import { jwtDecode } from "jwt-decode";
// import { redirect } from 'next/navigation';
// import { cookies, headers } from "next/headers";
// import Layout from "@/src/components/Layout/Layout";
// import { JwtPayload } from "@/src/types/Users/Users";
// import { logout } from "@/src/services/auth.service";

// const privateRoutes = ['/users', '/classification'];

// export default async function PrivateLayout({ children }: { children: React.ReactNode }) {

//   const cookieStore = cookies();
//   const token = (await cookieStore).get("auth_token");
//   console.log(token);

//   if (!token) {
//     redirect("/login");
//   }

//   const pathName = (await headers()).get('x-pathname');
//   const tokenValue = jwtDecode(token.value) as JwtPayload;
//   console.log(tokenValue);
//   if (tokenValue.exp * 1000 < Date.now())  {
//     try {
//       await logout();
//     }
//     finally {
//       redirect("/login");
//     }
//   }

//   const userAccess = tokenValue.type;
//   const userName = tokenValue.name;

//   if(privateRoutes.includes(pathName ?? '') && userAccess != 'admin'){
//     redirect('/home')
//   }

//   return (
//     <Layout permission={userAccess} userName={userName}>
//       {children}
//     </Layout>
//   );
// }

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
      console.log('[PRIVATE LAYOUT] chamando /me');

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/get-me`,
          {
            credentials: 'include',
            cache: 'no-store',
          }
        );

        console.log('[PRIVATE LAYOUT] status /me:', res.status);

        if (!res.ok) {
          console.log('[PRIVATE LAYOUT] não logado → redirect /login');
          router.replace('/login');
          return;
        }

        const data = await res.json();
        console.log('[PRIVATE LAYOUT] ME:', data);
        setMe(data);
      } catch (err) {
        console.error('[PRIVATE LAYOUT] erro no /me', err);
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    };

    getMe();
  }, [router]);

  if (loading) return null; // ou loader

  if (!me) return null;

  return (
    <Layout permission={me.type} userName={me.name}>
      {children}
    </Layout>
  );
}
