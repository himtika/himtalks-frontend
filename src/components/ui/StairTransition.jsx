'use client';

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Stairs from './Stairs';
import React from 'react'

const StairTransition = () => {
    const pathname = usePathname();
    return (
        <AnimatePresence mode='wait'>
            <div key={pathname} className='pointer-events-none'>
                {/* Layer Overlay Utama */}
                <div className='h-screen w-screen fixed top-0 left-0 right-0 pointer-events-none flex z-50 overflow-hidden'>
                    
                    {/* Visual Burung Mikir & Teks Loading */}
                    <motion.div 
                        className="fixed inset-0 flex flex-col items-center justify-center z-60"
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{ 
                            opacity: 0,
                            y: "-100%", // Terangkat ke atas saat selesai
                            transition: { 
                                delay: 0.8, // Beri waktu user lihat burungnya sebentar
                                duration: 0.8, 
                                ease: [0.76, 0, 0.24, 1] 
                            }
                        }}
                        exit={{ 
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.5, ease: "easeOut" } 
                        }}
                    >
                        <div className="flex flex-col items-center">
                            {/* Gambar Burung dengan Bounce Tailwind */}
                            <Image
                                src="/himtalks/burung-mikir.webp"
                                width={200}
                                height={200}
                                alt="loading"
                                className="mb-4 animate-bounce"
                            />

                            {/* Spinner */}
                            <div className="w-10 h-10 border-4 border-[#5E6F69] border-t-transparent rounded-full animate-spin"></div>

                            {/* Teks Deskripsi */}
                            <p className="mt-4 text-[#5E6F69] text-lg font-cormorant font-bold">
                                Menyiapkan diskusi...
                            </p>
                        </div>
                    </motion.div>

                    {/* Komponen Tangga di Background */}
                    <div className="absolute inset-0 flex">
                        <Stairs />
                    </div>
                </div>

                {/* Overlay Hitam/Warna Gelap yang Memudar */}
                <motion.div 
                    className='h-screen w-screen fixed bg-primary top-0 pointer-events-none z-40' 
                    initial={{ opacity: 1 }}
                    animate={{
                        opacity: 0,
                        transition: { delay: 1.7, duration: 0.5, ease: 'easeInOut' }
                    }}
                />
            </div>
        </AnimatePresence>
    )
}

export default StairTransition
