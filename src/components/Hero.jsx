"use client"; // 🔥 tambahan

import Link from "next/link";
import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import { Poppins } from "next/font/google";
import { useState, useEffect } from "react"; // 🔥 tambahan

export default function Hero() {

  // // 🔥 LOADING
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 800);

  //   return () => clearTimeout(timer);
  // }, []);

  // // 🔥 LOADING UI
  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex flex-col items-center justify-center bg-[#F3EEE6]">
        
  //       <Image
  //         src="/New folder/burung-mikir.svg"
  //         width={200}
  //         height={200}
  //         alt="loading"
  //         className="mb-4 animate-bounce"
  //       />

  //       <div className="w-10 h-10 border-4 border-[#5E6F69] border-t-transparent rounded-full animate-spin"></div>

  //       <p className="mt-4 text-[#5E6F69] text-sm">
  //         Menyiapkan diskusi...
  //       </p>

  //     </div>
  //   );
  // }

  // ================= KODE LU (TIDAK DIUBAH) =================

  return (
    <section className="pt-34 pb-32 px-6 sm:px-16 lg:px-20 xl:px-23 2xl:px-28 lg:pt-38 bg-primaryBG text-[#3F4F44] transition-all duration-500 selection:bg-darkSage selection:text-white">
      {/* Title */}
      <h1
        className="font-playfair italic font-bold text-5xl sm:text-6xl lg:text-7xl text-darkSage text-center 
          mb-4 md:mb-6 tracking-[-0.03em] leading-[110%]">
        HIMTALKS
      </h1>

      <div className="w-full flex flex-col lg:flex-col-reverse items-center text-center">
        {/* Illustration */}
        <div className="flex justify-center">
          <Image
            src="/himtalks/illustrasion-hero.webp"
            width={500}
            height={429}
            alt="illustration"
            className="w-80 h-56 md:w-96 md:h-70 lg:w-130 lg:h-95 select-none"
          />
        </div>

        <div>  
          {/* Description */}
          <p className="font-cormorant font-semibold text-sm md:text-base lg:text-xl sm:leading-7 mt-4 lg:mt-2 max-w-2xl text-center">
            Sampaikan kritik, saran, atau cerita anonimmu, dan ekspresikan
            perasaanmu melalui fitur songfess. Yuk, mulai berbagi dan
            berkomunikasi bersama kami!
          </p>

          {/* Button */}
          <div className="mt-8">
            <button
              onClick={() => {
                const featureSection = document.getElementById("fitur-kami");
                if (featureSection) {
                featureSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="font-poppins inline-block font-light bg-darkSage text-white px-8 py-3 sm:px-6 sm:py-2 rounded-lg hover:bg-[#667b77] hover:-translate-y-1 transition duration-500"
            >
              Start Now!
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}