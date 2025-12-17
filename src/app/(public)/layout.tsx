import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import { JwtPayload } from "@/src/types/Users/Users";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth_token");

  if (!token) {
    return <>{children}</>;
  }

  try {
    const tokenValue = jwtDecode<JwtPayload>(token.value);

    if (tokenValue.exp * 1000 < Date.now()) {
      return <>{children}</>;
    }

    redirect("/home");
  } catch {
    return <>{children}</>;
  }
}
