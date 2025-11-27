import Layout from "@/src/components/Layout/Layout";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout>
        {children}
    </Layout>
  );
}
