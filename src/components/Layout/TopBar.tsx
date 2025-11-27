'use client';

import { Bars3Icon, ArrowLeftEndOnRectangleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function Topbar({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (value: boolean) => void; }) {
  return (
    <>
      {/* MOBILE HEADER */}
      <header className='xl:hidden flex items-center justify-between border-solid border-b border-gray-300 h-13 px-4 z-10'>
        <motion.div
          onClick={() => setMenuOpen(!menuOpen)}
          animate={{ x: menuOpen ? '75vw' : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {!menuOpen ?
            <><Bars3Icon height={32} className='cursor-pointer transition-all duration-200 hover:opacity-85' /></>
            :
            <><XMarkIcon className='cursor-pointer transition-all duration-200 hover:opacity-85' height={32} /></>
          }
        </motion.div>

        <ArrowLeftEndOnRectangleIcon height={32} />
      </header>

      {/* DESKTOP HEADER */}
      <header onClick={() => setMenuOpen(!menuOpen)} 
        className='hidden xl:flex items-center justify-between border-solid border-b border-gray-300 h-13 px-4 z-10'
      >
          {!menuOpen ?
            <><Bars3Icon height={32} className='cursor-pointer transition-all duration-200 hover:opacity-85' /></>
            :
            <><XMarkIcon className='cursor-pointer transition-all duration-200 hover:opacity-85' height={32} /></>
          }
        <ArrowLeftEndOnRectangleIcon height={32} />
      </header>
    </>
  );
}
