'use client';

import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { logout as endSession } from '@/src/services/auth.service';
import { Bars3Icon, ArrowLeftEndOnRectangleIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Topbar({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (value: boolean) => void; }) {

  const router = useRouter();

  const handleLogoutClick = async () => {
    Swal.fire({
      title: 'Logout',
      text: 'Deseja encerrar sua sessão?', showLoaderOnConfirm: true,
      icon: 'warning', showCancelButton: true, cancelButtonText: 'Não',
      showConfirmButton: true, confirmButtonText: 'Sim'
    }).then(async (action) => {
      if (action.isConfirmed) {
        await logout();
      }
    })
  }

  const logout = async () => {
    const { status, message } = await endSession();

    if (!status) {
      Swal.close();
      Swal.fire({
        title: 'Erro!',
        text: message,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }

    sessionStorage.setItem("showLogoutToast", "1");

    router.replace('/login');
    router.refresh();
  };

  return (
    <>
      {/* MOBILE HEADER */}
      <header className='fixed bg-white w-full xl:hidden flex items-center justify-between border-solid border-b border-gray-300 h-13 px-4 z-19'>
        <motion.div
          onClick={() => setMenuOpen(!menuOpen)}
          animate={{ x: menuOpen ? '75vw' : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.div
            key={menuOpen ? "open" : "closed"}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="cursor-pointer"
          >
            {!menuOpen ? (
              <Bars3Icon height={32} />
            ) : (
              <XMarkIcon height={32} />
            )}
          </motion.div>
        </motion.div>

        <ArrowLeftEndOnRectangleIcon height={32} onClick={() => { handleLogoutClick() }} className='cursor-pointer' />
      </header>

      {/* DESKTOP HEADER */}
      <header
        className={`
          hidden xl:flex sticky top-0 self-start
          w-full bg-white items-center justify-between 
          border-b border-gray-300 h-13 px-4 z-19
          transition-all duration-300
        `}
      >
        <motion.div
          key={menuOpen ? "open" : "closed"}
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 90 }}
          transition={{ duration: 0.3 }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="cursor-pointer"
        >
          {!menuOpen ? (
            <Bars3Icon height={32} />
          ) : (
            <XMarkIcon height={32} />
          )}
        </motion.div>

        <ArrowLeftEndOnRectangleIcon height={32} onClick={() => { handleLogoutClick() }} className='cursor-pointer transition-all duration-200 hover:opacity-60' />
      </header>
    </>
  );
}
