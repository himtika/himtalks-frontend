"use client";

import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/navigation";
import ForumCard from "@/components/ForumCard";
import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";
import Link from "next/link";

/*  SLUG */
function slugify(text) {
  return text
    ?.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/*  TIME FORMAT */
function timeAgo(date) {
  if (!date) return "-";

  const now = new Date();
  const past = new Date(date);
  const diff = Math.floor((now - past) / 1000);

  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(diff / 3600);
  const days = Math.floor(diff / 86400);

  if (minutes < 1) return "Baru saja";
  if (minutes < 60) return `${minutes} menit lalu`;
  if (hours < 24) return `${hours} jam lalu`;
  return `${days} hari lalu`;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function MiniForum() {
  const router = useRouter();
  const [latest, setLatest] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchForums() {
      try {
        const res = await fetch(`${API_BASE}/forums`);
        if (!res.ok) throw new Error("Failed to load forums");
        const data = await res.json();
        
        let sorted = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        // API gives `image_url` but code expects `image`. We standardize it here.
        sorted = sorted.map(f => ({ ...f, image: f.image_url || f.image }));

        if (sorted.length > 0) {
          setLatest(sorted[0]);
          setRecent(sorted.slice(1, 6)); // up to 5 items
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchForums();
  }, []);

  return (
    <main className="bg-primaryBG pt-10 md:pt-20 px-6 sm:px-16 lg:px-20 xl:px-23 2xl:px-28 selection:bg-primary selection:text-white">

      {/* HERO */}
      <section className="text-center py-24">
        <h1 className="font-playfair font-medium italic text-darkSage text-3xl md:text-5xl lg:text-6xl max-w-5xl mx-auto leading-tight tracking-tighter">
          Every voice deserves to be heard and understood
        </h1>

        <p className="font-cormorant font-semibold text-darkSage mt-6 text-sm md:text-2xl">
          Let your thoughts find their place here
        </p>

        {/* Button */}
        <div className="mt-8">
          <button
            onClick={() => {
              const featureSection = document.getElementById("latest-discussion");
              if (featureSection) {
              featureSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="font-poppins inline-block font-light bg-darkSage text-white text-xs sm:text-sm md:text-lg px-6 py-2 sm:px-8 sm:py-3 rounded-lg hover:bg-[#667b77] hover:-translate-y-1 transition duration-500"
          >
            Start Discussion!
          </button>
        </div>

        <div className="mt-14 flex justify-center">
          <Image
            src="/miniforum/forum-hero.webp"
            width={320}
            height={220}
            alt="birds"
            className="w-65 md:w-85 lg:w-130"
          />
        </div>
      </section>

      {/* LATEST */}
      <section id="latest-discussion" className="mt-20 mx-auto pb-16 lg:pb-24">
        <h2 className="text-3xl md:text-5xl font-bold italic font-playfair text-darkSage mb-10 lg:mb-13 text-center">
          Latest Discussion
        </h2>

        {latest && (
          <div className="flex justify-center w-full md:max-w-[90%] mx-auto">
            <div
              onClick={(e) => {
                    e.stopPropagation();
                    const slug = `${latest.id}-${slugify(latest.title)}`;
                    router.push(`/himtalks/mini-forum/${slug}#comment`);
                  }}
              /* STYLE DISAMAIN DENGAN FORUMCARD */
              className="bg-white w-full rounded-2xl shadow-lg p-5 relative border border-gray-100 hover:-translate-y-2 transition duration-300 cursor-pointer selection:bg-darkSage selection:text-white"
            >
              {/* HEADER (Himtalks + Time) */}
              <div className="flex justify-between items-center mb-3 md:mb-5 font-poppins">
                <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm lg:text-base text-gray-500 font-poppins mb-3 md:mb-4">
                  <img src="/logo/himtalks-logo.webp" alt="Himtalks" className="w-5 h-5 md:w-6 md:h-6 object-cover rounded-full" />
                  <span className="text-black">Himtalks</span>
                  <span>•</span>
                  <span>{timeAgo(latest.created_at)}</span>
                </div>

                <span className="text-xs border px-2 md:px-3 py-0.5 md:py-1 rounded-full text-gray-500">
                  19.00 - 21.00 WIB
                </span>
              </div>

              {/* TITLE */}
              <div className="h-fit flex items-center mb-3 lg:mb-5">
                <h2 className="text-lg md:text-xl lg:text-2xl 2xl:max-w-[80%] font-cormorant font-semibold tracking-tighter text-justify text-darkSage leading-5 md:leading-7 line-clamp-2 overflow-hidden text-ellipsis wrap-break-word">
                  {latest.title}
                </h2>
              </div>

              {/* DESC / CONTENT */}
              <p className="font-poppins tracking-tighter text-gray-500 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2 text-ellipsis">
                {latest.content}
              </p>

              {/* IMAGE */}
              {latest.image_url || latest.image ? (
                <div className="overflow-hidden rounded-xl mb-4">
                  <Image
                    src={latest.image_url || latest.image}
                    width={800} // Dibikin lebih lebar karena ini latest (utama)
                    height={400}
                    className="w-full h-48 md:h-80 lg:h-100 xl:h-120 object-cover hover:scale-105 transition-transform duration-300"
                    alt="latest discussion"
                  />
                </div>
              ) : (
                <div className="rounded-xl mb-4 w-full h-48 md:h-80 lg:h-100 xl:h-120 bg-gray-200"></div>
              )}

              {/* COMMENT BUTTON STYLE */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const slug = `${latest.id}-${slugify(latest.title)}`;
                  router.push(`/himtalks/mini-forum/${slug}#comment`);
                }}
              >
                <span className="font-poppins inline-flex items-center gap-1 md:gap-2 bg-darkSage text-white hover:bg-white hover:text-darkSage px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm border border-darkSage transition-all duration-500">
                  <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 4C6.232 4 3.5 6.419 3.5 9.5C3.5 10.722 3.935 11.847 4.662 12.755L4.018 15.118C3.99507 15.208 3.99746 15.3026 4.0249 15.3913C4.05233 15.48 4.10376 15.5595 4.17348 15.6208C4.24321 15.6822 4.32853 15.723 4.42003 15.739C4.51153 15.7549 4.60565 15.7452 4.692 15.711L7.492 14.545C7.6144 14.4939 7.7115 14.3964 7.76195 14.2737C7.8124 14.1511 7.81205 14.0134 7.761 13.891C7.70995 13.7686 7.61236 13.6715 7.48971 13.6211C7.36706 13.5706 7.2294 13.5709 7.107 13.622L5.251 14.395L5.696 12.765C5.71784 12.6849 5.71941 12.6007 5.70055 12.5198C5.6817 12.439 5.64302 12.3641 5.588 12.302C4.903 11.528 4.5 10.555 4.5 9.5C4.5 7.059 6.693 5 9.5 5C11.81 5 13.71 6.398 14.305 8.253C11.125 8.347 8.5 10.73 8.5 13.75C8.5 16.831 11.232 19.25 14.5 19.25C15.247 19.2509 15.9885 19.123 16.692 18.872L19.308 19.962C19.684 20.118 20.09 19.762 19.982 19.368L19.338 17.005C20.0866 16.085 20.4967 14.936 20.5 13.75C20.5 10.943 18.233 8.686 15.358 8.306C14.758 5.814 12.335 4 9.5 4ZM9.5 13.75C9.5 11.309 11.693 9.25 14.5 9.25C17.307 9.25 19.5 11.309 19.5 13.75C19.5 14.805 19.097 15.778 18.412 16.552C18.357 16.6141 18.3183 16.689 18.2994 16.7698C18.2806 16.8507 18.2822 16.9349 18.304 17.015L18.749 18.645L16.893 17.872C16.7725 17.8218 16.6372 17.8208 16.516 17.869C15.8738 18.1213 15.1899 18.2506 14.5 18.25C11.693 18.25 9.5 16.192 9.5 13.75Z" />
                  </svg>
                  <span>{latest.comment_count} Komentar</span>
                </span>
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-10">Sabar Mazzehh, lagi loading...</div>
        ) : latest ? (
          <div className="flex justify-center w-full md:max-w-[90%] mx-auto">
            <div
              onClick={(e) => {
                e.stopPropagation();
                const slug = `${latest.id}-${slugify(latest.title)}`;
                router.push(`/himtalks/mini-forum/${slug}#comment`);
              }}
              // onClick={() => {
              //   const slug = `${latest.id}-${slugify(latest.title)}`;
              //   router.push(`/himtalks/mini-forum/${slug}#comment`);
              // }}
              className="bg-white w-full rounded-2xl shadow-lg p-5 relative border border-gray-100 hover:-translate-y-2 transition duration-300 cursor-pointer selection:bg-darkSage selection:text-white"
            >
              {/* HEADER (Himtalks + Time) */}
              <div className="flex justify-between items-center mb-3 md:mb-5 font-poppins">
                <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm lg:text-base text-gray-500 font-poppins mb-3 md:mb-4">
                  <img src="/logo/himtalks-logo.webp" alt="Himtalks" className="w-5 h-5 md:w-6 md:h-6 object-cover rounded-full" />
                  <span className="text-black">Himtalks</span>
                  <span>•</span>
                  <span>{timeAgo(latest.created_at)}</span>
                </div>
          
                <span className="text-xs border px-2 md:px-3 py-0.5 md:py-1 rounded-full text-gray-500">
                  19.00 - 21.00 WIB
                </span>
              </div>
          
              {/* TITLE */}
              <div className="h-fit flex items-center mb-3 lg:mb-5">
                <h2 className="text-lg md:text-xl lg:text-2xl 2xl:max-w-[80%] font-cormorant font-semibold tracking-tighter text-justify text-darkSage leading-5 md:leading-7 line-clamp-2 overflow-hidden text-ellipsis wrap-break-word">
                  {latest.title}
                </h2>
              </div>
          
              {/* DESC / CONTENT */}
              <p className="font-poppins tracking-tighter text-gray-500 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2 text-ellipsis">
                {latest.content}
              </p>
          
              {/* IMAGE */}
              {latest.image_url || latest.image ? (
                <div className="overflow-hidden rounded-xl mb-4">
                  <Image
                    src={latest.image_url || latest.image}
                    width={800} // Dibikin lebih lebar karena ini latest (utama)
                    height={400}
                    className="w-full h-48 md:h-80 lg:h-100 xl:h-120 object-cover hover:scale-105 transition-transform duration-300"
                    alt="latest discussion"
                  />
                </div>
              ) : (
                <div className="rounded-xl mb-4 w-full h-48 md:h-80 lg:h-100 xl:h-120 bg-gray-200"></div>
              )}
          
              {/* COMMENT BUTTON STYLE */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const slug = `${latest.id}-${slugify(latest.title)}`;
                  router.push(`/himtalks/mini-forum/${slug}#comment`);
                }}
              >
                <span className="font-poppins inline-flex items-center gap-1 md:gap-2 bg-darkSage text-white hover:bg-white hover:text-darkSage px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm border border-darkSage transition-all duration-500">
                  <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 4C6.232 4 3.5 6.419 3.5 9.5C3.5 10.722 3.935 11.847 4.662 12.755L4.018 15.118C3.99507 15.208 3.99746 15.3026 4.0249 15.3913C4.05233 15.48 4.10376 15.5595 4.17348 15.6208C4.24321 15.6822 4.32853 15.723 4.42003 15.739C4.51153 15.7549 4.60565 15.7452 4.692 15.711L7.492 14.545C7.6144 14.4939 7.7115 14.3964 7.76195 14.2737C7.8124 14.1511 7.81205 14.0134 7.761 13.891C7.70995 13.7686 7.61236 13.6715 7.48971 13.6211C7.36706 13.5706 7.2294 13.5709 7.107 13.622L5.251 14.395L5.696 12.765C5.71784 12.6849 5.71941 12.6007 5.70055 12.5198C5.6817 12.439 5.64302 12.3641 5.588 12.302C4.903 11.528 4.5 10.555 4.5 9.5C4.5 7.059 6.693 5 9.5 5C11.81 5 13.71 6.398 14.305 8.253C11.125 8.347 8.5 10.73 8.5 13.75C8.5 16.831 11.232 19.25 14.5 19.25C15.247 19.2509 15.9885 19.123 16.692 18.872L19.308 19.962C19.684 20.118 20.09 19.762 19.982 19.368L19.338 17.005C20.0866 16.085 20.4967 14.936 20.5 13.75C20.5 10.943 18.233 8.686 15.358 8.306C14.758 5.814 12.335 4 9.5 4ZM9.5 13.75C9.5 11.309 11.693 9.25 14.5 9.25C17.307 9.25 19.5 11.309 19.5 13.75C19.5 14.805 19.097 15.778 18.412 16.552C18.357 16.6141 18.3183 16.689 18.2994 16.7698C18.2806 16.8507 18.2822 16.9349 18.304 17.015L18.749 18.645L16.893 17.872C16.7725 17.8218 16.6372 17.8208 16.516 17.869C15.8738 18.1213 15.1899 18.2506 14.5 18.25C11.693 18.25 9.5 16.192 9.5 13.75Z" />
                  </svg>
                  <span>{latest.comment_count} Komentar</span>
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center w-full md:max-w-[90%] mx-auto">
            <div className="bg-white w-full rounded-2xl shadow-md p-10 border border-dashed border-gray-300 flex flex-col items-center text-center">
              <div className="text-5xl mb-4 text-gray-300">🍃</div>
              <h3 className="font-cormorant text-2xl font-bold text-darkSage italic">Hening Sekali...</h3>
              <p className="font-poppins text-sm text-gray-500 mt-2">Belum ada diskusi terbaru minggu ini. Yuk, pantau terus informasinya di</p>
              <div className="mt-8 select-none flex justify-center lg:justify-start">
              <Link
                href="https://www.instagram.com/himtalks_?igsh=MW5tYm1iNG9udDB3dA=="
                target="_blank"
                className="font-medium inline-flex items-center gap-2 border border-[#7A918D] text-[#7A918D] px-4 py-2 rounded-md hover:bg-[#7A918D] hover:text-white transition"
              >
                HIMTALKS

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
        )}
      </section>

      {/* RECENT */}
      <section className="mx-auto pb-24">
        <div className="flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold italic font-playfair text-darkSage">
            Recent Discussions
          </h2>
          {recent.length > 0 && (
            <Link href="/himtalks/mini-forum/browse-forum" className="flex items-center gap-1 sm:gap-2 text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl  text-darkSage font-cormorant font-extrabold tracking-tight w-fit hover:translate-x-1 sm:hover:translate-x-2 transition-all duration-500">
                <span>Continue Exploring</span>
                <svg className="w-3 h-3 sm:w-4.5 sm:h-4.5" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.99228 2.6244C5.89394 2.72492 5.83887 2.85995 5.83887 3.00057C5.83887 3.1412 5.89394 3.27623 5.99228 3.37674L11.4731 8.99999L5.99404 14.6232C5.89622 14.7237 5.84148 14.8583 5.84148 14.9985C5.84148 15.1387 5.89622 15.2734 5.99404 15.3738C6.04158 15.423 6.09852 15.4621 6.16149 15.4888C6.22445 15.5155 6.29215 15.5293 6.36054 15.5293C6.42894 15.5293 6.49663 15.5155 6.5596 15.4888C6.62256 15.4621 6.67951 15.423 6.72705 15.3738L12.556 9.39198C12.658 9.28699 12.715 9.14637 12.715 8.99999C12.715 8.8536 12.658 8.71298 12.556 8.608L6.72529 2.62616C6.67775 2.57698 6.62081 2.53788 6.55784 2.51117C6.49488 2.48447 6.42718 2.4707 6.35879 2.4707C6.29039 2.4707 6.2227 2.48447 6.15973 2.51117C6.09677 2.53788 6.03982 2.57698 5.99228 2.62616V2.6244Z" fill="#5F6F6C"/>
                </svg>
            </Link>
          )}
        </div>

        {!loading && recent.length > 0 ? (
          <div className="relative group lg:px-4 2xl:px-10 lg:pt-5">
            <button className="swiper-prev-custom absolute left-0 md:-left-10 2xl:left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 md:p-3 hover:bg-darkSage hover:text-white transition-all duration-300 disabled:opacity-0 hidden lg:flex">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="rotate-180">
                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <button className="swiper-next-custom absolute right-0 md:-right-10 2xl:right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 md:p-3 hover:bg-darkSage hover:text-white transition-all duration-300 disabled:opacity-0 hidden lg:flex">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="w-full 2xl:w-[93%] mx-auto py-2">  
              <Swiper
                modules={[Navigation]}
                navigation={{
                  nextEl: ".swiper-next-custom",
                  prevEl: ".swiper-prev-custom",
                }}
                spaceBetween={16}
                slidesPerView={1.1}
                grabCursor={true}
                breakpoints={{
                  480: { slidesPerView: 1.2, spaceBetween: 18 },
                  640: { slidesPerView: 1.4, spaceBetween: 20 },
                  768: { slidesPerView: 1.6, spaceBetween: 22 },
                  1024: { slidesPerView: 1.8, spaceBetween: 25 },
                  1280: { slidesPerView: 2.5, spaceBetween: 27 },
                }}
              >
                {recent.map((forum) => (
                  <SwiperSlide className="py-5" key={forum.id}>
                    <ForumCard forum={forum} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        ) : !loading && (
          // EMPTY STATE UNTUK RECENT (Tampilan Row)
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-dashed border-gray-300 rounded-2xl h-40 flex items-center justify-center text-gray-400 font-poppins text-xs italic">
                Segera hadir...
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}