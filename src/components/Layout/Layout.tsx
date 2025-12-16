'use client';

import Topbar from './TopBar';
import Sidebar from './SideBar';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

export default function Layout({
  permission,
  userName,
  children,
}: {
  permission: 'default' | 'admin',
  userName: string,
  children: React.ReactNode;
}) {

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (userName) {
      localStorage.setItem("user_name", userName);
    }
  }, [userName]);

  return (
    <>
      <main className='xl:flex'>
        <Sidebar open={open} permission={permission} />
        <section className='flex flex-col xl:flex-1'>
          <Topbar menuOpen={open} setMenuOpen={setOpen} />
          <AnimatePresence>
            {open && (
              <motion.div
                key="overlay"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="fixed inset-0 h-screen bg-black/40 z-15 xl:hidden"
              />
            )}
          </AnimatePresence>
          <div className='h-full'>
            {children}
          </div>
        </section>
      </main>
    </>
  );
}
