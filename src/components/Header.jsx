"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const links = [
  { name: "Home", path: "/himtalks" },
  { name: "Songfess", path: "/himtalks/songfess" },
  { name: "Chat Anonym", path: "/himtalks/chat-anonym" },
  { name: "Mini Forum", path: "/himtalks/mini-forum" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const navRef = useRef(null);
  const pathname = usePathname();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // klik di luar navbar
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
        setIsDesktop(true);
      } else {
        setIsDesktop(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // pindah halaman
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="w-full font-cormorant fixed py-5 bg-primary text-white z-20 transition-all px-6 sm:px-16 lg:px-20 xl:px-23 2xl:px-28 lg:py-6 shadow-lg">
      <div className="flex justify-between items-center">

        {/* Logo */}
        <Link
          href="/himtalks"
          className="font-bold text-2xl md:text-3xl lg:text-4xl text-ranting"
          >
          Himtalks
        </Link>

        <div ref={navRef}>
          {/* Hamburger */}
          {!isDesktop && (
            <button
              onClick={toggleNavbar}
              type="button"
              className="block lg:hidden"
            >
              <span
                className={`w-7 h-0.75 my-1.25 rounded-full block bg-white origin-top-left transition duration-300 ${
                  isOpen ? "rotate-45 translate-x-2 -translate-y-0.5" : ""
                }`}
              ></span>
              <span
                className={`w-7 h-0.75 my-1.25 rounded-full block bg-white transition duration-300 ${
                  isOpen ? "scale-0" : ""
                }`}
              ></span>
              <span
                className={`w-7 h-0.75 my-1.25 rounded-full block bg-white origin-bottom-left transition duration-300 ${
                  isOpen ? "-rotate-45 translate-x-2" : ""
                }`}
              ></span>
            </button>
          )}

          {/* Mobile Menu */}
          {!isDesktop && (
            <AnimatePresence>
              {isOpen && (
                <motion.nav
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="absolute transform p-4 sm:p-6 bg-white shadow-lg rounded-xl left-5 right-5 sm:left-16 sm:right-16 top-19.25 md:top-20"
                >
                  <ul className="flex flex-col items-center gap-3 sm:gap-4 text-center">
                    {links.map((link, index) => {
                      const isActive =
                        link.path === pathname ||
                        (link.path.startsWith("/himtalks/songfess") && pathname.startsWith(link.path)) ||
                        (link.path.startsWith("/himtalks/mini-forum") && pathname.startsWith(link.path));

                      return (
                        <Link
                          href={link.path}
                          key={index}
                          className={`w-full rounded-lg py-1 sm:py-2 text-lg transition
                          ${
                            isActive
                              ? "bg-[#7A918D] text-white"
                              : "text-[#3F4F44] hover:bg-[#7A918D] hover:text-white"
                          }`}
                        >
                          <li>{link.name}</li>
                        </Link>
                      );
                    })}
                  </ul>
                </motion.nav>
              )}
            </AnimatePresence>
          )}

          {/* Desktop Menu */}
          {isDesktop && (
            <nav>
              <ul className="flex gap-15 text-center">
                {links.map((link, index) => {
                  const isActive =
                    link.path === pathname ||
                    (link.path.startsWith("/himtalks/songfess") && pathname.startsWith(link.path));

                  return (
                    <li key={index}>
                      <Link
                        href={link.path}
                        className={`text-xl lg:font-medium transition italic ${
                          isActive
                            ? "underline underline-offset-4"
                            : "hover:opacity-80"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}