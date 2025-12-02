"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export default function AccordionClassification({
    title,
    children,
    className
}: {
    title: any,
    children: React.ReactNode,
    className?: string
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className={`border border-gray-300 rounded-[10px] w-full xl:w-[60%] overflow-hidden ${className || ""}`}>
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center p-3 font-semibold"
            >
                {title}

                <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDownIcon />
                </motion.div>
            </button>

            <motion.div
                initial={false}
                animate={{
                    height: open ? "auto" : 0,
                }}
                transition={{
                    duration: 0.18,
                    ease: "easeInOut",
                }}
                className="overflow-hidden"
            >
                <motion.div
                    animate={{
                        opacity: open ? 1 : 0,
                        y: open ? 0 : -4,
                    }}
                    transition={{
                        duration: 0.15,
                    }}
                    className="px-4 pb-2"
                >
                    {children}
                </motion.div>
            </motion.div>
        </div>
    );
}
