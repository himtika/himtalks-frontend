import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600"],
  style: ["italic"],
  variable: "--font-playfair",
});

export default function AboutUs() {
  return (
    <section className="pt-16 lg:pt-24 pb-32 px-6 sm:px-16 md:px-12 lg:px-28 bg-primaryBG selection:bg-darkSage selection:text-white">
      <div className="relative w-[90%] lg:max-w-6xl mx-auto bg-card rounded-2xl shadow-sm py-12 px-10 lg:py-22 lg:px-12">
        {/* bunga kanan atas */}
        <Image
          src="/himtalks/pink.webp"
          width={140}
          height={140}
          alt="decoration"
          className="absolute -top-10 -right-10 sm:-top-13 sm:-right-13 lg:-top-20 lg:-right-20 w-[110px] sm:w-[140px] lg:w-[180px] xl:w-[210px] select-none pointer-events-none"
        />

        {/* burung kiri bawah */}
        <Image
          src="/himtalks/buwung.png"
          width={150}
          height={150}
          alt="decoration"
          className="absolute -bottom-22 -left-10 lg:-bottom-35 lg:-left-23 w-[145px] lg:w-[188px] xl:w-[222px] select-none pointer-events-none"
        />
        <div className="flex flex-col lg:flex-row items-center gap-5 lg:gap-15 w-full">
          <div className="md:w-1/2 flex justify-center lg:justify-start">
            <Image
              src="/himtalks/birds-about-us.webp"
              width={500}
              height={500}
              alt="illustration"
              className="w-full max-w-50 sm:max-w-75 lg:max-w-100 h-auto select-none"
            />
          </div>

          <div className="md:w-3/4">
            <h1 className="font-playfair text-center lg:text-left italic text-4xl sm:text-5xl font-semibold text-darkSage tracking-tight mb-6 sm:mb-9">
              About us
            </h1>
            <p className="text-sm sm:text-base text-center lg:text-left md:leading-7 text-darkSage">
              Himtalks adalah platform yang bertujuan menjadi penghubung dan
              sarana komunikasi antara pengurus Himtika dengan anggota maupun
              mahasiswa lainnya. Himtalks menyediakan fasilitas untuk
              menyampaikan kritik dan saran yang membangun, serta memungkinkan
              pengiriman pesan anonim.
            </p>

            {/* 🔥 IG ICON (DIPINDAH JADI CTA) */}
            <div className="mt-8 select-none flex justify-center lg:justify-start">
              <Link
                href="https://www.instagram.com/himtalks_?igsh=MW5tYm1iNG9udDB3dA=="
                target="_blank"
                className="font-medium inline-flex items-center gap-2 border border-[#7A918D] text-[#7A918D] px-4 py-2 rounded-md hover:bg-[#7A918D] hover:text-white transition"
              >
                Follow Us

                <svg
                  role="img"
                  width="18"
                  className="fill-current"
                  viewBox="0 0 24 24"
                >
                  <title>Instagram HIMTIKA</title>
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}