"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useState, useRef, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  PlayIcon,
  PauseIcon,
} from "@heroicons/react/20/solid";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function SongfessForm() {
  // Tambahan Raika
  const router = useRouter();
  const [showOverlay, setShowOverlay] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(30); // default 30 detik
  const [audio, setAudio] = useState(null);
  const [errors, setErrors] = useState({
    startTime: "",
    endTime: "",
  });

  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  // Data lagu hasil pencarian
  const [songs, setSongs] = useState([]);
  // Data form Songfess
  const [formData, setFormData] = useState({
    name: "",
    recipient: "",
    message: "",
    startTime: "",
    endTime: "" ,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const audioRef = useRef(null);
  const textareaRef = useRef(null);
  const [message, setMessage] = useState("");

  const [isClicked, setIsClicked] = useState(false);

  // Raika, untuk menambahkan default song pada informasi lagu jika lagu belum dipilih
  const defaultSong = {
    name: "No song selected",
    artists: ["Unknown Artist"],
    duration_ms: 0,
    album: {
      images: [{ url: "/songfess/image-default-spotify.png" }],
    },
  };
  // Jika belum memilih lagu, pakai defaultSong di bawah dropdown
  const songToShow = selected || defaultSong;

  // untuk menampilkan data waktu durasi lagunya
  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, "0")}`;
  };

  // Pencarian ke API Spotify
  async function searchSongs() {
    if (!query.trim()) return;
    try {
      const response = await fetch(
        `${API_BASE}/api/spotify/search?q=${encodeURIComponent(query)}`,
      );
      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  }

  // Jalankan pencarian setiap kali query berubah
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      searchSongs();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [query]);


  // (Bang Raika) mengontrol pause/play
  const handlePlayPause = () => {
    if (!selected?.preview_url) {
      alert("Lagu ini tidak punya preview 😢");
      return;
    }

    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => alert("Gagal play audio"));
    }
  };

  // (Bang Raika) menjalankan lagu saat lagu dipilih
  useEffect(() => {
    if (!selected || !audioRef.current) return;

    if (selected.preview_url) {
      audioRef.current.pause();
      audioRef.current.src = selected.preview_url;
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.5;

      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
    }

    setIsPlaying(false);
  }, [selected]);

  // (Raika) Untuk pengaturan hiddenkan icon play ketika lagu menyala
  // useEffect(() => {
  //     if (isPlaying && selected) {
  //         setShowOverlay(true);
  //         const timer = setTimeout(() => {
  //             setShowOverlay(false);
  //         }, 2000);

  //         return () => clearTimeout(timer); // Hapus timer saat berubah state
  //     } else {
  //         setShowOverlay(true); // Tetap tampil saat pause atau belum ada lagu
  //     }
  // }, [isPlaying, selected]);
  useEffect(() => {
    if (isPlaying && selected) {
      setShowOverlay(true); // Munculkan overlay saat play
      const timer = setTimeout(() => {
        setShowOverlay(false); // Hilangkan overlay setelah 3 detik
      }, 3000);

      return () => clearTimeout(timer); // Hapus timer saat state berubah
    } else {
      setShowOverlay(true); // Saat pause atau belum ada lagu, overlay tetap muncul
    }
  }, [isPlaying, selected]);

  // Pilih lagu dari hasil pencarian
  function handleSelectSong(song) {
    console.log("Selected song:", song); // Cek isi data
    if (!song) return;
    setSelected(song);
    // setIsPlaying(true);
    setFormData({
      ...formData,
      startTime: "",
      endTime: "",
      // startTime: 0,
      // endTime: Math.min(30, Math.floor((song?.duration_ms || 0) / 1000)),
    });
  }

  // Filter lagu berdasarkan input
  const filteredSongs =
    query === ""
      ? []
      : songs.filter(
          (song) =>
            song.name?.toLowerCase().includes(query.toLowerCase()) ||
            song.artists?.some((a) =>
              a.name.toLowerCase().includes(query.toLowerCase()),
            ),
        );

  // (Raika) Fungsi validasi format waktu
  const isValidTimeFormat = (time) => {
    return /^\d{1,2}(\.\d{1,2})?$/.test(time);
  };

  const convertToSeconds = (time) => {
    if (!time) return 0;

    const parts = time.split(".");
    const minutes = parseInt(parts[0]) || 0;
    const seconds = parseInt(parts[1]) || 0;

    return minutes * 60 + seconds;
  };

  const validateTimeInput = (name, value) => {
    let newErrors = { ...errors };

    if (!value) {
      newErrors[name] = "";
    } else if (!isValidTimeFormat(value)) {
      newErrors[name] = "Format mm.ss (contoh: 01.30)";
    } else {
      newErrors[name] = "";
    }

    const start = name === "startTime" ? value : formData.startTime;
    const end = name === "endTime" ? value : formData.endTime;

    if (start && end) {
      if (convertToSeconds(end) < convertToSeconds(start)) {
        newErrors.endTime = "End harus lebih besar dari start";
      }
    }

    setErrors(newErrors);
  };

  // (Raika) Handle perubahan input
  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateTimeInput(name, value);
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleMessageChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }

  // function untuk mengatur discard semua input
  const handleChangeDiscard = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDiscard = () => {
    setFormData({
      name: "",
      recipient: "",
      startTime: "",
      endTime: "",
      message: "",
    });
    setSelected(null);
    setMessage("");
    textareaRef.current.style.height = "auto"; // Reset height
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 2000);
  };

  // Submit Songfess
  async function handleSubmit(e) {
    e.preventDefault();

    if (errors.startTime || errors.endTime) {
      setSubmitStatus("validateTime"); // Tampilkan pesan error
      setTimeout(() => setSubmitStatus(null), 3000); // Hilangkan setelah 3 detik
      return;
    }
    if (!selected) return alert("Silakan pilih lagu terlebih dahulu.");

    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const response = await fetch(`${API_BASE}/songfess`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: formData.message,
          song_id: selected.id,
          song_title: selected.name,
          artist: selected.artists.map((a) => a.name).join(", "),
          album_art: selected.album.images[0]?.url || "",
          preview_url: selected.preview_url || "",
          start_time: convertToSeconds(formData.startTime),
          end_time: convertToSeconds(formData.endTime),
          sender_name: formData.name,
          recipient_name: formData.recipient,
        }),
      });
      if (response.ok) {
        // Reset form
        setFormData({
          name: "",
          recipient: "",
          message: ""   ,
          startTime: "",
          endTime: "",
        });
        setSelected(null);
        setSongs([]);
        setQuery("");
        setSubmitStatus("success");
        setTimeout(() => setSubmitStatus(null), 5000);setTimeout(() => {
          router.push("/himtalks/songfess/browse-songfess");
        }, 5500);
      }
    } catch (error) {
      console.error("Error submitting songfess:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 5000);
    }
    setIsSubmitting(false);
  }

  return (
    <>
      <section className="pt-22 md:pt-25 lg:pt-30 pb-28 px-6 sm:px-16 lg:px-20 xl:px-23 2xl:px-28 bg-primaryBG text-black transition-all duration-500 selection:bg-primary overflow-x-hidden">
        <Link href="/himtalks/songfess" className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 sm:mb-10 md:mb-15 text-darkSage font-cormorant font-extrabold tracking-tight w-fit hover:-translate-x-1 md:hover:-translate-x-2 transition-all duration-500">
            <svg className="w-2 h-4 md:w-3 md:h-6" width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.99965 19.438L8.95465 20.5L1.28865 12.71C1.10415 12.5197 1.00098 12.2651 1.00098 12C1.00098 11.7349 1.10415 11.4803 1.28865 11.29L8.95465 3.5L9.99965 4.563L2.68165 12L9.99965 19.438Z" fill="#5F6F6C"/>
            </svg>
            <span className="selection:text-white">Return to songfess menu</span>
        </Link>
        <h1 className="font-playfair italic font-bold max-w-80 md:max-w-full text-4xl md:text-5xl xl:text-6xl text-darkSage tracking-tight mt-4 mb-4 sm:mb-2 transition-all duration-500 mx-auto text-center selection:text-white">
          Send your songfess on Himtalks
        </h1>
        <p className="w-[80%] md:max-w-3xl text-center font-cormorant font-semibold text-base sm:text-lg lg:text-xl xl:text-2xl text-darkSage mt-6 md:mt-8 mx-auto leading-5 sm:leading-6 selection:text-white">
          Jangan simpan ceritamu sendiri. Biarkan musik menjadi jembatan untuk
          menyampaikan perasaanmu.
        </p>
        <div className="relative z-10 bg-[#7D9A8B] w-[90%] sm:max-w-140 mt-24 md:mt-20 px-5 sm:px-8 py-10 text-white rounded-2xl mx-auto">
          {/* Existing SVG/Image components */}
          <Image
              src="/chatanonym/bird-ca-1.svg"
              width="210"
              height="256"
              alt="bird-illustrasion"
              className="absolute w-30 sm:w-50 h-50 z-10 -top-25 -left-12 sm:-top-21 sm:-left-20 transition-all duration-500"
          />
          <Image
              src="/chatanonym/bird-ca-2.svg"
              width="105"
              height="128"
              alt="bird-illustrasion"
              className="absolute w-30 sm:w-50 h-50 z-10 -top-25 -right-12 sm:-top-21 sm:-right-20 transition-all duration-500"
          />
          <AnimatePresence>
            {submitStatus === "success" && (
              <motion.div
                className="z-20 top-24 sticky mb-4 p-3 bg-green-200 text-green-800 rounded-md"
                initial={{ opacity: 0, y: -10 }} // Mulai dari transparan dan agak ke atas
                animate={{ opacity: 1, y: 0 }} // Muncul dengan smooth
                exit={{ opacity: 0, y: -10 }} // Menghilang dengan smooth
                transition={{ ease: "easeInOut", duration: 0.5 }} // Efek ease-in-out selama 0.5 detik
              >
                Songfess berhasil terkirim!
              </motion.div>
            )}
            {submitStatus === "error" && (
              <motion.div
                className="z-20 top-24 sticky mb-4 p-3 bg-red-200 text-red-800 rounded-md"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ ease: "easeInOut", duration: 0.5 }}
              >
                Gagal mengirim songfess. Silakan coba lagi.
              </motion.div>
            )}
          </AnimatePresence>
          <form onSubmit={handleSubmit}>
            <div className="w-full font-poppins">
              <div className="mb-6">
                <h3 className="text-center font-cormorant italic text-2xl sm:text-3xl mb-0.5 md:mb-2 font-semibold">
                Send ur Songfess
                </h3>
                <Image
                    src="/chatanonym/underline-title.svg"
                    width={500}
                    height={429}
                    alt="illustration"
                    className="w-80 lg:w-88 mx-auto select-none"
                />
              </div>
              <div className="mb-3 sm:mb-6">
                <label className="text-white font-normal text-xs sm:text-sm selection:bg-white selection:text-primary">
                  Enter ur name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Masukkan nama anda (anonymous) ..."
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 font-medium text-xs sm:text-sm text-textMain rounded-md bg-white p-2 sm:p-[11px] focus:outline-none focus:bg-white focus:placeholder-white placeholder:text-textMain/50 placeholder:italic hover:placeholder-textMain/90 selection:bg-textMain selection:text-white"
                />
              </div>
              <div className="mb-3 sm:mb-6">
                <label className="text-white font-normal text-xs sm:text-sm selection:bg-white selection:text-textMain">
                  Recipient name
                </label>
                <input
                  type="text"
                  id="recipient"
                  name="recipient"
                  value={formData.recipient}
                  onChange={handleChange}
                  placeholder="Masukkan nama penerima ..."
                  required
                  className="w-full mt-1 font-medium text-xs sm:text-sm text-textMain rounded-md bg-white p-2 sm:p-[11px] focus:outline-none focus:bg-white focus:placeholder-white  placeholder:text-textMain/50 placeholder:italic hover:placeholder-textMain/90 selection:bg-textMain selection:text-white"
                />
              </div>
              <div className="relative">
                <label className="text-white font-normal text-xs sm:text-sm selection:bg-white selection:text-textMain">
                  Choose song
                </label>
                <Combobox value={selected} onChange={handleSelectSong}>
                  <div className="relative w-full mt-1">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white shadow-md text-left focus:outline-none focus:ring-2 focus:ring-textMain sm:text-sm">
                      <div className="flex justify-between sm:gap-0 items-center w-full">
                        <Combobox.Input
                          className="w-full font-medium text-xs sm:text-sm text-textMain rounded-md bg-white p-2 sm:p-[11px] focus:outline-none focus:bg-white focus:placeholder-white placeholder:text-textMain/50 placeholder:italic hover:placeholder-textMain/90 selection:bg-textMain selection:text-white"
                          displayValue={(song) =>
                            song
                              ? `${song.name} • ${song.artists.map((a) => a.name).join(", ")}`
                              : ""
                          }
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder="Masukkan lagu ..."
                        />
                        <Combobox.Button className="flex items-center pr-2">
                          {({ open }) => (
                            <ChevronDownIcon
                              className={clsx(
                                "group size-4 fill-textMain transition-transform duration-500",
                                { "rotate-180": open },
                              )}
                              aria-hidden="true"
                            />
                          )}
                        </Combobox.Button>
                      </div>
                    </div>

                    {/* Option List */}
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                      afterLeave={() => setQuery("")}
                    >
                      <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50 custom-scrollbar">
                        {filteredSongs.length === 0 && query !== "" ? (
                          <div className="relative text-xs sm:text-sm cursor-default select-none px-4 py-2 text-gray-700">
                            No Results.
                          </div>
                        ) : (
                          filteredSongs.map((song) => (
                            <Combobox.Option
                              key={song.id}
                              className={({ active }) =>
                                `relative cursor-pointer select-none py-1.5 px-3 md:py-2 md:px-4 ${active ? "bg-darkSage text-white" : "text-gray-900"}`
                              }
                              value={song}
                            >
                              {({ selected, active }) => (
                                <div className="flex items-center gap-2 md:gap-3">
                                  {/* Gambar Lagu */}
                                  <div className="w-9.5 h-9.5 md:w-12 md:h-12 shrink-0">
                                    <Image
                                      src={
                                        song.album.images[0]?.url ||
                                        "/songfess/image-default-spotify.png"
                                      }
                                      alt={song.name}
                                      width={100}
                                      height={100}
                                      className="w-full h-full object-cover rounded-md"
                                    />
                                  </div>

                                  {/* Judul dan Artist */}
                                  <div className="flex justify-between gap-2 sm:gap-0 items-center w-full">
                                    <div className="ml-1 flex flex-col">
                                      <p
                                        className={`truncate text-xs md:text-sm font-medium ${active ? "text-white" : "text-black"}`}
                                      >
                                        {song.name}
                                      </p>
                                      <p
                                        className={`text-[10px] leading-3 md:text-xs ${active ? "text-white" : "text-gray-500"}`}
                                      >
                                        {song.artists
                                          .map((a) => a.name)
                                          .join(", ")}{" "}
                                        ‧ {formatDuration(song.duration_ms)}
                                      </p>
                                    </div>
                                    {selected && (
                                      <span
                                        className={`${active ? "text-white" : "text-textMain"}`}
                                      >
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}
                            </Combobox.Option>
                          ))
                        )}
                      </Combobox.Options>
                    </Transition>
                  </div>
                </Combobox>
              </div>

              <div className="mb-3 sm:mb-6 mt-2">
                <div
                  onClick={() => {
                      if (!selected) return;
                      handlePlayPause();
                    }}
                  // if (selected) handlePlayPause();
                  // if (!selected?.preview_url) return; // Jangan lanjut kalau tidak ada preview
                  // handlePlayPause();

                  className={`relative rounded-md flex flex-col cursor-pointer select-none py-2 pl-2 pr-5 group ${selected ? (isPlaying ? "bg-linear-to-r from-white via-[#F9BCBB] to-[#F37199] transition-colors duration-500" : "bg-white") : "bg-linear-to-r from-white via-slate-200 to-slate-400"}`}
                >
                  <div className="flex w-full items-center gap-1 md:gap-3">
                    {/* Gambar Lagu */}
                    <div className="relative max-w-12 max-h-12 shrink-0">
                      <Image
                        src={
                          songToShow.album.images[0].url ||
                          "/songfess/image-default-spotify.png"
                        }
                        alt={songToShow.name}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover rounded-md"
                      />
                      {selected && showOverlay && (
                        <div
                          className={clsx(
                            "absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center rounded-md cursor-pointer transition-all duration-500",
                            showOverlay ? "opacity-0 hover:opacity-80" : "opacity-0",
                          )}
                        >
                          {isPlaying ? (
                            <PauseIcon className="w-5 h-5 text-white transition-all duration-500" />
                          ) : (
                            <PlayIcon className="w-5 h-5 text-white transition-all duration-500" />
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between gap-2 sm:gap-0 items-center w-full min-w-0">
                      {/* Judul dan Artist */}
                      <div
                        className={`ml-1 flex flex-col ${isPlaying ? "w-full grow" : "w-full flex-none"} min-w-0`}
                      >
                        <p
                          className={`truncate text-xs md:text-sm font-medium text-black max-w-full overflow-hidden whitespace-nowrap`}
                        >
                          {songToShow.name}
                        </p>
                        <span
                          className={`text-[10px] md:text-xs text-gray-500`}
                        >
                          {songToShow.artists.map((a) => a.name).join(", ")} ‧{" "}
                          {formatDuration(songToShow.duration_ms)}
                        </span>
                      </div>

                      {/* 🔊 Audio Wave Animation (Muncul saat isPlaying true) */}
                      <div
                        className={`sound-wave ${isPlaying ? "show opacity-100" : "opacity-0"}`}
                      >
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            style={{ animationDelay: `${i / 6}s` }}
                          ></i>
                        ))}
                      </div>
                      <audio ref={audioRef} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-3 sm:mb-6 mt-4 sm:mt-6 relative">
                <label className="text-white font-normal text-xs sm:text-sm selection:bg-white selection:text-textMain">
                  Song start minute (e.g. 00.00)
                </label>
                <input
                  type="text"
                  id="start minute"
                  name="startTime"
                  placeholder="Masukkan menit awal lagu (cth: 00.00) ..."
                  value={formData.startTime}
                  onChange={handleTimeChange}
                  required
                  className="w-full mt-1 font-medium text-xs sm:text-sm text-textMain rounded-md bg-white p-2 sm:p-[11px]  focus:outline-none focus:bg-white focus:placeholder-white placeholder:text-textMain/50 placeholder:italic hover:placeholder-textMain/90 selection:bg-textMain selection:text-white"
                />
                {errors.startTime && (
                  <p className="absolute text-red-300 font-bold text-xs mt-1">
                    {errors.startTime}
                  </p>
                )}
              </div>

              <div className="mb-3 sm:mb-6 relative">
                <label className="text-white font-normal text-xs sm:text-sm selection:bg-white selection:text-textMain">
                  Song end minute (e.g. 00.30)
                </label>
                <input
                  type="text"
                  id="end minute"
                  name="endTime"
                  placeholder="Masukkan menit akhir lagu (cth: 00.30) ..."
                  value={formData.endTime}
                  onChange={handleTimeChange}
                  required
                  className="w-full mt-1 font-medium text-xs sm:text-sm text-textMain rounded-md bg-white p-2 sm:p-[11px]  focus:outline-none focus:bg-white focus:placeholder-white placeholder:text-textMain/50 placeholder:italic hover:placeholder-textMain/90 selection:bg-textMain selection:text-white"
                />
                {errors.endTime && (
                  <p className="absolute text-red-300 font-bold text-xs mt-1">
                    {errors.endTime}
                  </p>
                )}
              </div>
              <div className="mb-3 sm:mb-6">
                <label className="text-white text-xs sm:text-sm">Message</label>
                <textarea
                  ref={textareaRef}
                  rows={1}
                  name="message"
                  value={formData.message}
                  onChange={handleMessageChange}
                  placeholder="Type your message ..."
                  required
                  className="w-full mt-1 font-medium text-xs sm:text-sm text-textMain rounded-md bg-white p-2 sm:p-[11px] border-white focus:outline-none focus:bg-white focus:placeholder-white placeholder:text-textMain/50 placeholder:italic hover:placeholder-textMain/90 selection:bg-textMain selection:text-white resize-none overflow-hidden"
                />
              </div>
              <div className="flex w-full gap-4 font-poppins text-sm sm:text-base">
                <button
                  onClick={handleDiscard}
                  type="reset"
                  className={`selection:bg-white selection:text-textMain transition-all duration-500 rounded-md w-full font-medium hover:text-textMain py-1 sm:py-2 ${isClicked ? "border border-accent bg-accent hover:bg-accent  text-darkSage rounded-lg" : "text-white rounded-lg hover:bg-white active:bg-[#5F6F6C80] active:text-white active:border-[#5F6F6C80] hover:text-textMain hover:border-white border border-purple"}`}
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="text-white rounded-md w-full bg-darkSage font-medium hover:bg-white hover:text-textMain py-2 transition-all duration-500 selection:bg-white selection:text-purple"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
