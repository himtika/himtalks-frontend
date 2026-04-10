"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { motion, AnimatePresence } from "framer-motion";
import ForumCard from "@/components/ForumCard";
import clsx from 'clsx'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const sortOptions = [
  { id: 1, name: 'Terbaru', value: 'newest' },
  { id: 2, name: 'Terlama', value: 'oldest' },
];

export default function ForumBrowse() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(sortOptions[0]);
  const [isFocused,setIsFocused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [topics, setTopics] = useState([]);

  // 🔥 FETCH DATA
  useEffect(() => {
    async function fetchForums() {
      try {
        const res = await fetch(`${API_BASE}/forums`);
        if (!res.ok) throw new Error("Gagal fetch forum");
        const data = await res.json();
        
        // Map data to standardize image field
        const formatted = data.map(f => ({
          ...f,
          image: f.image_url || f.image
        }));
        
        setTopics(formatted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchForums();
  }, []);

  // 🔍 SEARCH
  const filteredTopics = topics.filter((topic) =>
    topic.title.toLowerCase().includes(search.toLowerCase())
  );

  // 🔽 SORT
  const sortedTopics = [...filteredTopics].sort((a, b) => {
    if (sort.value === "newest") {
      return new Date(b.created_at) - new Date(a.created_at);
    } else {
      return new Date(a.created_at) - new Date(b.created_at);
    }
  });

  // 🔥 UI UTAMA
  return (
    <section className="bg-primaryBG min-h-screen px-6 sm:px-16 lg:px-20 xl:px-23 2xl:px-28 py-20 pt-22 sm:pt-26 lg:pt-32">
      <Link href="/himtalks/mini-forum#latest-discussion" className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 sm:mb-10 md:mb-13 text-darkSage font-cormorant font-extrabold tracking-tight w-fit hover:-translate-x-2 transition-all duration-500">
        <svg className="w-2 h-4 md:w-3 md:h-6" width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M9.99965 19.438L8.95465 20.5L1.28865 12.71C1.10415 12.5197 1.00098 12.2651 1.00098 12C1.00098 11.7349 1.10415 11.4803 1.28865 11.29L8.95465 3.5L9.99965 4.563L2.68165 12L9.99965 19.438Z" fill="#5F6F6C"/>
        </svg>
        <span>Return to mini forum menu</span>
      </Link>

      {/* TITLE */}
      <h1 className="font-playfair italic font-bold max-w-85 md:max-w-full text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-darkSage tracking-tight mt-4 mb-4 sm:mb-2 transition-all duration-500 mx-auto text-center">
          Explore the thoughts shared by others
      </h1>
      <p className="w-[80%] md:max-w-3xl text-center font-cormorant font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-darkSage mt-6 md:mt-8 mx-auto leading-5 sm:leading-6">
          Ada banyak pemikiran yang ingin dibagikan—temukan sudut pandang yang mungkin juga kamu rasakan.
      </p>

      {/* SEARCH */}
      <div className="relative font-poppins mt-10 mb-16 sm:w-full w-[85%] sm:max-w-3xl mx-auto">
          <input
              maxLength={100}
              type="text"
              id="floatingInput"
              placeholder=" "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={()=>setIsFocused(true)}
              onBlur={()=>setIsFocused(false)}
              className="w-full rounded-full px-5 py-3 md:px-6 md:py-4 text-xs sm:text-base border-2 bg-white border-[#ddd] focus:border-primary text-darkSage outline-none"
              autoComplete="off"
          />
          {/* Floating Label */}
          <label
              htmlFor="floatingInput"
              className={`absolute left-4 transition-all py-0.5 px-2 rounded-xl bg-white duration-700 
                  ${isFocused || search ? "-top-2.5 text-xs text-darkSage" : "top-3 md:top-4.5 text-xs sm:text-sm text-darkSage"}`}
          >
              Enter the topic title
          </label>

          <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary p-1.5 md:p-2 rounded-full flex items-center justify-center hover:scale-105 transition cursor-pointer">
              <button type="button" onClick={() => {/* No-op since search works in real-time */}}>
                  <Image src="/icons/search.svg" width={16} height={16} alt="Search icon"/>
              </button>
          </div>
      </div>

      {/* SORT */}
      <div className="mb-5 lg:mb-10 flex justify-end font-playfair">
        {/* Pastikan state 'sort' awalnya adalah sortOptions[0] atau objek yang sesuai */}
        <Listbox value={sort} onChange={setSort}>
          {({ open }) => (
            <div className="relative w-25 md:w-40"> {/* Lebar disesuaikan */}
              <ListboxButton
                className={clsx(
                  "relative w-full p-2 bg-white border border-gray-200 text-darkSage rounded-lg text-xs sm:text-sm text-left focus:outline-none focus:ring-2 focus:ring-primary/20",
                  open ? "ring-2 ring-primary/20" : ""
                )}
              >
                <span className="block truncate font-medium">
                  {sort ? sort.name : "Urutkan..."}
                </span>
                <ChevronDownIcon
                  className={clsx(
                    "pointer-events-none absolute top-2.5 right-2.5 size-4 text-gray-500 transition-transform duration-300",
                    { "rotate-180": open }
                  )}
                  aria-hidden="true"
                />
              </ListboxButton>

              <AnimatePresence>
                {open && (
                  <ListboxOptions
                    static
                    as={motion.div}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-50 w-full mt-2 rounded-xl bg-white shadow-xl border border-gray-100 p-1 focus:outline-none"
                  >
                    {sortOptions.map((option) => (
                      <ListboxOption
                        key={option.id}
                        value={option}
                        className="group flex cursor-pointer items-center gap-2 rounded-lg py-2 px-3 select-none hover:bg-gray-50 transition-colors"
                      >
                        <CheckIcon className="invisible size-4 text-primary group-data-selected:visible" />
                        <div className="text-xs sm:text-sm text-darkSage group-data-selected:font-medium">
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
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-5 lg:gap-10">
        {sortedTopics.map((topic) => (
          <ForumCard key={topic.id} forum={topic} />
        ))}
      </div>

    </section>
  );
}