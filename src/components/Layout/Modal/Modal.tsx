'use client';
import { XMarkIcon } from "@heroicons/react/24/solid"
import { AnimatePresence, motion } from "framer-motion";

type ModalProps = {
    title: string, 
    isOpen: boolean, 
    width: number, 
    widthMobile: number,
    onClose: () => void,
    children: React.ReactNode
}

export default function Modal (
    {title, isOpen, width, widthMobile, onClose, children}: ModalProps
) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-9999 bg-black/50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}

                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ duration: 0.1 }}
                        className={`w-[${widthMobile}%] xl:w-[${width}%] bg-white rounded-2xl shadow-lg max-h-[95vh] overflow-x-auto`}
                    >
                        <div className="p-4 flex justify-between gap-4 border-gray-300 border-b">
                            <h1 className="text-2xl">{title}</h1>
                            <XMarkIcon 
                                height={30}
                                onClick={onClose}
                                className="transition-all duration-200 cursor-pointer hover:text-gray-700"
                            />
                        </div>

                        <div className="p-4">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
