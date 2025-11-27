import "../styles/globals.css";
import type { Metadata } from "next";
import { Josefin_Sans } from 'next/font/google';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['100','200','300','400','500','600','700'],
});

export const metadata: Metadata = {
  title: "Plano Mix",
  description: "Aplicação para o Via Shopping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={josefin.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
