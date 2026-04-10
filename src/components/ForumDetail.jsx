"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import clsx from "clsx";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

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

export default function ForumDetail({ forumId }) {
const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [forum, setForum] = useState(null);
  const [comments, setComments] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [isExpanded, setIsExpanded] = useState(false); // untuk state lihat selengkapnya
  const [isExpanded2, setIsExpanded2] = useState(false); // untuk state lihat selengkapnya

  const [username, setUsername] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [avatar, setAvatar] = useState(null);
  const [tempAvatar, setTempAvatar] = useState(null);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const [showScrollTop, setShowScrollTop] = useState(false);
  const commentSortOptions = [
    { id: 1, name: 'Terbaru', value: 'newest' },
    { id: 2, name: 'Terlama', value: 'oldest' },
  ];

  const [commentSort, setCommentSort] = useState(commentSortOptions[0]); 

  // LOGIC SORTING KOMENTAR
  const sortedComments = [...comments].sort((a, b) => {
    // Asumsi: a.id atau a.time bisa dikonversi ke date. 
    // Karena di dummy data kamu pake "1 jam lalu", lebih aman urutkan berdasarkan ID (karena ID i++ di loop)
    if (commentSort.value === "newest") {
      return a.id - b.id; // ID lebih kecil = lebih lama
    } else {
      return b.id - a.id; // ID lebih besar = lebih baru
    }
  });

  const avatarList = Array.from(
    { length: 14 },
    (_, i) => `/avatar/${i + 1}.png`
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const el = document.getElementById("comment");
      if (window.location.hash === "#comment" && el) {
        el.scrollIntoView({ behavior: "smooth" });
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

    useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    async function fetchData() {
      if (!forumId) return;
      setLoading(true);
      try {
        const resForum = await fetch(`${API_BASE}/forums/${forumId}`);
        if (resForum.ok) {
          const data = await resForum.json();
          // Adjust image field name -> API has image_url
          setForum({ ...data, image: data.image_url });
        }

        const resComments = await fetch(`${API_BASE}/forums/${forumId}/comments`);
        if (resComments.ok) {
          const dataComments = await resComments.json();
          // Map API to state structure
          setComments(
            dataComments.map((c) => ({
              id: c.id,
              user: c.name || "Anonymous",
              time: timeAgo(c.created_at),
              text: c.content,
              avatar: c.avatar_id && c.avatar_id.startsWith("/avatar/") ? c.avatar_id : "/miniforum/avatar-default.png", // fallback
              rawTime: new Date(c.created_at).getTime()
            }))
          );
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [forumId]);

  const handleStartTyping = () => {
    if (!avatar) return alert("Pilih avatar dulu ya!");
    if (username.trim() === "") return alert("Masukkan username dulu!");
    setIsTyping(true);
  };

  const handleSendComment = async () => {
    if (!commentText.trim()) return;
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE}/forums/${forumId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: username || "Anonymous",
          avatar_id: avatar, // we just send the path e.g., /avatar/1.png
          content: commentText,
        }),
      });

      if (res.ok) {
        const c = await res.json();
        const newComment = {
          id: c.id,
          user: c.name || "Anonymous",
          avatar: c.avatar_id,
          time: "Baru saja",
          rawTime: Date.now(),
          text: c.content,
        };

        setComments([newComment, ...comments]);
        setCommentText("");
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Gagal mengirim komentar!");
      }
    } catch (err) {
      console.error(err);
      alert("Gagal mengirim komentar!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!forum) return null;

  const previewText = forum.content?.substring(0, 150); // Ambil 150 karakter pertama
  const isLongText = forum.content?.length > 150; // Cek apakah teks emang panjang bange

  const contentToUse = forum.ringkasan || forum.content;
  const previewRingkasan = contentToUse?.substring(0, 120); 
  const isRingkasanLong = contentToUse?.length > 120;

  return (
    <section className="bg-primaryBG mt-9 md:mt-12 lg:mt-16 min-h-screen px-6 sm:px-16 lg:px-20 xl:px-23 2xl:px-28 py-16">
      <Link href="/himtalks/mini-forum" className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 text-darkSage font-cormorant font-extrabold tracking-tight w-fit hover:-translate-x-2 transition-all duration-500">
        <svg className="w-2 h-4 md:w-3 md:h-6" width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M9.99965 19.438L8.95465 20.5L1.28865 12.71C1.10415 12.5197 1.00098 12.2651 1.00098 12C1.00098 11.7349 1.10415 11.4803 1.28865 11.29L8.95465 3.5L9.99965 4.563L2.68165 12L9.99965 19.438Z" fill="#5F6F6C"/>
        </svg>
        <span>Return to discussion list</span>
      </Link>

      <div className="grid lg:grid-cols-5 2xl:grid-cols-4 gap-6 md:gap-6 2xl:gap-8 font-poppins">
        {/* LEFT */}
        <div className="lg:col-span-3 2xl:col-span-3 space-y-4 md:space-y-6">
          {/* POST */}
          <div className="bg-white p-4 sm:p-5 md:px-7 md:py-6 rounded-2xl xl:rounded-3xl shadow-md">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-1 md:gap-2 text-[10px] md:text-xs lg:text-sm text-gray-400 font-poppins">
                <img src="/logo/himtalks-logo.webp" alt="Himtalks" className="w-4 h-4 md:w-5 md:h-5 lg:w-8 lg:h-8 object-cover rounded-full" />
                <span className="text-black">Himtalks</span>
                <span>•</span>
                <span className="tracking-tighter">{timeAgo(forum.created_at)}</span>
              </div>

              <div className="text-[9px] leading-4 md:text-xs 2xl:text-sm border px-2 md:px-3 py-0.5 md:py-1 rounded-full text-gray-500">
                19:00 - 21:00 WIB
              </div>
            </div>

            <h1 className="text-lg lg:text-xl xl:text-2xl font-cormorant font-semibold tracking-tighter text-justify text-darkSage leading-4.5 md:leading-6 2xl:leading-7 mb-4 md:mb-3 wrap-break-word break-all">
              {forum.title}
            </h1>

            <p className="font-poppins text-[11px] md:text-xs xl:text-sm mb-3 md:mb-4 text-gray-600 wrap-break-word break-all">
              {/* Tampilkan teks penuh kalau isExpanded true, kalau false tampilkan potongan teks */}
              {isExpanded ? forum.content : previewText}

              {/* Tombol cuma muncul kalau teksnya emang panjang */}
              {isLongText && (
                <span 
                  onClick={() => setIsExpanded(!isExpanded)} 
                  className="text-[#5E6F64] font-semibold cursor-pointer ml-1 hover:underline"
                >
                  {isExpanded ? " Tampilkan Lebih Sedikit" : "... Lihat Selengkapnya"}
                </span>
              )}
            </p>
            <div className="relative group overflow-hidden rounded-xl md:rounded-3xl mb-4 cursor-pointer" 
              onClick={() => setIsPopupOpen(true)}>
              <div className="absolute top-3 right-3 bg-black/50 p-2 rounded-full md:hidden z-20">
                <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8.5V4m0 0h4.5M4 4l5.5 5.5m10.5-1V4m0 0h-4.5M20 4l-5.5 5.5M4 15.5V20m0 0h4.5M4 20l5.5-5.5m10.5 1V20m0 0h-4.5m4.5 0-5.5-5.5"/></svg>
              </div>

              {/* OVERLAY "Klik untuk selengkapnya" */}
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                <p className="text-white font-jakarta italic text-[10px] sm:text-xs md:text-sm">
                  Klik untuk selengkapnya
                </p>
              </div>

              <Image
                src={forum.image}
                width={600}
                height={300}
                className="w-full h-40 sm:h-48 md:h-56 lg:h-80 xl:h-100 2xl:h-120 object-cover transform group-hover:scale-105 transition-transform duration-700"
                alt={forum.title}
              />
            </div>
            <button
            onClick={() => {
              const el = document.getElementById("comment");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });}}}
            >
                <span className="font-poppins inline-flex items-center gap-1 md:gap-2 bg-darkSage text-white hover:bg-white hover:text-darkSage px-3 py-1 md:px-4 md:py-1.5 xl:py-2 rounded-full text-[10px] md:text-xs lg:text-sm border border-darkSage transition-all duration-500">
                <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 fill-current" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.5 4C6.232 4 3.5 6.419 3.5 9.5C3.5 10.722 3.935 11.847 4.662 12.755L4.018 15.118C3.99507 15.208 3.99746 15.3026 4.0249 15.3913C4.05233 15.48 4.10376 15.5595 4.17348 15.6208C4.24321 15.6822 4.32853 15.723 4.42003 15.739C4.51153 15.7549 4.60565 15.7452 4.692 15.711L7.492 14.545C7.6144 14.4939 7.7115 14.3964 7.76195 14.2737C7.8124 14.1511 7.81205 14.0134 7.761 13.891C7.70995 13.7686 7.61236 13.6715 7.48971 13.6211C7.36706 13.5706 7.2294 13.5709 7.107 13.622L5.251 14.395L5.696 12.765C5.71784 12.6849 5.71941 12.6007 5.70055 12.5198C5.6817 12.439 5.64302 12.3641 5.588 12.302C4.903 11.528 4.5 10.555 4.5 9.5C4.5 7.059 6.693 5 9.5 5C11.81 5 13.71 6.398 14.305 8.253C11.125 8.347 8.5 10.73 8.5 13.75C8.5 16.831 11.232 19.25 14.5 19.25C15.247 19.2509 15.9885 19.123 16.692 18.872L19.308 19.962C19.684 20.118 20.09 19.762 19.982 19.368L19.338 17.005C20.0866 16.085 20.4967 14.936 20.5 13.75C20.5 10.943 18.233 8.686 15.358 8.306C14.758 5.814 12.335 4 9.5 4ZM9.5 13.75C9.5 11.309 11.693 9.25 14.5 9.25C17.307 9.25 19.5 11.309 19.5 13.75C19.5 14.805 19.097 15.778 18.412 16.552C18.357 16.6141 18.3183 16.689 18.2994 16.7698C18.2806 16.8507 18.2822 16.9349 18.304 17.015L18.749 18.645L16.893 17.872C16.7725 17.8218 16.6372 17.8208 16.516 17.869C15.8738 18.1213 15.1899 18.2506 14.5 18.25C11.693 18.25 9.5 16.192 9.5 13.75Z" />
                </svg>
                <span>{comments.length} Komentar</span>
              </span>
            </button>
          </div>

          {/* RINGKASAN */}
          {(forum.ringkasan || forum.content) && (
          <div className=" lg:hidden bg-white p-4 md:p-5 rounded-2xl shadow">
            <div className="flex items-center gap-2 mb-2.5 md:mb-4">
              <Image
                src="/miniforum/ringkasan-diskusi.svg"
                width={20}
                height={20}
                className="w-5 h-5"
                alt=""
              />
              <h3 className="text-darkSage text-lg md:text-xl font-cormorant font-bold tracking-tighter">
                Ringkasan Diskusi
              </h3>
            </div>

            <p className="md:text-left text-[11px] md:text-xs lg:text-sm text-gray-600 wrap-break-word break-all">
              {/* Tampilkan teks penuh kalau isExpanded true, kalau false tampilkan potongan teks */}
              {isExpanded2 ? (forum.ringkasan || forum.content) : previewRingkasan}

              {/* Tombol cuma muncul kalau teksnya emang panjang */}
              {isRingkasanLong && (
                <span 
                  onClick={() => setIsExpanded2(!isExpanded2)} 
                  className="text-[#5E6F64] font-semibold cursor-pointer ml-1 hover:underline"
                >
                  {isExpanded2 ? "... Lihat lebih sedikit" : "... Lihat Selengkapnya"}
                </span>
              )}
            </p>
          </div>
          )}

          <div className="lg:hidden bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
              {/* IMAGE */}
              <Image
                src="/miniforum/panduan-diskusi-bg.webp"
                width={400}
                height={200}
                className="w-full h-40 2xl:h-50 object-cover"
                alt=""
              />

              {/* HEADER */}
              <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  <Image
                    src="/miniforum/panduan-diskusi.svg"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                    alt=""
                  />
                  <h3 className="text-darkSage text-xl font-cormorant font-bold tracking-tighter">
                    Panduan Diskusi
                  </h3>
                </div>

                {open ? (
                  <span className="text-gray-500">▲</span>
                ) : (
                  <span className="text-gray-500">▼</span>
                )}
              </button>

              {/* CONTENT */}
              {open && (
                <div className="font-poppins px-4 pt-3 pb-4 lg:px-5 lg:py-4 text-xs lg:text-sm text-gray-600">
                  <ul className="space-y-2 list-disc pl-5">
                    <li>
                      <span className="font-semibold">
                        Saling Menghargai:
                      </span>{" "}
                      Setiap suara berhak didengar dan dipahami.
                    </li>

                    <li>
                      <span className="font-semibold">
                        Fokus Tema:
                      </span>{" "}
                      Pastikan pendapatmu sesuai dengan tema mingguan.
                    </li>

                    <li>
                      <span className="font-semibold">
                        No Hate Speech:
                      </span>{" "}
                      Jaga ruang diskusi tetap nyaman dan aman.
                    </li>

                    <li>
                      <span className="font-semibold">
                        Berkomentar yang Sopan:
                      </span>{" "}
                      Tidak menggunakan kata yang tidak senonoh.
                    </li>

                    <li>
                      Namamu anonim, jadi tidak wajib memasukkan nama asli.
                    </li>

                    <li>
                      Bersifat statis, kamu akan menginput username lagi jika kembali.
                    </li>
                  </ul>
                </div>
              )}
          </div>

          {/* INPUT */}
          <div id="comment" className="bg-white px-4 py-3 md:p-5 rounded-2xl xl:rounded-3xl shadow-md flex flex-col gap-3 md:gap-4">

            {/* HEADER */}
            <div className="flex justify-between items-center">
              <p className="text-darkSage font-semibold font-cormorant tracking-tighter text-lg sm:text-xl md:text-2xl">
                Tuangkan Pikiranmu
              </p>

              {/* DOTS */}
              {/* <div className="flex gap-2">
                <div className={`w-4 h-4 rounded-full transition-colors duration-500 
                  ${!isTyping ? "bg-darkSage" : "bg-gray-300"}`}>
                </div>

                <div className={`w-4 h-4 rounded-full transition-colors duration-500 
                  ${isTyping ? "bg-darkSage" : "bg-gray-300"}`}>
                </div>
              </div> */} 
              {/* KODE DI ATAS BUAT FITUR 2 DOTS KALO GAK MAU PGN BISA BACK KE SESI 1 USERNAME */}
              <div className="flex gap-2 items-center">
                {/* DOT 1: Username & Avatar */}
                <button
                  type="button"
                  // Fitur BACK: Cuma jalan kalau lagi di step 2 (isTyping === true)
                  onClick={() => isTyping && setIsTyping(false)} 
                  className={clsx(
                    "w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300",
                    // Warna Ijo kalau di Step 1, atau kalau lagi di Step 2 tapi di-hover (biar tahu bisa diklik balik)
                    !isTyping ? "bg-darkSage scale-125" : "bg-gray-300 hover:bg-darkSage/50 cursor-pointer"
                  )}
                  title={isTyping ? "Kembali ke Username" : "Langkah 1: Username"}
                />

                {/* DOT 2: Isi Pendapat */}
                <div
                  className={clsx(
                    "w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300",
                    // Warna Ijo cuma pas di Step 2, sisanya Abu-abu dan GAK BISA diklik
                    isTyping ? "bg-darkSage scale-125" : "bg-gray-300 cursor-default"
                  )}
                />
              </div>
            </div>

            {!isTyping ? (
              <div className="flex items-center gap-3 font-poppins">

                {/* AVATAR */}
                <div
                  onClick={() => setShowAvatarModal(true)}
                  className="relative w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-300 cursor-pointer"
                >
                  {avatar && (
                    <Image src={avatar} width={40} height={40} alt="" />
                  )}

                  {/* ICON PENSIL */}
                  <div className="absolute -bottom-1 -right-1 md:-bottom-0.5 md:-right-0.5 w-4 h-4 flex items-center justify-center text-[10px]">
                    <Image
                      src="/miniforum/pencil.svg"
                      width={16}
                      height={16}
                      className="w-3 h-3 md:w-4 md:h-4"
                      alt=""
                    />
                  </div>
                </div>

                {/* INPUT */}
                <input
                  placeholder="Masukkan Username (Anonim)..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="flex-1 border-b pb-1 outline-none text-[11px] sm:text-xs md:text-sm placeholder:text-gray-400"
                />

                {/* BUTTON */}
                <button
                  onClick={handleStartTyping}
                  className={`w-10 h-7 md:w-15 md:h-10 rounded-full flex items-center justify-center transition
                    ${
                      username
                        ? "bg-darkSage hover:bg-primary text-white"
                        : "bg-gray-200 hover:bg-softLeaf text-gray-500 hover:text-white"
                    }`}
                >
                  <svg className="fill-current w-4 h-4 md:w-6 md:h-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.22 19.0298C13.0795 18.8892 13.0007 18.6985 13.0007 18.4998C13.0007 18.301 13.0795 18.1104 13.22 17.9698L18.19 12.9998H3.75C3.55109 12.9998 3.36032 12.9208 3.21967 12.7801C3.07902 12.6395 3 12.4487 3 12.2498C3 12.0509 3.07902 11.8601 3.21967 11.7195C3.36032 11.5788 3.55109 11.4998 3.75 11.4998H18.19L13.22 6.52978C13.1213 6.43811 13.0491 6.32151 13.0111 6.19226C12.9731 6.06301 12.9706 5.9259 13.004 5.79538C13.0374 5.66485 13.1053 5.54575 13.2007 5.45061C13.2961 5.35547 13.4154 5.28782 13.546 5.25478C13.6764 5.22147 13.8133 5.22386 13.9425 5.26169C14.0716 5.29952 14.1882 5.37139 14.28 5.46978L20.53 11.7198C20.6705 11.8604 20.7493 12.051 20.7493 12.2498C20.7493 12.4485 20.6705 12.6392 20.53 12.7798L14.28 19.0298C14.1394 19.1702 13.9488 19.2491 13.75 19.2491C13.5512 19.2491 13.3606 19.1702 13.22 19.0298Z" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">

                {/* AVATAR */}
                <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-300 overflow-hidden">
                  {avatar && (
                    <Image src={avatar} width={40} height={40} alt="" />
                  )}
                </div>

                {/* TEXTAREA STYLE INLINE */}
                <input
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Masukkan Pendapatmu..."
                  className="flex-1 border-b pb-1 outline-none text-[11px] sm:text-xs md:text-sm"
                />

                {/* SEND BUTTON */}
                <button
                  disabled={!commentText.trim()}
                  onClick={handleSendComment}
                  className={`w-10 h-7 md:w-15 md:h-10 rounded-full flex items-center justify-center transition
                    ${
                      commentText
                        ? "bg-darkSage hover:bg-primary text-white"
                        : "bg-gray-200 hover:bg-softLeaf text-darkSage hover:text-white"
                    }`}
                >
                    <svg className="w-4 h-4 md:w-6 md:h-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.9999 10.0002L10.9999 13.0002M20.2879 3.03122C20.3828 2.99847 20.4849 2.99309 20.5827 3.01567C20.6806 3.03825 20.77 3.0879 20.841 3.15893C20.9119 3.22996 20.9614 3.31952 20.9838 3.41736C21.0063 3.5152 21.0007 3.61738 20.9679 3.71222L15.0439 20.6422C15.0084 20.7434 14.9434 20.8316 14.8572 20.8954C14.771 20.9592 14.6676 20.9956 14.5605 20.9999C14.4533 21.0042 14.3473 20.9763 14.2563 20.9196C14.1652 20.863 14.0933 20.7802 14.0499 20.6822L10.8309 13.4402C10.7767 13.3198 10.6803 13.2234 10.5599 13.1692L3.31786 9.94922C3.22016 9.9056 3.13778 9.83368 3.08137 9.74275C3.02495 9.65183 2.9971 9.54608 3.00141 9.43917C3.00572 9.33225 3.04198 9.22909 3.10553 9.14299C3.16907 9.0569 3.25697 8.99184 3.35786 8.95622L20.2879 3.03122Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                </button>
              </div>
            )}
          </div>

          {/* COMMENTS */}
          <div className="bg-white px-4 pt-3 pb-4 md:p-5 rounded-2xl xl:rounded-3xl shadow-md">
            <div className="flex justify-between items-center mb-5 md:mb-8">
              <h3 className="text-darkSage font-semibold font-cormorant tracking-tighter text-lg sm:text-xl md:text-2xl">
                Pikiran yang Dibagikan
              </h3>

              {/* DROPDOWN SORT KOMENTAR */}
              {comments.length > 0 && (
                <Listbox value={commentSort} onChange={setCommentSort}>
                  {({ open }) => (
                    <div className="relative w-22 sm:w-28 md:w-36"> 
                      <ListboxButton
                        className={clsx(
                          "relative w-full p-2 bg-white border border-gray-200 text-darkSage rounded-lg text-[10px] text-xs md:text-sm text-left focus:outline-none transition-all",
                          open ? "ring-2 ring-darkSage/50" : ""
                        )}
                      >
                        <span className="block truncate">{commentSort.name}</span>
                        <ChevronDownIcon
                          className={clsx(
                            "pointer-events-none absolute top-1.5 right-1.5 md:top-2.5 md:right-2 size-4 text-gray-500 transition-transform duration-300",
                            { "rotate-180": open }
                          )}
                        />
                      </ListboxButton>

                      <AnimatePresence>
                        {open && (
                          <ListboxOptions
                            static
                            as={motion.div}
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="absolute z-50 w-full mt-1 rounded-xl bg-white shadow-xl border border-gray-100 p-1 focus:outline-none"
                          >
                            {commentSortOptions.map((option) => (
                              <ListboxOption
                                key={option.id}
                                value={option}
                                className="group flex cursor-pointer items-center gap-2 rounded-lg py-2 px-2 select-none hover:bg-gray-50"
                              >
                                <CheckIcon className="invisible size-3 text-primary group-data-selected:visible" />
                                <div className="text-[10px] text-xs md:text-sm text-darkSage group-data-selected:font-bold">
                                  {option.name}
                                </div>
                              </ListboxOption>
                            ))}
                          </ListboxOptions>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </Listbox>
              )}
            </div>

            {/* Kalau Tidak Ada Komentar */}
            {comments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="text-4xl mb-3">🐦</div>

                <p className="text-[#5E6F64] font-serif text-lg">
                  Belum ada tanggapan
                </p>

                <p className="text-xs md:text-sm text-gray-400 mt-1">
                  Jadilah yang pertama membagikan pikiranmu.
                </p>
              </div>
            ) : (
              <>
                {sortedComments.slice(0, visibleCount).map((c) => (
                  <div key={c.id} className="flex items-start gap-3 mb-3 md:mb-4 pb-4.5 md:pb-4 border-b border-primary/50">
                    <Image
                      src={c.avatar}
                      width={32}
                      height={32}
                      className="rounded-full w-7 h-7 md:w-8 md:h-8"
                      alt=""
                    />

                    <div className="flex flex-col gap-1 md:gap-2">
                      <div className="flex gap-1 md:gap-2 text-[10px] sm:text-xs md:text-sm text-gray-500">
                        <span className="font-medium text-black">
                          {c.user}
                        </span>
                        <span>•</span>
                        <span>{c.time}</span>
                      </div>

                      <p className="text-xs md:text-sm text-gray-600 wrap-break-word break-all">
                        {c.text}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="mt-6">
                  {/* TOMBOL LIHAT LEBIH BANYAK */}
                  {visibleCount < comments.length ? (
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 10)}
                      className="w-full bg-primary hover:bg-darkSage text-white p-2 rounded-xl text-xs md:text-sm transition-all duration-300 shadow-sm"
                    >
                      Lihat lebih banyak ({comments.length - visibleCount} lagi)
                    </button>
                  ) : (
                    /* TOMBOL LIHAT LEBIH SEDIKIT */
                    comments.length > 10 && (
                      <button
                        onClick={() => {
                          setVisibleCount(10); // Reset balik ke 10
                          // Opsional: Scroll balik ke ID comment biar user gak bingung
                          document.getElementById("comment")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="w-full border border-gray-300 text-gray-500 hover:bg-primary hover:text-white p-2 rounded-xl text-xs md:text-sm transition-all duration-300"
                      >
                        Tampilkan Lebih Sedikit
                      </button>
                    )
                  )}
                </div>

                {/* KODINGAN KALO GAK MAU ADA NAMPILIN LEBIH SEDIKIT KOMEN */}
                {/* {visibleCount < comments.length && (
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 10)}
                    className="w-full bg-primary text-white p-2 rounded-xl text-sm"
                  >
                    Lihat lebih banyak
                  </button>
                )} */}
              </>
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="lg:col-span-2 2xl:col-span-1 space-y-6 sticky top-26 self-start">
          {/* RINGKASAN */}
          {(forum.ringkasan || forum.content) && (
          <div className=" hidden lg:block bg-white p-4 md:p-5 rounded-2xl shadow">
            <div className="flex items-center gap-2 mb-2.5 md:mb-4">
              <Image
                src="/miniforum/ringkasan-diskusi.svg"
                width={20}
                height={20}
                className="w-5 h-5"
                alt=""
              />
              <h3 className="text-darkSage text-lg md:text-xl font-cormorant font-bold tracking-tighter">
                Ringkasan Diskusi
              </h3>
            </div>

            <p className="md:text-left text-xs md:text-sm text-gray-600 wrap-break-word break-all">
              {/* Tampilkan teks penuh kalau isExpanded true, kalau false tampilkan potongan teks */}
              {isExpanded2 ? (forum.ringkasan || forum.content) : previewRingkasan}

              {/* Tombol cuma muncul kalau teksnya emang panjang */}
              {isRingkasanLong && (
                <span 
                  onClick={() => setIsExpanded2(!isExpanded2)} 
                  className="text-[#5E6F64] font-semibold cursor-pointer ml-1 hover:underline"
                >
                  {isExpanded2 ? "... Lihat lebih sedikit" : "... Lihat Selengkapnya"}
                </span>
              )}
            </p>
          </div>
          )}

          <div className="hidden lg:block bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
              {/* IMAGE */}
              <Image
                src="/miniforum/panduan-diskusi-bg.webp"
                width={400}
                height={200}
                className="w-full h-40 2xl:h-50 object-cover"
                alt=""
              />

              {/* HEADER */}
              <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  <Image
                    src="/miniforum/panduan-diskusi.svg"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                    alt=""
                  />
                  <h3 className="text-darkSage text-xl font-cormorant font-bold tracking-tighter">
                    Panduan Diskusi
                  </h3>
                </div>

                {open ? (
                  <span className="text-gray-500">▲</span>
                ) : (
                  <span className="text-gray-500">▼</span>
                )}
              </button>

              {/* CONTENT */}
              {open && (
                <div className="font-poppins px-4 py-3 md:px-5 md:py-4 text-xs md:text-sm text-gray-600">
                  <ul className="space-y-2 list-disc pl-5">
                    <li>
                      <span className="font-semibold">
                        Saling Menghargai:
                      </span>{" "}
                      Setiap suara berhak didengar dan dipahami.
                    </li>

                    <li>
                      <span className="font-semibold">
                        Fokus Tema:
                      </span>{" "}
                      Pastikan pendapatmu sesuai dengan tema mingguan.
                    </li>

                    <li>
                      <span className="font-semibold">
                        No Hate Speech:
                      </span>{" "}
                      Jaga ruang diskusi tetap nyaman dan aman.
                    </li>

                    <li>
                      <span className="font-semibold">
                        Berkomentar yang Sopan:
                      </span>{" "}
                      Tidak menggunakan kata yang tidak senonoh.
                    </li>

                    <li>
                      Namamu anonim, jadi tidak wajib memasukkan nama asli.
                    </li>

                    <li>
                      Bersifat statis, kamu akan menginput username lagi jika kembali.
                    </li>
                  </ul>
                </div>
              )}
          </div>

          {/* CARA LAIN */}
          <div className="pt-2.5 md:pt-3">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/miniforum/pesawat-kertas.svg"
                width={20}
                height={20}
                className="w-5 h-5"
                alt=""
              />
              <h3 className="text-darkSage text-xl font-serif">
                Cara Lain untuk Bersuara
              </h3>
            </div>

            <div className="space-y-3">
              {/* SONGFESS */}
              <Link href="/himtalks/songfess">
                <div className="mb-4 bg-white rounded-3xl shadow-lg flex items-center gap-4 cursor-pointer hover:-translate-y-1 active:scale-95 transition ">
                  {/* CONTAINER FOTO */}
                  <div className="relative shrink-0 overflow-hidden rounded-l-3xl rounded-r-none">
                    {/* Gambar Burung & Bunga yang sudah disatukan di Figma */}
                    <Image
                      src="/miniforum/songfess-bg.webp"
                      width={140} // Sesuaikan lebarnya agar proporsional
                      height={140} // Sesuaikan tingginya
                      alt="Songfess"
                      className="object-cover w-25 lg:w-30 lg:h-30 xl:w-35 xl:h-35 h-full"
                    />
                  </div>

                  {/* CONTAINER TEKS */}
                  <div className="flex-1 pb-2 pr-2"> {/* pb-2 biar teks agak naik dikit sejajar bunga */}
                    <h3 className="font-playfair italic font-medium text-darkSage text-xl xl:text-3xl mb-2 md:mb-3">
                      Songfess
                    </h3>
                    <p className="font-poppins text-xs xl:text-sm text-gray-500 max-w-45">
                      Ekspresikan perasaanmu melalui lagu!
                    </p>
                  </div>
                </div>
              </Link>

              {/* SONGFESS */}
              <Link href="/himtalks/chat-anonym">
                <div className="bg-white rounded-3xl shadow-lg flex items-center gap-4 cursor-pointer hover:translate-y-1 active:scale-95 transition ">
                  {/* CONTAINER FOTO */}
                  <div className="relative shrink-0 overflow-hidden rounded-l-3xl rounded-r-none">
                    <Image
                      src="/miniforum/chat-anonym.webp"
                      width={140}
                      height={140}
                      alt="Chat Anonym"
                      className="object-cover w-25 lg:w-30 lg:h-30 xl:w-35 xl:h-35 h-full"
                    />
                  </div>

                  {/* CONTAINER TEKS */}
                  <div className="flex-1 pb-2 pr-2"> {/* pb-2 biar teks agak naik dikit sejajar bunga */}
                    <h3 className="font-playfair italic font-medium text-darkSage text-xl xl:text-3xl mb-2 md:mb-3">
                      Chat Anonym
                    </h3>
                    <p className="font-poppins text-xs xl:text-sm text-gray-500 max-w-45">
                      Kirimkan pesanmu tanpa mengungkap identitas!
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* MODAL */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 font-poppins">
          <div className="bg-[#EDEBE7] w-125 max-w-[90%] p-6 rounded-3xl">

            <div className="flex justify-between mb-4 md:mb-6">
              <h2 className="text-darkSage text-lg font-serif">
                Pilih Foto Profil Kamu
              </h2>
              <button onClick={() => setShowAvatarModal(false)}>✕</button>
            </div>

            <div className="grid grid-cols-7 gap-4 mb-6">
              {avatarList.map((item) => (
                <div
                  key={item}
                  onClick={() => setTempAvatar(item)}
                  className={`w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden cursor-pointer
                  ${tempAvatar === item ? "ring-2 ring-[#5E6F64]" : ""}`}
                >
                  <Image src={item} width={56} height={56} alt="" />
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowAvatarModal(false)}
                className="px-4 py-1.5 md:px-5 md:py-2 border text-sm md:text-base rounded-full"
              >
                Discard
              </button>

              <button
                onClick={() => {
                  setAvatar(tempAvatar);
                  setShowAvatarModal(false);
                }}
                className="px-4 py-1.5 md:px-5 md:py-2 bg-[#5E6F64] text-white text-sm md:text-base rounded-full"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-22 right-5 md:right-9 bg-darkSage hover:bg-white text-white hover:text-darkSage w-11 h-11 rounded-full flex items-center justify-center shadow-xl transition-all duration-500"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 15L12 8L19 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

        </button>
      )}

      <AnimatePresence>
        {isPopupOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-4 md:p-10"
            onClick={() => setIsPopupOpen(false)}
          >
            {/* Tombol Close */}
            <button 
              className="absolute top-5 right-5 md:top-10 md:right-10 text-white hover:text-selectionBlue transition-colors z-110 cursor-pointer"
              onClick={() => setIsPopupOpen(false)}
            >
              <svg className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 56.326 56.326" fill="currentColor">
                <path d="M477.613,422.087l25.6-25.6a1.5,1.5,0,0,0-2.122-2.121l-25.6,25.6-25.6-25.6a1.5,1.5,0,1,0-2.121,2.121l25.6,25.6-25.6,25.6a1.5,1.5,0,0,0,2.121,2.122l25.6-25.6,25.6,25.6a1.5,1.5,0,0,0,2.122-2.122Z" transform="translate(-447.328 -393.924)"/>
              </svg>
            </button>

            {/* Gambar Besar */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-[85vw] h-[75vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={forum.image} 
                alt="Full Preview"
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}