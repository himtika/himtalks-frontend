"use client"; // 🔥 wajib kalau mau pakai useState/useEffect

import Image from "next/image";
import { useState, useEffect } from "react"; // 🔥 tambahan

export default function SongfessHero() {
  
  // ================= KODE LU (UTUH) =================

  return (
    <section className="pt-40 pb-24 px-6 sm:px-16 lg:px-20 xl:px-23 2xl:px-28 bg-primaryBG text-center">
      {/* TITLE */}
      <h1 className="font-playfair font-medium italic text-darkSage text-3xl md:text-5xl lg:text-6xl max-w-5xl mx-auto leading-tight tracking-tighter">
        Even the toughest feelings can be shared in unique and meaningful ways.
      </h1>

      {/* SUBTITLE */}
      <p className="font-cormorant font-semibold text-darkSage mt-6 text-sm md:text-2xl">
        Let the song speak the words you can't say.
      </p>

      {/* ILLUSTRATION */}
      <div className="flex justify-center mt-6 md:mt-12">
        <Image
          src="/songfess/songfess-bird.webp"
          width={420}
          height={420}
          alt="songfess illustration"
          className="w-65 md:w-85 lg:w-130"
          priority
        />
      </div>

    </section>
  );
}