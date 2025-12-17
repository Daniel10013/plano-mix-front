import { jwtDecode } from "jwt-decode";
import { redirect } from 'next/navigation';
import { cookies, headers } from "next/headers";
import Layout from "@/src/components/Layout/Layout";
import { JwtPayload } from "@/src/types/Users/Users";
import { logout } from "@/src/services/auth.service";

const privateRoutes = ['/users', '/classification'];

export default async function PrivateLayout({ children }: { children: React.ReactNode }) {

  const cookieStore = cookies();
  const token = (await cookieStore).get("auth_token");
  
  if (!token) {
    redirect("/login");
  }
  
  const pathName = (await headers()).get('x-pathname');
  const tokenValue = jwtDecode(token.value) as JwtPayload;
  if (tokenValue.exp * 1000 < Date.now())  {
    try {
      await logout();
    }
    finally {
      redirect("/login");
    }
  }
  
  const userAccess = tokenValue.type;
  const userName = tokenValue.name;

  if(privateRoutes.includes(pathName ?? '') && userAccess != 'admin'){
    redirect('/home')
  }

  return (
    <Layout permission={userAccess} userName={userName}>
      {children}
    </Layout>
  );
}