
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth_token");

  if (token) {
    redirect("/home");
  }

  return (
    <>
      {children}
    </>
  );
}
