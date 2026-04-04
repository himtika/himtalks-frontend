import Link from 'next/link'
import Image from 'next/image'
import "./himtalks/globals.css"

export default function NotFound() {
  return (
    <section className="min-h-screen bg-primaryBG flex flex-col items-center justify-center text-center px-6 selection:bg-primary">
      {/* Ilustrasi Burung atau Icon */}
        <Image
            src="/himtalks/burung-mikir.webp"
            width={200}
            height={200}
            alt="loading"
            className="w-40 h-40 mb-4 animate-bounce"
        />

      <h1 className="font-cormorant italic font-bold text-6xl md:text-8xl text-darkSage tracking-tighter">
        404
      </h1>
      
      <h2 className="font-cormorant font-semibold text-2xl md:text-3xl text-darkSage mt-4">
        Oops! Halaman ini terbang entah kemana...
      </h2>

      <p className="font-poppins text-gray-500 mt-4 max-w-md">
        Sepertinya kamu tersesat di hutan Himtalks. Yuk, balik lagi ke jalur yang benar.
      </p>

      <Link 
        href="/himtalks"
        className="mt-10 font-poppins bg-darkSage text-white px-8 py-3 rounded-full hover:bg-primary transition-all duration-300 shadow-lg hover:-translate-y-1"
      >
        Kembali ke Beranda
      </Link>
    </section>
  )
}