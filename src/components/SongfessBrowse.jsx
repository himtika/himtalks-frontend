"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function SongfessBrowse() {
    const controls = useAnimation();
    const containerRef = useRef(null);
    const scrollTimeout = useRef(null);
    const [isScrolling, setIsScrolling] = useState(false);

    const [isFocused,setIsFocused] = useState(false);
    const [value,setValue] = useState("");

    const [songfessData,setSongfessData] = useState([]);
    const [filteredData,setFilteredData] = useState([]);

    const [isSearching,setIsSearching] = useState(false);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    /* ================= FETCH DATA ================= (INI KODE BE YANG UDAH ADA, INI DIKOMEN BIAR GAK ERROR AJA PAS TESTING DI FE) */ 

    useEffect(()=>{
        async function fetchSongfessData(){
            try {
                const res = await fetch(`${API_BASE}/songfess`);
                if(!res.ok){
                    throw new Error(`HTTP Error ${res.status}`);
                }

                const data = await res.json();
                const transformed = data.map(item=>({
                    id:item.id,
                    to:item.recipient_name || "Anonymous",
                    message:item.content || "",
                    songTitle:item.song_title || "",
                    artist:item.artist || "",
                    image:item.album_art || "/songfess/image-default-spotify.png",
                }));

                setSongfessData(transformed);
                setFilteredData(transformed);
                setLoading(false);
            } catch(err) {
                console.error(err);
                setError(err.message);
                setLoading(false);
            }
        }

        fetchSongfessData();
    },[]);

    /* ================= AUTO SCROLL ================= */

    useEffect(()=>{
        const isMobile = window.innerWidth < 768;
        const cardWidth = isMobile ? 320 : 420; // 320px (lebar card + space-x-6)
        
        const baseSetWidth = filteredData.length * cardWidth;
        const windowWidth = window.innerWidth;
        const distance = windowWidth + baseSetWidth;
        const speed = isMobile ? 60 : 90; // Mobile dibikin lebih lambat dikit biar enak dibaca
        const duration = distance / speed;

        if (!isSearching && filteredData.length > 0) {
            controls.start({
                x: [windowWidth, -baseSetWidth], 
                transition: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: duration,
                    ease: "linear",
                },
            });
        } else {
            controls.stop();
            controls.set({ x: 0 });
        }

        return () => controls.stop();
    },[filteredData,isSearching,controls]);



    /* ================= SEARCH ================= */

    // INI KODE BE YANG UDAH ADA BUAT HANDLE SEARCH SONGFESSNYA, YANG handleInteraction di bawah itu buat ngetes di FE
    // TANYA GPT/AI AJA KALO BINGUNG BUAT NYAMAIN LOGIC handleSearch buat BE biar sesuai sama handleInteraction dari FE -RAIKA
    const handleSearch = (e)=>{
        const searchValue = e.target.value.toLowerCase();
        setValue(searchValue);

        if (!songfessData.length) {
            setFilteredData([]);
            return;
        }

        if (searchValue) {
            setIsSearching(true);

            const filtered = songfessData.filter(item=>
                (item.to || "").toLowerCase().includes(searchValue) ||
                (item.message || "").toLowerCase().includes(searchValue) ||
                (item.songTitle || "").toLowerCase().includes(searchValue) ||
                (item.artist || "").toLowerCase().includes(searchValue)
            );
            setFilteredData(filtered);
        } else {
            setIsSearching(false);
            setFilteredData(songfessData);
        }
    };

    const handleInteraction = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setValue(searchTerm);

        if (!songfessData || songfessData.length === 0) {
            setFilteredData([]);
            return;
        }

        if (searchTerm) {
            setIsSearching(true);
            const filtered = songfessData.filter(item =>
                (item.to || "").toLowerCase().includes(searchTerm) ||
                (item.message || "").toLowerCase().includes(searchTerm)
            );
            setFilteredData(filtered);
            // Kita tidak panggil controls.stop() di sini, 
            // karena useEffect akan otomatis panggil controls.stop() saat isSearching = true
        } else {
            setIsSearching(false);
            setFilteredData(songfessData);
        }
    };

    /* ================= UI ================= */

    return (
        <section className="pt-22 sm:pt-26 lg:pt-32 pb-28 bg-primaryBG text-black selection:bg-primary selection:text-white">
            <div className="px-6 sm:px-16 lg:px-20 xl:px-23 2xl:px-28">
                <Link href="/himtalks/songfess" className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 sm:mb-10 md:mb-13 text-darkSage font-cormorant font-extrabold tracking-tight w-fit hover:-translate-x-2 transition-all duration-500">
                    <svg className="w-2 h-4 md:w-3 md:h-6" width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.99965 19.438L8.95465 20.5L1.28865 12.71C1.10415 12.5197 1.00098 12.2651 1.00098 12C1.00098 11.7349 1.10415 11.4803 1.28865 11.29L8.95465 3.5L9.99965 4.563L2.68165 12L9.99965 19.438Z" fill="#5F6F6C"/>
                    </svg>
                    <span>Return to songfess menu</span>
                </Link>
                {/* TITLE */}
                <h1 className="font-playfair italic font-bold max-w-85 md:max-w-full text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-darkSage tracking-tight mt-4 mb-2 transition-all duration-500 mx-auto text-center">
                    Explore the messages waiting for you
                </h1>
                <p className="w-[80%] md:max-w-3xl text-center font-cormorant font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-darkSage mt-6 md:mt-8 mx-auto leading-5 sm:leading-6">
                    Ada pesan yang menunggu untuk kamu dengarkan dan temukan Songfess yang ditujukan untukmu.
                </p>

                {/* SEARCH */}
                <div className="relative font-poppins mt-8 md:mt-10 mb-16 sm:w-full w-[85%] sm:max-w-3xl mx-auto">
                    <input
                        maxLength={20}
                        type="text"
                        id="floatingInput"
                        placeholder=" "
                        value={value}
                        onChange={handleSearch} // INI UBAH AJA KE handleSearch
                        onFocus={()=>setIsFocused(true)}
                        onBlur={()=>setIsFocused(false)}
                        className="w-full rounded-full px-5 py-3 md:px-6 md:py-4 text-xs sm:text-base border-2 bg-white border-[#ddd] focus:border-primary text-darkSage outline-none"
                        autoComplete="off"
                    />
                    {/* Floating Label */}
                    <label
                        htmlFor="floatingInput"
                        className={`absolute left-4 transition-all py-0.5 px-2 rounded-xl bg-white duration-700 
                            ${isFocused || value ? "-top-2.5 text-xs text-darkSage" : "top-3 md:top-4.5 text-xs sm:text-sm text-darkSage"}`}
                    >
                        Enter recipient name
                    </label>

                    <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary p-1.5 md:p-2 rounded-full flex items-center justify-center hover:scale-105 transition cursor-pointer">
                        <button type="button" onClick={() => handleSearch({ target: { value } })}>
                            <Image src="/icons/search.svg" width={16} height={16} alt="Search icon"/>
                        </button>
                    </div>
                </div>
            </div>

            {/* CAROUSEL */}
            <div className={`relative w-full mx-auto overflow-x-scroll custom-scrollbar2 p-5 flex ${filteredData.length === 0 ? "justify-center" : ""}`}>
                <motion.div
                    ref={containerRef}
                    className="flex space-x-4 md:space-x-6"
                    animate={controls}
                    initial={{ x: "100vw" }} // initial styling only, animate overrides this
                    style={{ width: "max-content" }}
                >
                    {filteredData.length > 0 ? (
                        filteredData.map((songfess, index) => (
                            <Link key={`${songfess.id}-${index}`} href={`/himtalks/songfess/${songfess.id}`} passHref>
                                <motion.div
                                    key={index}
                                    className="w-70 md:w-100 shrink-0 bg-white rounded-2xl shadow-md"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="px-4.5 pt-4 md:px-5 md:pt-5 pb-1">
                                        <p className="text-gray-500 text-xs md:text-sm font-poppins">To: 
                                            <span className="text-black"> {songfess.to}</span>
                                        </p>
                                        <div className="h-17.5 md:h-20 flex items-center md:mt-2">
                                            <p className="text-base text-darkSage md:text-lg line-clamp-2 overflow-hidden text-ellipsis wrap-break-word font-playfair font-semibold italic">{songfess.message}</p>  
                                        </div>
                                    </div>
                                    <div className="bg-primary px-4 py-3 md:py-4 rounded-2xl">
                                        <div className="flex gap-1 sm:gap-2 items-center w-full">
                                            <Image
                                                src={songfess.image}
                                                width={33}
                                                height={33}
                                                alt="Song Image"
                                                draggable={false}
                                                className="rounded-lg"
                                            />
                                            <div className="w-full px-2 rounded-md flex items-center justify-between gap-2">
                                                <div className="w-full font-poppins text-xs md:text-sm">
                                                    <p className="text-white font-medium text-ellipsis line-clamp-1">{songfess.songTitle}</p>
                                                    <p className="text-grayArtist text-ellipsis line-clamp-1">{songfess.artist}</p>
                                                </div>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19.08 10.68C15.24 8.4 8.82 8.16 5.16 9.3C4.56 9.48 3.96 9.12 3.78 8.58C3.6 7.98 3.96 7.38 4.5 7.2C8.76 5.94 15.78 6.18 20.22 8.82C20.76 9.12 20.94 9.84 20.64 10.38C20.34 10.8 19.62 10.98 19.08 10.68ZM18.96 14.04C18.66 14.46 18.12 14.64 17.7 14.34C14.46 12.36 9.54 11.76 5.76 12.96C5.28 13.08 4.74 12.84 4.62 12.36C4.5 11.88 4.74 11.34 5.22 11.22C9.6 9.9 15 10.56 18.72 12.84C19.08 13.02 19.26 13.62 18.96 14.04ZM17.52 17.34C17.28 17.7 16.86 17.82 16.5 17.58C13.68 15.84 10.14 15.48 5.94 16.44C5.52 16.56 5.16 16.26 5.04 15.9C4.92 15.48 5.22 15.12 5.58 15C10.14 13.98 14.1 14.4 17.22 16.32C17.64 16.5 17.7 16.98 17.52 17.34ZM12 0C10.4241 0 8.86371 0.310389 7.4078 0.913446C5.95189 1.5165 4.62902 2.40042 3.51472 3.51472C1.26428 5.76516 0 8.8174 0 12C0 15.1826 1.26428 18.2348 3.51472 20.4853C4.62902 21.5996 5.95189 22.4835 7.4078 23.0866C8.86371 23.6896 10.4241 24 12 24C15.1826 24 18.2348 22.7357 20.4853 20.4853C22.7357 18.2348 24 15.1826 24 12C24 10.4241 23.6896 8.86371 23.0866 7.4078C22.4835 5.95189 21.5996 4.62902 20.4853 3.51472C19.371 2.40042 18.0481 1.5165 16.5922 0.913446C15.1363 0.310389 13.5759 0 12 0Z" fill="white"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))
                    ) : (
                        <motion.div
                            className="w-70 md:w-100 bg-white rounded-2xl shadow-md"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="px-5 pt-5 pb-1">
                                <p className="text-[#707070] text-xs md:text-sm font-medium font-poppins">To: 
                                    <span className="text-black">   -</span>
                                </p>
                                <div className="h-17.5 md:h-20 flex items-center md:mt-2">
                                    <p className="text-base text-darkSage md:text-lg font-semibold font-cormorant line-clamp-2 overflow-hidden text-ellipsis">Tidak ada songfess yang dicari</p>  
                                </div>
                            </div>
                            <div className="bg-primary px-4 py-3 md:py-4 rounded-2xl">
                                <div className="flex gap-2 items-center w-full">
                                    <Image
                                        src="/icons/silang.svg"
                                        width={33}
                                        height={33}
                                        alt="Song Image"
                                        draggable={false}
                                        className="rounded-lg"
                                    />
                                    <div className="w-full px-2 rounded-md flex items-center justify-between">
                                        <div className="w-full">
                                            <p className="text-white text-sm font-medium"></p>
                                            <p className="text-white text-sm font-normal"></p>
                                        </div>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19.08 10.68C15.24 8.4 8.82 8.16 5.16 9.3C4.56 9.48 3.96 9.12 3.78 8.58C3.6 7.98 3.96 7.38 4.5 7.2C8.76 5.94 15.78 6.18 20.22 8.82C20.76 9.12 20.94 9.84 20.64 10.38C20.34 10.8 19.62 10.98 19.08 10.68ZM18.96 14.04C18.66 14.46 18.12 14.64 17.7 14.34C14.46 12.36 9.54 11.76 5.76 12.96C5.28 13.08 4.74 12.84 4.62 12.36C4.5 11.88 4.74 11.34 5.22 11.22C9.6 9.9 15 10.56 18.72 12.84C19.08 13.02 19.26 13.62 18.96 14.04ZM17.52 17.34C17.28 17.7 16.86 17.82 16.5 17.58C13.68 15.84 10.14 15.48 5.94 16.44C5.52 16.56 5.16 16.26 5.04 15.9C4.92 15.48 5.22 15.12 5.58 15C10.14 13.98 14.1 14.4 17.22 16.32C17.64 16.5 17.7 16.98 17.52 17.34ZM12 0C10.4241 0 8.86371 0.310389 7.4078 0.913446C5.95189 1.5165 4.62902 2.40042 3.51472 3.51472C1.26428 5.76516 0 8.8174 0 12C0 15.1826 1.26428 18.2348 3.51472 20.4853C4.62902 21.5996 5.95189 22.4835 7.4078 23.0866C8.86371 23.6896 10.4241 24 12 24C15.1826 24 18.2348 22.7357 20.4853 20.4853C22.7357 18.2348 24 15.1826 24 12C24 10.4241 23.6896 8.86371 23.0866 7.4078C22.4835 5.95189 21.5996 4.62902 20.4853 3.51472C19.371 2.40042 18.0481 1.5165 16.5922 0.913446C15.1363 0.310389 13.5759 0 12 0Z" fill="white"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    )
}