"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { useState, Fragment, useRef, useEffect } from "react";
import { toPng } from 'html-to-image';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function SongfessDetailPage() {
  const [songfessList, setSongfessList] = useState([]);
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const timeoutRef = useRef(null);
  const modalRef = useRef(null);

  const params = useParams();
  const { id } = params;

  // Fetch data dari API
    useEffect(() => {
      async function fetchSongfessData() {
          try {
              const response = await fetch(`${API_BASE}/songfess`);
              // const response = await fetch(`/api/songfess`);
              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
              const data = await response.json();
              
              setSongfessList(data);
              setLoading(false);
          } catch (err) {
              console.error("Error fetching songfess data:", err);
              setError(err.message);
              setLoading(false);
          }
      }

      fetchSongfessData();
    }, []);

  // const downloadImage = async () => {
  //   if (modalRef.current){
  //     const canvas = await html2canvas(modalRef.current, { useCORS: true, scale: 2 });
  //     const imgData = canvas.toDataURL("image/png");

  //     const link = document.createElement("a");
  //     link.href = imgData;

  //     const songfessItem = songfessList.find((item) => item.id.toString() === id);
  //     const fileName = `${songfessItem ? songfessItem.recipient_name + "-songfess-card" : "songfess-card"}.png`;
  //     link.download = fileName;
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   }
  // };

  // const downloadImage = async () => {
  //   if (modalRef.current) {
  //     const dataUrl = await toPng(modalRef.current, { cacheBust: true, pixelRatio: 2 });
  //     const link = document.createElement("a");
  //     const songfessItem = songfessList.find((item) => item.id.toString() === id);
  //     const fileName = `${songfessItem ? songfessItem.recipient_name + "-songfess-card" : "songfess-card"}.png`;
  //     link.download = fileName;
  //     link.href = dataUrl;
  //     link.click();
  //   }
  // };

  const downloadImage = async () => {
    if (modalRef.current) {
      try {
        // 1. Ambil ukuran asli elemen
        const width = modalRef.current.offsetWidth;
        const height = modalRef.current.offsetHeight;

        // 2. Render dengan opsi tambahan
        const dataUrl = await toPng(modalRef.current, {
          cacheBust: true,
          pixelRatio: 2,
          backgroundColor: '#ffffff',
          // Paksa lebar dan tinggi sesuai elemen asli
          width: width,
          height: height,
          style: {
            transform: 'scale(1)', // Reset transform biar nggak miring
            left: '0',
            top: '0',
            margin: '0', // Hapus mx-auto pas lagi dipotret
          }
        });

        // 2. Eksekusi Download
        const link = document.createElement("a");
        const songfessItem = songfessList.find((item) => item.id.toString() === id);
        const fileName = `${songfessItem ? songfessItem.sender_name : "songfess"}-card.png`;
        
        link.download = fileName;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

      } catch (err) {
        console.error("Gagal download gambar:", err);
      }
    }
  };

  const handleMouseEnter = () => {
    {/*batalin timeout sebelumnya biar tidak kepending*/}
    clearTimeout(timeoutRef.current);
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    {/*bikin delay 1 detik*/}
    timeoutRef.current = setTimeout(() => {
        setIsHover(false);
    }, 700);
  };

  const closeModal = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 5000); 
  };

  const openModal = () => {
    setIsOpen(true);
  };

  if (loading) {
    return <h1 className="text-2xl mt-10">Loading...</h1>;
  }

  const songfess = songfessList.find((item) => item.id.toString() === id);

  if (!songfess) {
    return <h1 className="text-2xl mt-10">Songfess tidak ditemukan</h1>;
  }

  return (
    <section className="relative pt-25 md:pt-31 pb-28 px-6 sm:px-16 md:px-12 lg:pb-50 lg:px-20 xl:px-28 bg-yellowBG text-black transition-all duration-500 selection:bg-primary selection:text-white">
      <Link href="/himtalks/songfess/browse-songfess" className="flex items-center gap-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-8 sm:mb-10 md:mb-13 text-darkSage font-cormorant font-extrabold tracking-tight w-fit hover:-translate-x-1 md:hover:-translate-x-2 transition-all duration-500">
        <svg width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M9.99965 19.438L8.95465 20.5L1.28865 12.71C1.10415 12.5197 1.00098 12.2651 1.00098 12C1.00098 11.7349 1.10415 11.4803 1.28865 11.29L8.95465 3.5L9.99965 4.563L2.68165 12L9.99965 19.438Z" fill="#5F6F6C"/>
        </svg>
        <span>Return to song list</span>
      </Link>
      <div className="relative max-w-250 mx-auto">
        <Image
          src="/himtalks/buwung.png"
          width="420"
          height="512"
          alt="bird-in-flower-illustrasion"
          className="absolute w-25 h-30 sm:w-35 sm:h-40 md:w-45 md:h-50 lg:w-65 lg:h-70 xl:w-85 xl:h-93 bottom-0 -left-5 sm:top-40 sm:-left-10 lg:top-50 lg:-left-20 xl:-left-30 transition-all duration-500 z-10 rotate"
        />
        <Image
          src="/songfess/bird-sing-detail-songfess.webp"
          width="262"
          height="320"
          alt="bird-kicau-illustrasion"
          className="absolute w-25 h-35 top-0 -right-3 sm:-right-4 md:-top-10 lg:-right-5 sm:w-35 sm:h-40 md:w-52 md:h-52 xl:w-75 xl:h-90 transition-all duration-500 z-10"
        />
        <div 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={openModal} 
          className={`bg-white modal-card w-[85%] lg:max-w-[849px] py-6 px-5 sm:py-9 lg:py-13 lg:px-10 rounded-xl shadow-md text-center mx-auto transition-all duration-1000 ${isHover 
                      ? "scale-105"
                      : "hover:scale-105 scale-100"}`} >
          
          <div className="max-w-[547px] mx-auto text-center text-darkSage">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-none font-playfair font-normal italic">
              Hello, <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight block md:inline">{songfess.recipient_name || "Anonymous"}</span>
            </h1>
            <p className="font-poppins w-[80%] mx-auto text-[10px] sm:text-xs md:text-sm xl:text-base font-medium mt-4 sm:mt-6 md:mt-8">
              There's someone sending you a song, they want you to hear this song that maybe you'll like :)
            </p>
            {/* <div className="rounded-lg bg-[#F5E8FF] max-w-96 mx-auto p-3 mt-7 md:mt-9">
                <div className="w-full flex items-start gap-4">
                  <div>
                    <Image
                        src={songfess.image}
                        width={128}
                        height={128}
                        alt="Song Image"
                        draggable={false}
                        className="rounded-md max-w-[80px] max-h-[80px] md:max-w-[120px] md:max-h-[120px]"
                    />
                  </div>

                  <div className="">
                    <h3 className="mb-2 font-[Plus Jakarta Sans] font-semibold text-darkPurple text-lg md:text-2xl tracking-tight text-left">{songfess.songTitle}</h3>
                    <div className="mb-2 flex flex-col-reverse items-start sm:flex sm:flex-row sm:items-end gap-2">
                      <p className="rounded-sm bg-darkPurple text-white text-xs max-w-16 font-light tracking-tight px-2 py-[1px] cursor-default">Preview</p>
                      <p className="font-[Plus Jakarta Sans] text-sm font-medium tracking-tight -mb-1 sm:mb-0">{songfess.artist}</p>
                    </div>
                    <Link href="#" className="flex gap-2">
                      <Image
                        src="/icons/add-plus.svg"
                        width={17}
                        height={17}
                        alt="Add"
                        draggable={false}
                      />
                      <p className="font-medium text-sm tracking-tight text-darkPurple hover:underline">Save on spotify</p>
                    </Link>
                  </div>
                </div>

                <div className="w-full mt-2 flex justify-end items-center gap-3">
                  <div className="relative hover:bg-white w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500">
                    <Image
                      src="/icons/more-option.svg"
                      width={19}
                      height={4}
                      alt="Add"
                      draggable={false}
                      className="absolute right-[6px]"
                    />
                  </div>
                  <div className="relative bg-white w-8 h-8 rounded-full flex items-center justify-center">
                    <Image
                      src="/icons/pause.svg"
                      width={11}
                      height={15}
                      alt="Add"
                      draggable={false}
                      className="absolute right-[9px]"
                    />
                  </div>
                </div>
            </div> */}
            {/* Hanya tampilkan iframe jika song_id ada dan tidak kosong */}
            {songfess.song_id && (
              <div className="flex justify-center mt-7 lg:mt-10">
                <iframe
                  src={`https://open.spotify.com/embed/track/${songfess.song_id}`}
                  width="300"
                  height="80"
                  frameBorder="0"
                  allow="encrypted-media"   
                  className="rounded-md text-xs scale-80 sm:scale-100 lg:scale-120 w-70 h-20 md:w-75 md:h-20"
                ></iframe>
              </div>
            )}
            <p className="text-[10px] md:text-xs lg:text-sm xl:text-base font-poppins font-medium leading-5 mt-6 md:mt-8 lg:mt-10">Also, here's a message from the sender:</p>
            <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold mt-4 md:mt-6 lg:mt-8 leading-5 lg:leading-7 xl:leading-8.5 font-cormorant tracking-tight italic wrap-break-word">"{songfess.content || "No message"}"</p>
            <p className="text-[10px] md:text-xs lg:text-sm xl:text-base font-poppins font-medium leading-5 mt-4 md:mt-7">
              Sent by {songfess.sender_name || "Anonymous"} on {new Date(songfess.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-60" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-1000"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-1000"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
          <div className="fixed inset-0 bg-black/80" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-out duration-1000"
                enterFrom="translate-x-full opacity-0"
                enterTo="translate-x-0 opacity-100"
                leave="transform transition ease-in duration-1000"
                leaveFrom="translate-x-0 opacity-100"
                leaveTo="translate-x-full opacity-0"
              >
              <Dialog.Panel
                ref={modalRef}
                className={`relative bg-white w-full max-w-[849px] p-8 rounded-xl shadow-md text-center mx-auto transition-all duration-1000`} >
                  <div className="max-w-[547px] mx-auto ">
                      <Dialog.Title className="text-3xl md:text-4xl lg:text-5xl leading-none font-playfair font-normal italic">
                        Hello, <span className="font-extrabold tracking-tight block md:inline">{songfess.recipient_name || "Anonymous"}</span>
                    </Dialog.Title>
                    <p className="font-poppins text-[10px] sm:text-xs md:text-sm lg:text-base font-medium mt-4 sm:mt-6 md:mt-8">
                        There's someone sending you a song, they want you to hear this song
                        that maybe you'll like :)
                    </p>
                    <div className="rounded-lg bg-primary/50 max-w-96 md:max-w-lg mx-auto p-3 mt-7 md:mt-9">
                      {/* menyimpan detail lagu */}
                      <div className="w-full flex items-start md:items-center lg:items-start gap-4">
                        {/* Image Song */}
                        <div>
                          <Image
                              src={songfess.album_art || "/songfess/image-default-spotify.png"}
                              width={128}
                              height={128}
                              alt="Song Image"
                              draggable={false}
                              className="rounded-md w-32 h-32 md:w-40 md:h-40"
                          />
                        </div>
                        {/* Title and Artist Song */}
                        <div className="flex items-end">
                          <div>
                            <h3 className="mb-3 md:mb-4 font-poppins font-semibold text-darkSage text-sm md:text-xl lg:text-[24px] tracking-tight text-left">{songfess.song_title || "No music"}</h3>
                            <span className="mb-1.5 text-xs md:text-sm text-left flex justify-start font-medium tracking-tight">{songfess.artist || "No artist"}</span>
                            <div className="flex flex-col-reverse items-start sm:flex sm:flex-row sm:items-center gap-2 relative">
                              <button className="rounded-lg bg-darkSage text-white text-[12px] font-light tracking-tight px-2 cursor-default flex items-end">
                                <p className="leading-3.5">Preview</p>
                              </button>
                            </div>
                            <Link href="#" className="mt-1 flex items-center gap-2">
                              <Image
                                src="/icons/add-plus.svg"
                                width={17}
                                height={17}
                                alt="Add"
                                draggable={false}
                              />
                              <p className="font-medium text-sm tracking-tight text-darkPurple hover:underline">Save on spotify</p>
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* div tombol */}
                      <div className="w-full mt-2 flex justify-end items-center gap-3">
                        {/* titik tiga */}
                        <div className="relative hover:bg-white w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500">
                          <Image
                            src="/icons/more-option.svg"
                            width={19}
                            height={4}
                            alt="Add"
                            draggable={false}
                            className="absolute right-1.5"
                          />
                        </div>
                        {/* tombol pause */}
                        <div className="relative bg-white w-8 h-8 rounded-full flex items-center justify-center">
                          <Image
                            src="/icons/pause.svg"
                            width={11}
                            height={15}
                            alt="Add"
                            draggable={false}
                            className="absolute right-[9px]"
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-xs md:text-sm lg:text-base font-poppins font-medium leading-5 mt-6 md:mt-8">
                      Also, here's a message from the sender:
                    </p>
                    <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold mt-4 sm:mt-6 md:mt-8 font-cormorant text-purple tracking-tight italic leading-5 lg:leading-7 xl:leading-8.5 wrap-break-word">"{songfess.content || "No message"}"</p>
                    <p className="text-xs md:text-sm lg:text-base font-poppins font-medium leading-5 mt-4 md:mt-7">Sent by {songfess.sender_name || "Anonymous"} on {new Date(songfess.created_at).toLocaleDateString()}</p>
                  </div>
              </Dialog.Panel>
              </Transition.Child>
              {/* Tombol Download (diluar Dialog.Panel agar tidak ikut tertangkap) */}
              <button
                onClick={downloadImage}
                className="absolute top-5 left-5 bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-700 transition-all z-100"
              >
                Download as PNG
              </button>
              <button onClick={closeModal} className="bg-purple rounded-md p-2 text-white absolute top-5 right-5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 fill-current">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </Dialog>
      </Transition>
    </section>
  );
}
