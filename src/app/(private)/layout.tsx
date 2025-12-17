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

import { redirect } from "next/navigation";
import Layout from "@/src/components/Layout/Layout";
type MeResponse = {
  name: string;
  email: string;
  type: 'admin' | 'default';
};

async function getMe(): Promise<MeResponse | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
    credentials: "include",
    cache: "no-store",
  });

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
    redirect("/login");
  }

  return (
    <Layout permission={me.type} userName={me.name}>
      {children}
    </Layout>
  );
}
