"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Footer() {
  useEffect(() => {
    const mask = document.getElementById("mask0_747_41");
    if (mask) {
      mask.setAttribute("mask-type", "luminance");
    }
  }, []);
  return (
    <>
      <footer className="bg-primary pt-9 lg:pt-12 pb-8 lg:pb-11 px-10 sm:px-16 md:px-16 lg:px-20 xl:px-22 selection:bg-white selection:text-[#A8BFA3] transition-all duration-500">
        <div className="transition-all duration-500">
          <div className="lg:flex lg:justify-between transition-all duration-500">
            <div className="w-full lg:w-4/12 mb-8 font-medium text-ranting flex items-start justify-center lg:justify-normal transition-all duration-500">              
              <div className="">
                <div className="flex flex-col justify-center items-center gap-4 mb-5">
                  <img
                    src="/logo/himtalks-logo.webp"
                    alt="Logo HIMTALKS"
                    className="w-60 h-40 sm:w-65 sm:h-42 select-none"
                  />
                  <h2 className="font-poppins tracking-wide font-medium lg:font-semibold text-yellowBright text-4xl md:text-5xl leading-none">
                    Himtalks
                  </h2>
                </div>
                <div className="flex items-center justify-between mb-5">
                  {/* <!-- Instagram --> */}
                  <Link
                    href="https://www.instagram.com/himtalks_?igsh=MW5tYm1iNG9udDB3dA=="
                    target="_blank"
                    className="w-10 h-10 mr-3 rounded-full flex justify-center items-center bg-white/20 text-white hover:bg-white hover:text-primary hover:border-none"
                  >
                    <svg
                      role="img"
                      width="22"
                      className="fill-current"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Instagram HIMTIKA</title>
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                    </svg>
                  </Link>

                  {/* <!-- Twitter/X --> */}
                  <Link
                                    href="https://twitter.com"
                                    target="_blank"
                                    className="w-10 h-10 mr-3 rounded-full flex justify-center items-center bg-white/20 text-white hover:bg-white hover:text-primary"
                                    >
                                    <svg 
                                        role="img"
                                        width="20"
                                        className="fill-current" 
                                        viewBox="0 0 24 24"  
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                    >
                                        <title>X HIMTIKA</title>
                                        <path d="M18.3265 1.90405H21.7L14.33 10.3276L23 21.7901H16.2115L10.894 14.8381L4.81 21.7901H1.4345L9.3175 12.7801L1 1.90405H7.961L12.7675 8.25855L18.3265 1.90405ZM17.1425 19.7701H19.0115L6.9455 3.81705H4.9395L17.1425 19.7701Z" />
                                    </svg>
                                    </Link>

                  {/* <!-- Linkedin --> */}
                  <Link
                    href="https://www.linkedin.com/company/himtika/"
                    target="_blank"
                    className="w-10 h-10 mr-3 rounded-full flex justify-center items-center bg-white/20 text-white hover:bg-white hover:text-primary"
                  >
                    <svg
                      role="img"
                      width="20"
                      className="fill-current"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask
                        id="mask0_747_41"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="24"
                        height="24"
                      >
                        <path d="M24 0V24H0V0H24Z" fill="white" />
                      </mask>
                      <g mask="url(#mask0_747_41)">
                        <path d="M22.2235 0H1.772C0.792 0 0 0.7735 0 1.73V22.265C0 23.222 0.792 24 1.772 24H22.2235C23.2035 24 24 23.222 24 22.27V1.73C24 0.773 23.203 0 22.2235 0ZM7.12 20.4515H3.558V8.9955H7.1205L7.12 20.4515ZM5.339 7.435C5.06781 7.43546 4.79918 7.38246 4.54849 7.27903C4.29779 7.17559 4.06995 7.02376 3.87798 6.83221C3.686 6.64065 3.53367 6.41314 3.4297 6.16267C3.32572 5.9122 3.27213 5.64369 3.272 5.3725C3.27213 5.10131 3.32572 4.8328 3.4297 4.58233C3.53367 4.33186 3.686 4.10435 3.87798 3.91279C4.06995 3.72124 4.29779 3.56941 4.54849 3.46597C4.79918 3.36254 5.06781 3.30954 5.339 3.31C5.88601 3.31 6.41061 3.5273 6.79741 3.91409C7.1842 4.30089 7.4015 4.82549 7.4015 5.3725C7.4015 5.91951 7.1842 6.44411 6.79741 6.83091C6.41061 7.2177 5.88601 7.435 5.339 7.435ZM20.4515 20.452H16.894V14.883C16.894 13.5565 16.8705 11.8455 15.042 11.8455C13.1905 11.8455 12.9095 13.2935 12.9095 14.789V20.4515H9.356V8.9955H12.769V10.5605H12.8155C13.289 9.6605 14.4515 8.7095 16.181 8.7095C19.786 8.7095 20.4515 11.0815 20.4515 14.1655V20.452Z" />
                      </g>
                    </svg>
                  </Link>

                  {/* -- YouTube -- */}
                  <Link
                    href="https://www.youtube.com/@himtikaofficial4428"
                    target="_blank"
                    className="w-10 h-10 mr-3 rounded-full flex justify-center items-center bg-white/20 text-white hover:bg-white hover:text-primary"
                  >
                    <svg
                      role="img"
                      width="20"
                      className="fill-current"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>YouTube</title>
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </Link>

                  {/* <!-- Tiktok --> */}
                  <Link
                    href="https://www.tiktok.com/@himtika_unsika"
                    target="_blank"
                    className="w-10 h-10 rounded-full flex justify-center items-center bg-white/20  text-white hover:bg-white hover:text-primary"
                  >
                    <svg
                      role="img"
                      width="20"
                      className="fill-current"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>TikTok</title>
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                    </svg>
                  </Link>

                  {/* <!-- Whatsapp -->
                                    <!-- <a
                                                href="https://wa.me/6289517117162" target="_blank" className="w-9 h-9 mr-3 rounded-full flex justify-center items-center hover:border-white border-2 border-slate-400 text-slate-400 hover:bg-green-500 hover:text-white">
                                                <svg role="img" width="24" className="fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>WhatsApp</title><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                                            </a> --> */}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 w-full lg:w-8/12 gap-8 transition-all duration-500">
              {/* Tentang Kami */}
              <div className="w-full mb-8 text-white flex justify-start lg:justify-start xl:justify-end transition-all duration-500">
                <div>
                  <h3 className="font-poppins font-medium md:font-semibold text-white text-base sm:text-lg md:text-xl mb-6">
                    Tentang Kami
                  </h3>
                  <ul className="text-sm sm:text-base font-playfair">
                    <li>
                      <Link href="https://himtika.cs.unsika.ac.id/struktur-organisasi" className="inline-block mb-2 sm:mb-4 hover:scale-125 hover:text-ranting antialiased transform origin-left transition-all duration-500">
                        Struktur Organisasi
                      </Link>
                    </li>
                    <li>
                      <Link href="https://himtika.cs.unsika.ac.id/sejarah-himtika" className="inline-block mb-2 sm:mb-4 hover:scale-125 hover:text-ranting antialiased transform origin-left transition-all duration-500">
                        Sejarah
                      </Link>
                    </li>
                    <li>
                      <Link href="https://himtika.cs.unsika.ac.id/logo-himtika" className="inline-block mb-2 sm:mb-4 hover:scale-125 hover:text-ranting antialiased transform origin-left transition-all duration-500">
                        Logo
                      </Link>
                    </li>
                    <li>
                      <Link href="https://himtika.cs.unsika.ac.id/galeri-himtika" className="inline-block mb-2 sm:mb-4 hover:scale-125 hover:text-ranting antialiased transform origin-left transition-all duration-500">
                        Galeri
                      </Link>
                    </li>
                    <li>
                      <Link href="https://himtika.cs.unsika.ac.id/grand-design-himtika-2024" className="inline-block mb-2 sm:mb-4 hover:scale-125 hover:text-ranting antialiased transform origin-left transition-all duration-500">
                        Grand Design
                      </Link>
                    </li>
                    <li>
                      <Link href="https://himtika.cs.unsika.ac.id/visi-misi" className="inline-block mb-2 sm:mb-4 hover:scale-125 hover:text-ranting antialiased transform origin-left transition-all duration-500">
                        Visi Misi
                      </Link>
                    </li>
                    <li>
                      <Link href="https://himtika.cs.unsika.ac.id/kontak-kami" className="inline-block mb-2 sm:mb-4 hover:scale-125 hover:text-ranting antialiased transform origin-left transition-all duration-500">
                        Kontak Kami
                      </Link>
                    </li>
                    
                  </ul>
                </div>
              </div>

              {/* Media */}
              <div className="w-full mb-8 text-white flex justify-end transition-all duration-500">
                <div>
                  <h3 className="font-poppins font-medium md:font-semibold text-white text-base sm:text-lg md:text-xl mb-6">
                    Media
                  </h3>
                  <ul className="text-sm sm:text-base font-playfair">
                    <Link
                      href="https://www.instagram.com/himtika_unsika/" target="_blank"
                      className="inline-block mb-2 sm:mb-4 hover:scale-125 hover:text-ranting antialiased transform origin-left transition-all duration-500"
                    >
                      <li>Berita</li>
                    </Link>
                    <li>
                      <Link
                        href="https://www.instagram.com/himtika_unsika/" target="_blank"
                        className="inline-block mb-2 sm:mb-4 hover:scale-125 hover:text-ranting antialiased transform origin-left transition-all duration-500"
                      >
                        Artikel HIMTIKA
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.instagram.com/cnc_himtika/" target="_blank"
                        className="inline-block mb-2 sm:mb-4 hover:scale-125 hover:text-ranting antialiased transform origin-left transition-all duration-500"
                      >
                        Info Lomba
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.instagram.com/himtika_unsika/" target="_blank"
                        className="inline-block mb-2 sm:mb-4 hover:scale-125 hover:text-ranting antialiased transform origin-left transition-all duration-500"
                      >
                        Kegiatan Mahasiswa
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Event */}
              <div className="w-full mb-8 text-white flex justify-start sm:justify-end lg:justify-center transition-all duration-500">
                <div>
                  <h3 className="font-poppins font-medium md:font-semibold text-white text-base sm:text-lg md:text-xl mb-6">Event</h3>
                  <ul className="text-sm sm:text-base font-playfair">
                    <li><Link href="https://himtika.cs.unsika.ac.id/open-project/" target="_blank" className="inline-block mb-2 sm:mb-4 hover:scale-125 hover:text-ranting transform origin-left transition-all duration-500">Open Project</Link></li>
                    <li><Link href="https://himtika.cs.unsika.ac.id/hgtc/" target="_blank" className="inline-block mb-2 sm:mb-4 hover:scale-125 hover:text-ranting transform origin-left transition-all duration-500">HGTC</Link></li>
                    <li><Link href="https://himtika.cs.unsika.ac.id/semantik_9/" target="_blank" className="inline-block mb-2 sm:mb-4 hover:scale-125 hover:text-ranting transform origin-left transition-all duration-500">SEMANTIK 9.0</Link></li>
                    <li><Link href="https://himtika.cs.unsika.ac.id/pekan-it/" target="_blank" className="inline-block mb-2 sm:mb-4 hover:scale-125 hover:text-ranting transform origin-left transition-all duration-500">PEKAN IT</Link></li>
                    <li><Link href="https://himtika.cs.unsika.ac.id/lkmmpd/" target="_blank" className="inline-block mb-2 sm:mb-4 hover:scale-125 hover:text-ranting transform origin-left transition-all duration-500">LKMM-PD</Link></li>
                    <li><Link href="https://himtika.cs.unsika.ac.id/diesnatalis/" target="_blank" className="inline-block mb-2 sm:mb-4 hover:scale-125 hover:text-ranting transform origin-left transition-all duration-500">Diesnatalis</Link></li>
                    <li><Link href="https://himtika.cs.unsika.ac.id/it-bootcamp/" target="_blank" className="inline-block mb-2 sm:mb-4 hover:scale-125 hover:text-ranting transform origin-left transition-all duration-500">IT Bootcamp</Link></li>
                  </ul>
                </div>
              </div>

              {/* Aplikasi Publik */}
              <div className="w-full mb-8 text-white flex justify-end md:justify-start lg:justify-end transition-all duration-500">
                <div>
                  <h3 className="font-poppins font-medium md:font-semibold text-white text-base sm:text-lg md:text-xl mb-6">
                    Aplikasi Publik
                  </h3>
                  <ul className="text-sm sm:text-base font-playfair">
                    <li><Link href="https://himtalks.vercel.app/himtalks" target="_blank" className="inline-block mb-2 sm:mb-4 hover:scale-125 hover:text-ranting transform origin-left transition-all duration-500">HIMTALKS</Link></li>
                    <li><Link href="https://himtika.cs.unsika.ac.id/himtika-awards/" target="_blank" className="inline-block mb-2 sm:mb-4 hover:scale-125 hover:text-ranting transform origin-left transition-all duration-500">HIMTIKA Award</Link></li>
                    <li><Link href="https://himtika.cs.unsika.ac.id/studyclub-2024/" target="_blank" className="inline-block mb-2 sm:mb-4 hover:scale-125 hover:text-ranting transform origin-left transition-all duration-500">Study Club</Link></li>
                    <li><Link href="https://himtika.cs.unsika.ac.id/media-partner/" target="_blank" className="inline-block mb-2 sm:mb-4 hover:scale-125 hover:text-ranting transform origin-left transition-all duration-500">Media Partner</Link></li>
                    <li><Link href="https://himtika.cs.unsika.ac.id/corporation/" target="_blank" className="inline-block mb-2 sm:mb-4 hover:scale-125 hover:text-ranting transform origin-left transition-all duration-500">Corporation</Link></li>
                    <li><Link href="https://himtika.cs.unsika.ac.id/corporation/" target="_blank" className="inline-block mb-2 sm:mb-4 hover:scale-125 hover:text-ranting transform origin-left transition-all duration-500">Studio IT</Link></li>
                    <li><Link href="https://himtika.cs.unsika.ac.id/hikode/" target="_blank" className="inline-block mb-2 sm:mb-4 hover:scale-125 hover:text-ranting transform origin-left transition-all duration-500">Hikode</Link></li>
                    <li><Link href="https://himtika.cs.unsika.ac.id/kalender/" target="_blank" className="inline-block mb-2 sm:mb-4 hover:scale-125 hover:text-ranting transform origin-left transition-all duration-500">Kalender</Link></li>
                    <li><Link href="https://himtika.cs.unsika.ac.id/dosen/" target="_blank" className="inline-block mb-2 sm:mb-4 hover:scale-125 hover:text-ranting transform origin-left transition-all duration-500">Profil Tenaga Pendidik</Link></li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

          <div className="w-full pt-6 lg:pt-8 border-t-2 border-white transition-all duration-500">
            <p className="sm:font-medium font-poppins text-sm sm:text-base text-white text-center">
              Licensed, Registered, and Authorized by
              <span className="flex gap-2 mt-1 font-semibold items-center justify-center">
                <Image
                  src="/logo/HIMTIKA.png"
                  width="40"
                  height="40"
                  alt="HIMTIKA"
                />
                HIMTIKA 2026
              </span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
