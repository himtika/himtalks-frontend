
"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export default function SongfessCard(){

    const [isHoverButton1, setIsHoverButton1] = useState(false);
    const [isHoverButton2, setIsHoverButton2] = useState(false);

    const [isHoverCard1, setIsHoverCard1] = useState(false);
    const [isHoverCard2, setIsHoverCard2] = useState(false);

    const timeoutRefButton1 = useRef(null);
    const timeoutRefButton2 = useRef(null);

    const timeoutRefCard1 = useRef(null);
    const timeoutRefCard2 = useRef(null);

    const handleMouseEnterButton1 = () => {
        clearTimeout(timeoutRefButton1.current);
        setIsHoverButton1(true);
    };

    const handleMouseLeaveButton1 = () => {
        timeoutRefButton1.current = setTimeout(() => {
            setIsHoverButton1(false);
        }, 700);
    };

    const handleMouseEnterButton2 = () => {
        clearTimeout(timeoutRefButton2.current);
        setIsHoverButton2(true);
    };

    const handleMouseLeaveButton2 = () => {
        timeoutRefButton2.current = setTimeout(() => {
            setIsHoverButton2(false);
        }, 700);
    };

    const handleMouseEnterCard1 = () => {
        clearTimeout(timeoutRefCard1.current);
        setIsHoverCard1(true);
    };

    const handleMouseLeaveCard1 = () => {
        timeoutRefCard1.current = setTimeout(() => {
            setIsHoverCard1(false);
        }, 500);
    };

    const handleMouseEnterCard2 = () => {
        clearTimeout(timeoutRefCard2.current);
        setIsHoverCard2(true);
    };

    const handleMouseLeaveCard2 = () => {
        timeoutRefCard2.current = setTimeout(() => {
            setIsHoverCard2(false);
        }, 500);
    };

    return (
        <section className="pt-20 lg:pt-[135px] pb-28 px-7 md:px-16 lg:px-28 bg-primaryBG">
            <div className="grid gap-8 sm:gap-12 sm:grid-cols-1 lg:grid-cols-2 max-w-[770px] w-[80%] md:w-[90%] mx-auto">
                {/* CARD 1 */}
                <div
                    onMouseEnter={handleMouseEnterCard1}
                    onMouseLeave={handleMouseLeaveCard1}
                    className={`max-w-90 mx-auto rounded-2xl shadow-md overflow-hidden transition-all duration-500
                                ${isHoverCard1 ? "bg-primary -translate-y-3 scale-103" : "bg-white"}`}
                >
                    {/* IMAGE HEADER */}
                    <div className="relative w-full h-45 sm:h-60 md:h-65">
                        <Image
                            src="/songfess/songfess-card-1.webp"
                            alt="chat-anonym"
                            fill
                            className="object-cover select-none"
                        />
                        <div 
                            className={`absolute -bottom-1 left-0 right-0 h-15 z-10 transition-colors duration-500 bg-linear-to-t from-primary via-primary/80 to-transparent
                            ${isHoverCard1 ? "from-primary via-primary/80 to-transparent" : "from-white via-white/80 to-transparent"}`}
                        />
                    </div>

                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-3 font-poppins text-white">
                        <h3 href="#" className={`block mb-3 font-semibold text-base sm:text-lg leading-5 sm:leading-7 md:text-xl lg:text-2xl transition-all duration-700 ${isHoverCard1 ? "text-white" : "group-hover:text-white text-darkSage"}`}>
                            Explore the messages waiting for you.
                        </h3>
                        <p className={`font-semilight sm:font-normal text-xs sm:text-sm mb-6 sm:leading-6 transition-all duration-700 ${isHoverCard1 ? "text-white" : "group-hover:text-white text-darkSage"}`}>
                            Ada pesan yang menunggu untuk kamu dengarkan—temukan Songfess yang ditujukan untukmu.
                        </p>
                        <button 
                            className={`inline-flex justify-center items-center gap-1 sm:gap-2 px-3 py-1 md:py-3 md:px-4 rounded-lg transition-all duration-500 
                            ${isHoverButton1 ? "bg-white" : "bg-darkSage"}`} 
                            onMouseEnter={handleMouseEnterButton1}
                            onMouseLeave={handleMouseLeaveButton1}
                            >
                            <Link href="/himtalks/songfess/browse-songfess" className={`font-light text-xs sm:text-sm transition-all duration-500 
                                ${isHoverButton1 ? "text-darkSage" : "text-white"}`}>
                                Browse Now
                            </Link>
                            <svg 
                            width="25" 
                            height="25" 
                            viewBox="0 0 32 32" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                            className={`transition-all duration-700 w-5 sm:w-8 ${isHoverButton1 ? "scale-90 rotate-45" : "scale-100 rotate-0"}`}
                            >
                            <path 
                                d="M28 28L22.2 22.2M25.3333 14.6667C25.3333 20.5577 20.5577 25.3333 14.6667 25.3333C8.77563 25.3333 4 20.5577 4 14.6667C4 8.77563 8.77563 4 14.6667 4C20.5577 4 25.3333 8.77563 25.3333 14.6667Z" 
                                stroke={isHoverButton1 ? "var(--color-darkSage)" : "#FFFFFF"} 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* CARD 2 */}
                <div
                    onMouseEnter={handleMouseEnterCard2}
                    onMouseLeave={handleMouseLeaveCard2}
                    className={`max-w-90 mx-auto rounded-2xl shadow-md overflow-hidden transition-all duration-500
                                ${isHoverCard2 ? "bg-primary -translate-y-3 scale-103" : "bg-white"}`}
                >
                    {/* IMAGE HEADER */}
                    <div className="relative w-full h-45 sm:h-60 md:h-65">
                        <Image
                            src="/songfess/songfess-card-2.webp"
                            alt="chat-anonym"
                            fill
                            className="object-cover select-none"
                        />
                        <div 
                            className={`absolute -bottom-1 left-0 right-0 h-15 z-10 transition-colors duration-500 bg-linear-to-t from-primary via-primary/80 to-transparent
                            ${isHoverCard2 ? "from-primary via-primary/80 to-transparent" : "from-white via-white/80 to-transparent"}`}
                        />
                    </div>

                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-3 font-poppins text-white">
                        <h3 href="#" className={`block mb-3 font-semibold text-base sm:text-lg leading-5 sm:leading-7 md:text-xl lg:text-2xl transition-all duration-700 ${isHoverCard2 ? "text-white" : "group-hover:text-white text-darkSage"}`}>
                            Reveal your untold story. Feel it, sing it.
                        </h3>
                        <p className={`font-semilight sm:font-normal text-xs sm:text-sm mb-6 sm:leading-6 transition-all duration-700 ${isHoverCard2 ? "text-white" : "group-hover:text-white text-darkSage"}`}>
                            Jangan simpan ceritamu sendiri. Biarkan musik menjadi jembatan untuk menyampaikan perasaanmu.
                        </p>
                        <button 
                            className={`inline-flex justify-center items-center gap-1 sm:gap-2 py-0.5 px-3 md:py-2 md:px-4 rounded-lg transition-all duration-500 
                            ${isHoverButton2 ? "bg-white" : "bg-darkSage"}`} 
                            onMouseEnter={handleMouseEnterButton2}
                            onMouseLeave={handleMouseLeaveButton2}
                            >
                            <Link href="/himtalks/songfess/form-songfess" className={`font-light text-xs sm:text-sm transition-all duration-500 
                                ${isHoverButton2 ? "text-darkSage" : "text-white"}`}>
                                Send Now
                            </Link>
                            <svg className={`transition-transform duration-700 w-5.5 sm:w-8 ${isHoverButton2 ? "rotate-90" : "peer-hover:rotate-90 rotate-0"}`}  width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.8335 22.6667L23.1668 9.33337M23.1668 9.33337H9.8335M23.1668 9.33337V22.6667" stroke={isHoverButton2 ? "var(--color-darkSage)" : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
