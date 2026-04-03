'use client';
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const PageTransition = ({ children }) => {
    const pathname = usePathname();
    return (
        <AnimatePresence>
            <div key={pathname}>
                {/* Overlay penutup yang memudar (Fade Out) */}
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{
                        opacity: 0,
                        transition: { 
                            delay: 1.5, // Beri waktu Stairs & Burung buat main dulu
                            duration: 0.4, 
                            ease: "easeInOut" 
                        },
                    }} 
                    className="z-30 h-screen w-screen fixed bg-primaryBG top-0 pointer-events-none"
                />
                {children}  
            </div>
        </AnimatePresence>
    );
    
}

export default PageTransition;
