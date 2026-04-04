"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export default function OurFitur(){

  const [isHoverCard1,setIsHoverCard1] = useState(false);
  const [isHoverCard2,setIsHoverCard2] = useState(false);
  const [isHoverCard3,setIsHoverCard3] = useState(false);

  const timeoutRef = useRef(null);
  const timeoutRef2 = useRef(null);
  const timeoutRef3 = useRef(null);

  const [isHoverButton1, setIsHoverButton1] = useState(false);
  const [isHoverButton2, setIsHoverButton2] = useState(false);
  const [isHoverButton3, setIsHoverButton3] = useState(false);
  const timeoutRefButton1 = useRef(null);
  const timeoutRefButton2 = useRef(null);
  const timeoutRefButton3 = useRef(null);

  const handleEnter1 = ()=>{
  clearTimeout(timeoutRef.current);
  setIsHoverCard1(true);
  }

  const handleLeave1 = ()=>{
  timeoutRef.current=setTimeout(()=>{setIsHoverCard1(false)},500);
  }

  const handleEnter2 = ()=>{
  clearTimeout(timeoutRef2.current);
  setIsHoverCard2(true);
  }

  const handleLeave2 = ()=>{
  timeoutRef2.current=setTimeout(()=>{setIsHoverCard2(false)},500);
  }

  const handleEnter3 = ()=>{
  clearTimeout(timeoutRef3.current);
  setIsHoverCard3(true);
  }

  const handleLeave3 = ()=>{
  timeoutRef3.current=setTimeout(()=>{setIsHoverCard3(false)},500);
  }

  const handleMouseEnterButton1 = () => {
      {/*batalin timeout sebelumnya biar tidak kepending*/}
      clearTimeout(timeoutRefButton1.current);
      setIsHoverButton1(true);
  }

  const handleMouseLeaveButton1 = () => {
      {/*bikin delay 1 detik*/}
      timeoutRefButton1.current = setTimeout(() => {
          setIsHoverButton1(false);
      }, 700);
  }

  const handleMouseEnterButton2 = () => {
      {/*batalin timeout sebelumnya biar tidak kepending*/}
      clearTimeout(timeoutRefButton2.current);
      setIsHoverButton2(true);
  }

  const handleMouseLeaveButton2 = () => {
      {/*bikin delay 1 detik*/}
      timeoutRefButton2.current = setTimeout(() => {
          setIsHoverButton2(false);
      }, 700);
  }

  const handleMouseEnterButton3 = () => {
      {/*batalin timeout sebelumnya biar tidak kepending*/}
      clearTimeout(timeoutRefButton3.current);
      setIsHoverButton3(true);
  }

  const handleMouseLeaveButton3 = () => {
      {/*bikin delay 1 detik*/}
      timeoutRefButton3.current = setTimeout(() => {
          setIsHoverButton3(false);
      }, 700);
  }

  return (
    <section id="fitur-kami" className="pt-24 pb-32 px-6 sm:px-16 lg:px-20 xl:px-23 2xl:px-28 bg-primaryBG text-darkSage">

      {/* Title */}
      <div className="w-full text-center mb-10 sm:mb-13 md:mb-16">
        <h1 className="font-playfair italic text-darkSage text-4xl sm:text-5xl md:text-6xl font-semibold">
        Our Feature
        </h1>

        <p className="font-poppins w-[80%] sm:w-full text-xs sm:text-sm md:text-base mt-6 sm:mt-8 max-w-xl mx-auto md:leading-7">
        Himtalks hadir dengan tiga fitur utama yang membantu mahasiswa
        menyampaikan pesan, berbagi cerita, dan berdiskusi bersama.
        </p>
      </div>

      {/* Card Grid */}
      <div className="flex flex-col gap-8 lg:flex-wrap lg:flex-row justify-between w-full max-w-[75%] md:max-w-2xl xl:max-w-5xl mx-auto">
        {/* CARD 1 CHAT ANONYM */}
        <div
          onMouseEnter={handleEnter1}
          onMouseLeave={handleLeave1}
          className={`max-w-80 mx-auto rounded-2xl shadow-lg overflow-hidden transition-all duration-500
          ${isHoverCard1 ? "bg-ranting -translate-y-3 scale-103" : "bg-primary"}`}
        >
          {/* IMAGE HEADER */}
          <div className="relative w-full h-45 sm:h-60 lg:h-55 xl:h-60 2xl:h-65">
            <Image
              src="/himtalks/card1.webp"
              alt="chat-anonym"
              fill
              className="object-cover select-none"
            />
            <div 
              className={`absolute -bottom-1 left-0 right-0 h-15 z-10 transition-colors duration-500 bg-linear-to-t from-[#8FAE9A] via-[#8FAE9A]/80 to-transparent
              ${isHoverCard1 ? "from-ranting via-ranting/80" : "from-primary"}`}
            />
          </div>
        
          <div className="px-5 pb-5 pt-1 font-poppins text-white">
            <h3 href="#" className={`block mb-3 font-semibold text-lg md:text-xl lg:text-2xl transition-all duration-700 ${isHoverCard1 ? "text-black " : "group-hover:text-black text-white"}`}>
              Chat Anonym
            </h3>
            <p className={`font-semilight sm:font-normal text-xs sm:text-sm mb-6 sm:leading-6 transition-all duration-700 ${isHoverCard1 ? "text-black" : "group-hover:text-black text-white"}`}>
                Ruang terbuka untuk berbagi ide dan bertukar gagasan 
            </p>
            <button 
                className="inline-flex justify-center items-center gap-1 sm:gap-2 bg-darkSage py-0.5 px-3 md:py-2 md:px-4 rounded-lg hover:opacity-80 transition duration-500 peer"
                onMouseEnter={handleMouseEnterButton1}
                onMouseLeave={handleMouseLeaveButton1}
                >
                <Link href="/himtalks/chat-anonym" className="font-light text-xs sm:text-sm text-white">
                    Send Now
                </Link>
                <svg className={`transition-transform duration-700 w-6 sm:w-8 ${isHoverButton1 ? "rotate-90" : "peer-hover:rotate-90 rotate-0"}`}  width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.8335 22.6667L23.1668 9.33337M23.1668 9.33337H9.8335M23.1668 9.33337V22.6667" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
          </div>
        </div>

        {/* CARD 2 SONGFESS */}
        <div
          onMouseEnter={handleEnter2}
          onMouseLeave={handleLeave2}
          className={`max-w-80 mx-auto rounded-2xl shadow-lg overflow-hidden transition-all duration-500
          ${isHoverCard2 ? "bg-dahlia -translate-y-3 scale-103" : "bg-primary"}`}
        >

          {/* IMAGE HEADER */}
          <div className="relative w-full h-45 lg:h-55 xl:h-60 2xl:h-65">
            <Image
              src="/himtalks/card2.webp"
              alt="Songfess"
              fill
              className="object-cover select-none"
            />
            <div 
              className={`absolute -bottom-1 left-0 right-0 h-15 z-10 transition-colors duration-500 bg-linear-to-t from-[#8FAE9A] via-[#8FAE9A]/80 to-transparent
              ${isHoverCard2 ? "from-dahlia via-dahlia/80" : "from-primary"}`}
            />
          </div>

          <div className="px-5 pb-5 pt-1 font-poppins text-white">
            <h3 href="#" className={`block mb-3 font-semibold text-lg md:text-xl lg:text-2xl transition-all duration-700 ${isHoverCard2 ? "text-black " : "group-hover:text-black text-white"}`}>
            Songfess
            </h3>
            <p className={`font-semilight sm:font-normal text-xs sm:text-sm mb-6 sm:leading-6 transition-all duration-700 ${isHoverCard2 ? "text-black" : "group-hover:text-black text-white"}`}>
                Ekspresikan perasaanmu melalui lagu dengan fitur Songfess!
            </p>
            <button 
                className="inline-flex justify-center items-center gap-1 sm:gap-2 bg-darkSage py-0.5 px-3 md:py-2 md:px-4 rounded-lg hover:opacity-80 transition duration-500 peer"
                onMouseEnter={handleMouseEnterButton2}
                onMouseLeave={handleMouseLeaveButton2}
                >
                <Link href="/himtalks/songfess" className="font-light text-xs sm:text-sm text-white">
                    Send Now
                </Link>
                <svg className={`transition-transform duration-700 w-6 sm:w-8 ${isHoverButton2 ? "rotate-90" : "peer-hover:rotate-90 rotate-0"}`}  width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.8335 22.6667L23.1668 9.33337M23.1668 9.33337H9.8335M23.1668 9.33337V22.6667" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
          </div>
        </div>

        {/* CARD 3 MINI FORUM */}
        <div
          onMouseEnter={handleEnter3}
          onMouseLeave={handleLeave3}
          className={`max-w-80 mx-auto rounded-2xl shadow-lg overflow-hidden transition-all duration-500
          ${isHoverCard3 ? "bg-[#ddba58] -translate-y-3 scale-103" : "bg-primary"}`}
        >

          {/* IMAGE HEADER */}
          <div className="relative w-full h-45 lg:h-55 xl:h-60 2xl:h-65">
            <Image
              src="/himtalks/card3.webp"
              alt="Mini Forum"
              fill
              className="object-cover select-none"
            />
            <div 
              className={`absolute -bottom-1 left-0 right-0 h-15 z-10 transition-colors duration-500 bg-linear-to-t from-[#8FAE9A] via-[#8FAE9A]/80 to-transparent
              ${isHoverCard3 ? "from-[#ddba58] via-[#ddba58]/80" : "from-primary"}`}
            />
          </div>

          
          <div className="px-5 pb-5 pt-1 font-poppins text-white">
            <h3 href="#" className={`block mb-3 font-semibold text-lg md:text-xl lg:text-2xl transition-all duration-700 ${isHoverCard3 ? "text-black " : "group-hover:text-black text-white"}`}>
              Mini Forum
            </h3>
            <p className={`font-semilight sm:font-normal text-xs sm:text-sm mb-6 sm:leading-6 transition-all duration-700 ${isHoverCard3 ? "text-black" : "group-hover:text-black text-white"}`}>
              Mari berdiskusi dan temukan inspirasi baru bersama di Mini Forum!
            </p>
            <button 
                className="inline-flex justify-center items-center gap-1 sm:gap-2 bg-darkSage py-0.5 px-3 md:py-2 md:px-4 rounded-lg hover:opacity-80 transition duration-500 peer"
                onMouseEnter={handleMouseEnterButton3}
                onMouseLeave={handleMouseLeaveButton3}
                >
                <Link href="/himtalks/mini-forum" className="font-light text-xs sm:text-sm text-white">
                    Join Now
                </Link>
                <svg className={`transition-transform duration-700 w-6 sm:w-8 ${isHoverButton3 ? "rotate-90" : "peer-hover:rotate-90 rotate-0"}`}  width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.8335 22.6667L23.1668 9.33337M23.1668 9.33337H9.8335M23.1668 9.33337V22.6667" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}