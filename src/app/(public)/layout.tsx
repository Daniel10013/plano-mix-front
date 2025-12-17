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
import { redirect } from "next/navigation";

async function getMe() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const me = await getMe();

  // se já estiver logado, não pode ver login/register
  if (me) {
    redirect("/home");
  }

  return <>{children}</>;
}
