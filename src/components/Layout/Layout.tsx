'use client';

import Topbar from './TopBar';
import Sidebar from './SideBar';
import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [open, setOpen] = useState<boolean>(true);

  return (
    <>
      <main className='xl:flex'>
        <Sidebar open={open} />
        <section className='flex flex-col xl:w-full'>
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
                className="fixed inset-0 bg-black/40 z-10 mt-13 xl:hidden"
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
