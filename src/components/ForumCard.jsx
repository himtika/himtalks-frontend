"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

function slugify(text) {
  return text
    ?.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

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

export default function ForumCard({ forum }) {
  const router = useRouter();
  const slug = `${forum.id}-${slugify(forum.title)}`;

  const isClosed = (() => {
    const now = new Date();
    const created = new Date(forum.created_at);
    const diffDays = (now - created) / (1000 * 60 * 60 * 24);
    return diffDays > 7;
  })();

  return (
    <div
      onClick={() => router.push(`/himtalks/mini-forum/${slug}#comment`)}
      className="bg-white rounded-2xl shadow-lg p-3 md:p-5 relative border border-gray-100 hover:-translate-y-2 transition duration-300 cursor-pointer selection:bg-darkSage selection:text-white"
    >
      {/* CLOSED */}
      {isClosed && (
        <span className="absolute top-3 right-3 md:top-4 md:right-4 bg-[#C2A88D] text-white text-[9px] md:text-xs 2xl:text-sm px-2 md:px-3 py-0.5 md:py-1 rounded-full">
          Closed
        </span>
      )}

      {/* HEADER */}
      <div className="flex justify-between items-center mb-3 lg:mb-5 font-poppins">
        <div className="flex items-center gap-1 md:gap-2 text-[9px] md:text-xs 2xl:text-sm text-gray-500">
          <img src="/logo/himtalks-logo.webp" alt="Himtalks" className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 object-cover rounded-full" />
          <span className="text-black">Himtalks</span>
          <span>•</span>
          <span className="tracking-tighter">{timeAgo(forum.created_at)}</span>
        </div>

        {!isClosed && (
          <span className="text-[9px] md:text-xs 2xl:text-sm border px-2 md:px-3 py-0.5 md:py-1 rounded-full text-gray-500">
            19.00 - 21.00 WIB
          </span>
        )}
      </div>

      {/* TITLE */}
      <div className="h-10 md:h-12 lg:h-14 flex items-center mb-2 md:mb-3">
        <h2 className="text-base md:text-lg lg:text-xl xl:text-2xl font-cormorant font-semibold tracking-tighter text-justify text-darkSage leading-4.5 md:leading-6 lg:leading-7 line-clamp-2 overflow-hidden text-ellipsis wrap-break-word">{forum.title}</h2>
      </div>

      {/* DESC */}
      <p className="font-poppins text-[10px] md:text-xs lg:text-sm mb-3 md:mb-4 tracking-tighter text-gray-500 line-clamp-1">{forum.content}</p>

      {/* IMAGE */}
      {forum.image_url || forum.image ? (
        <div className="overflow-hidden rounded-xl mb-3 sm:mb-4">
          <Image
            src={forum.image_url || forum.image} // Backend field support
            width={500}
            height={300}
            className="w-full h-40 sm:h-48 md:h-56 xl:h-65 2xl:h-60 object-cover"
            alt=""
          />
        </div>
      ) : (
        <div className="rounded-xl mb-3 sm:mb-4 w-full h-40 sm:h-48 md:h-56 xl:h-65 2xl:h-60 bg-gray-200"></div>
      )}

      {/* COMMENT BUTTON */}
      <div>
        <button
          onClick={(e) => {
            e.stopPropagation(); // jangan trigger click parent
            router.push(`/himtalks/mini-forum/${slug}#comment`);
          }}
        >
          <span className="font-poppins inline-flex items-center gap-1 md:gap-2 bg-darkSage text-white hover:bg-white hover:text-darkSage px-3 py-1 md:px-4 md:py-1.5 xl:py-2 rounded-full text-[10px] md:text-xs lg:text-sm border border-darkSage transition-all duration-500">
            <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 fill-current" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M9.5 4C6.232 4 3.5 6.419 3.5 9.5C3.5 10.722 3.935 11.847 4.662 12.755L4.018 15.118C3.99507 15.208 3.99746 15.3026 4.0249 15.3913C4.05233 15.48 4.10376 15.5595 4.17348 15.6208C4.24321 15.6822 4.32853 15.723 4.42003 15.739C4.51153 15.7549 4.60565 15.7452 4.692 15.711L7.492 14.545C7.6144 14.4939 7.7115 14.3964 7.76195 14.2737C7.8124 14.1511 7.81205 14.0134 7.761 13.891C7.70995 13.7686 7.61236 13.6715 7.48971 13.6211C7.36706 13.5706 7.2294 13.5709 7.107 13.622L5.251 14.395L5.696 12.765C5.71784 12.6849 5.71941 12.6007 5.70055 12.5198C5.6817 12.439 5.64302 12.3641 5.588 12.302C4.903 11.528 4.5 10.555 4.5 9.5C4.5 7.059 6.693 5 9.5 5C11.81 5 13.71 6.398 14.305 8.253C11.125 8.347 8.5 10.73 8.5 13.75C8.5 16.831 11.232 19.25 14.5 19.25C15.247 19.2509 15.9885 19.123 16.692 18.872L19.308 19.962C19.684 20.118 20.09 19.762 19.982 19.368L19.338 17.005C20.0866 16.085 20.4967 14.936 20.5 13.75C20.5 10.943 18.233 8.686 15.358 8.306C14.758 5.814 12.335 4 9.5 4ZM9.5 13.75C9.5 11.309 11.693 9.25 14.5 9.25C17.307 9.25 19.5 11.309 19.5 13.75C19.5 14.805 19.097 15.778 18.412 16.552C18.357 16.6141 18.3183 16.689 18.2994 16.7698C18.2806 16.8507 18.2822 16.9349 18.304 17.015L18.749 18.645L16.893 17.872C16.7725 17.8218 16.6372 17.8208 16.516 17.869C15.8738 18.1213 15.1899 18.2506 14.5 18.25C11.693 18.25 9.5 16.192 9.5 13.75Z"/>
            </svg>
            <span>{forum.comment_count} Komentar</span>
          </span>
        </button>
      </div>
    </div>
  );
}


