'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { HomeIcon, BuildingOfficeIcon, BuildingStorefrontIcon, MapPinIcon, UserGroupIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

export default function Sidebar({ open, permission }: { open: boolean, permission: 'default' | 'admin', }) {

  const pathname = usePathname();
  const [alignClass, setAlignClass] = useState<string>('justify-start')

  const items = [
    { name: 'Home', url: '/home', icon: HomeIcon },
    { name: 'Shoppings', url: '/shoppings', icon: BuildingOfficeIcon },
    { name: 'Lojas', url: '/stores', icon: BuildingStorefrontIcon },
    { name: 'Visitas', url: '/visits', icon: MapPinIcon },
  ]

  const itemsAdm = [
    { name: 'Classificações', url: '/classifications', icon: ClipboardDocumentListIcon },
    { name: 'Usuários', url: '/users', icon: UserGroupIcon },
  ];

  return (
    <>
      {/* MOBILE */}
      <motion.aside
        className="fixed xl:hidden  w-[70%] h-screen bg-white border-r border-gray-300 z-20 p-4 shadow-lg py-12 px-3 flex items-center flex-col"
        initial={{ x: '-100%' }}
        animate={{ x: open ? '0%' : '-100%' }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <h1 className="text-[#8173FF] text-7xl mb-6 weight font-normal">MIX</h1>

        <div className='w-full flex flex-col gap-3'>
          {items.map((item) => {
            var url = pathname == '/' ? '/home' : pathname;
            const active = url === item.url;
            return ((
              <div key={item.url} className={`
                flex items-center px-2 py-1 text-[22px] rounded-[10px] cursor-pointer transition-all duration-200
                ${active ? "bg-[#8173FF] text-white" : "text-[#6E6E6E] hover:bg-[#8173FF] hover:text-white"}
              `}>
                <Link href={item.url} className='flex gap-2'>
                  <item.icon width={28} className="relative bottom-[3px]" />
                  <span className='relative top-[3px]' >{item.name}</span>
                </Link>
              </div>
            ))
          }
          )}
          {permission == 'admin' ?
            (<>
              <div className='flex flex-col justify-center items-center text-[#6E6E6E] mt-4'>
                <span className='' >Administração</span>
                <hr className='w-full text-gray-300' />
              </div>
              {itemsAdm.map((item) => {
                var url = pathname == '/' ? '/home' : pathname;
                const active = url === item.url;
                return ((
                  <div key={item.url} className={`
                flex items-center px-2 py-1 text-[22px] rounded-[10px] cursor-pointer transition-all duration-200
                ${active ? "bg-[#8173FF] text-white" : "text-[#6E6E6E] hover:bg-[#8173FF] hover:text-white"}
              `}>
                    <Link href={item.url} className='flex gap-2'>
                      <item.icon width={28} className="relative bottom-[3px]" />
                      <span className='relative top-[3px]' >{item.name}</span>
                    </Link>
                  </div>
                ))
              }
              )}
            </>)
            : (<></>)}
        </div>
      </motion.aside>



      {/* DESKTOP */}
      <motion.aside
        className="hidden xl:flex sticky top-0 self-start xl:w-[15%] h-screen bg-white border-r border-gray-300 z-50 p-4 shadow-lg py-12 px-3 items-center flex-col overflow-hidden"
        initial={{ width: '15%' }}
        animate={{ width: open ? '15%' : '4%' }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onAnimationStart={() => {
          if (open) {
            setAlignClass('justify-start');
          }
        }}
        onAnimationComplete={() => {
          if (open) {
            setAlignClass('justify-start');
          } else {
            setAlignClass('justify-center');
          }
        }}
      >

        <AnimatePresence mode="wait">
          {open ? (
            <motion.h1
              key="mix"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.1 }}
              className="text-[#8173FF] text-7xl mb-6 font-normal"
            >
              MIX
            </motion.h1>
          ) : (
            <motion.h1
              key="m"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.1 }}
              className="text-[#8173FF] text-7xl mb-6 font-normal"
            >
              M
            </motion.h1>
          )}
        </AnimatePresence>

        <div className='w-full flex flex-col gap-3'>
          <div className='w-full flex flex-col gap-3'>
            {items.map((item) => {
              var url = pathname == '/' ? '/home' : pathname;
              const active = url === item.url;
              return ((
                <Link
                  href={item.url}
                  key={item.url}
                  className={`
                    flex items-center px-2 h-11 text-[22px] rounded-[10px] cursor-pointer 
                    transition-all duration-200 w-full gap-2 
                    ${alignClass}
                    ${active ? "bg-[#8173FF] text-white" : "text-[#6E6E6E] hover:bg-[#8173FF] hover:text-white"}
                  `}
                >
                  <item.icon width={28} className="shrink-0" />

                  <AnimatePresence mode="wait">
                    {open ? (
                      <motion.span
                        key="full"
                        className="overflow-hidden inline-block"
                        initial={{ width: 0 }}
                        animate={{ width: "auto" }}
                        exit={{ width: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.name}
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </Link>
              ))
            }
            )}
            {permission == 'admin' ?
              (<>
                <div className='flex flex-col justify-center items-center text-[#6E6E6E] mt-4'>
                  <AnimatePresence mode="wait">
                    {open ? (
                      <motion.span
                        key="admin"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.1 }}
                      >
                        Administração
                      </motion.span>
                    ) : (
                      <motion.span
                        key="adm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.1 }}
                      >
                        Adm
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <hr className='w-full text-gray-300' />
                </div>
                {itemsAdm.map((item) => {
                  var url = pathname == '/' ? '/home' : pathname;
                  const active = url === item.url;
                  return ((
                    <Link
                      href={item.url}
                      key={item.url}
                      className={`
                    flex items-center px-2 h-11 text-[22px] rounded-[10px] cursor-pointer 
                    transition-all duration-200 w-full gap-2 
                    ${alignClass}
                    ${active ? "bg-[#8173FF] text-white" : "text-[#6E6E6E] hover:bg-[#8173FF] hover:text-white"}
                  `}
                    >
                      <item.icon width={28} className="shrink-0" />

                      <AnimatePresence mode="wait">
                        {open ? (
                          <motion.span
                            key="full"
                            className="overflow-hidden inline-block"
                            initial={{ width: 0 }}
                            animate={{ width: "auto" }}
                            exit={{ width: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.name}
                          </motion.span>
                        ) : null}
                      </AnimatePresence>
                    </Link>
                  ))
                }
                )}
              </>)
              : (<></>)}
          </div>
        </div>
      </motion.aside>
    </>
  );
}