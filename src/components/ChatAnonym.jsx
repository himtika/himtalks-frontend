"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react"; // ✅ tambah useEffect
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { motion, AnimatePresence } from "framer-motion";
import clsx from 'clsx'

// API base URL
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// object untuk isi dropdown Kategori Pesan
const pilihan = [
    { id: 1, name: 'Kritik', value: 'kritik' },
    { id: 2, name: 'Saran', value: 'saran' }
]

export default function ChatAnonym() {

    // State form and UI

    const [isClicked, setIsClicked] = useState(false);
    const [selected, setSelected] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        recipient: "",
    });
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
    const textareaRef = useRef(null);

    // ================= KODE LU (GA DIUBAH) =================

    const handleChangeDiscard = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleDiscard = () => {
        setFormData({ name: "", recipient: ""});
        setSelected(null);
        setMessage("");
        textareaRef.current.style.height = "auto";
        setIsClicked(true);
        
        setTimeout(() => {
            setIsClicked(false);
        }, 2000)
    };

    const handleChange = (e) => {
        setMessage(e.target.value);
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!message.trim()) {
            alert("Pesan tidak boleh kosong");
            return;
        }
        
        if (!selected) {
            alert("Silakan pilih kategori pesan");
            return;
        }
        
        setIsSubmitting(true);
        setSubmitStatus(null);
        
        try {
            const response = await fetch(`${API_BASE}/message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: message,
                    sender_name: formData.name || "Anonymous",
                    recipient_name: formData.recipient || "HIMTI",
                    category: selected.value,
                }),
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const result = await response.json();
            console.log("Message submitted successfully:", result);
            
            setFormData({ name: "", recipient: "" });
            setSelected(null);
            setMessage("");
            textareaRef.current.style.height = "auto";
            
            setSubmitStatus('success');
            setTimeout(() => setSubmitStatus(null), 5000);
            
        } catch (error) {
            console.error("Error submitting message:", error);
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(null), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <section className="pt-34 lg:pt-44 pb-28 px-6 sm:px-16 lg:px-20 xl:px-23 2xl:px-28 bg-primaryBG text-[#5E6F64] selection:bg-darkSage selection:text-white">
                <h1 className="font-playfair italic font-bold max-w-70 md:max-w-full text-4xl md:text-5xl xl:text-6xl text-darkSage mt-4 mb-4 sm:mb-2 transition-all duration-500 mx-auto text-center">
                    Speak freely, stay anonymous
                </h1>
                <p className="w-[80%] text-center font-cormorant font-semibold text-sm sm:text-lg lg:text-xl xl:text-2xl text-darkSage mt-6 md:mt-8 mx-auto sm:leading-6">
                    Kirimkan pesanmu tanpa mengungkap identitas melalui fitur Pesan Anonim
                </p>

                <div className="relative bg-[#7D9A8B] w-[90%] sm:w-full sm:max-w-125 mt-18 md:mt-20 pt-12 pb-8 px-5 sm:px-8 py-10 text-white rounded-2xl mx-auto shadow-lg">
                    {/* Existing SVG/Image components */}
                    <Image
                        src="/chatanonym/bird-ca-1.svg"
                        width="210"
                        height="256"
                        alt="bird-illustrasion"
                        className="absolute w-30 sm:w-50 h-50 z-10 -top-25 -left-12 sm:-top-20 sm:-left-20 transition-all duration-500"
                    />
                    <Image
                        src="/chatanonym/bird-ca-2.svg"
                        width="105"
                        height="128"
                        alt="bird-illustrasion"
                        className="absolute w-30 sm:w-50 h-50 z-10 -top-25 -right-10 sm:-top-20 sm:-right-20 transition-all duration-500"
                    />
                    <AnimatePresence>
                        {submitStatus === 'success' && (
                            <motion.div 
                                className="z-20 top-22 sticky mb-4 p-3 bg-green-200 text-green-800 rounded-md"
                                initial={{ opacity: 0, y: -10 }} // Mulai dari transparan dan agak ke atas
                                animate={{ opacity: 1, y: 0 }} // Muncul dengan smooth
                                exit={{ opacity: 0, y: -10 }} // Menghilang dengan smooth
                                transition={{ ease: "easeInOut", duration: 0.5 }} // Efek ease-in-out selama 0.5 detik
                            >
                                Pesan berhasil terkirim!
                            </motion.div>
                        )}
                        {submitStatus === 'error' && (
                            <motion.div 
                                className="z-20 top-22 sticky mb-4 p-3 bg-red-200 text-red-800 rounded-md"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ ease: "easeInOut", duration: 0.5 }}
                            >
                                Gagal mengirim pesan. Silakan coba lagi.
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <form onSubmit={handleSubmit}>
                            <div className="w-full font-poppins">
                                <div className="mb-3 sm:mb-6">
                                    <h3 className="text-center font-cormorant italic text-xl sm:text-2xl md:text-3xl mb-0.5 md:mb-2 font-semibold">
                                    Send ur Anonym Chat
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
                                    <label className="text-white font-normal text-xs sm:text-sm selection:bg-white selection:text-darkSage">Enter ur name</label>
                                    <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChangeDiscard}
                                    placeholder="Enter your name..."
                                    className="w-full mt-1 sm:mt-2 p-2 sm:p-3 font-medium text-[10px] sm:text-xs md:text-sm rounded-md bg-white text-gray-700  focus:outline-none"
                                    />
                                </div>
                                <div className="mb-3 sm:mb-6 relative">
                                    <label className="text-white font-normal text-xs sm:text-sm selection:bg-white selection:text-darkSage">Recipient name</label>
                                    <input
                                    type="text"
                                    name="recipient"
                                    value={formData.recipient}
                                    onChange={handleChangeDiscard}
                                    placeholder="Enter recipient name..."
                                    className="w-full mt-1 sm:mt-2 p-2 sm:p-3 font-medium text-[10px] sm:text-xs md:text-sm rounded-md bg-white text-gray-700 focus:outline-none"
                                    />
                                </div>
                                <div className="mb-3 sm:mb-6 relative">
                                    <label className="text-white font-normal text-xs sm:text-sm selection:bg-white selection:text-darkSage">Message category</label>
                                    <Listbox value={selected} onChange={setSelected}>
                                        {/* Existing Listbox implementation */}
                                        {({ open }) => (
                                            <div>
                                                <ListboxButton
                                                    className={clsx(
                                                    "relative w-full mt-1 sm:mt-2 p-2 sm:p-3 bg-white text-gray-500 rounded-md text-[10px] sm:text-xs md:text-sm text-left focus:outline-none",
                                                    selected
                                                    ? "font-medium"
                                                    : "text-gray-400 italic"
                                                )}
                                                >
                                                {selected ? selected.name : "Pilih kategori ..."}
                                                <ChevronDownIcon
                                                    className={clsx(
                                                    "pointer-events-none absolute top-3 right-3 size-4 text-gray-500 transition-transform",
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
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            exit={{ opacity: 0 }}
                                                            transition={{ duration: 1 }}
                                                            className="w-full mt-2 rounded-md bg-white shadow-md p-1 focus:outline-none"
                                                        >
                                                            {pilihan.map((person) => (
                                                                <ListboxOption
                                                                    key={person.id}
                                                                    value={person}
                                                                    className="group flex cursor-pointer items-center gap-2 rounded-lg py-1 px-2 sm:py-1.5 sm:px-2.5 md:py-2 md:px-3 select-none data-focus:bg-gray-100"
                                                                >
                                                                    <CheckIcon className="invisible size-5 text-gray-600 group-data-selected:visible" />
                                                                    <div className="text-[10px] sm:text-xs md:text-sm text-gray-700">{person.name}</div>
                                                                </ListboxOption>
                                                            ))}
                                                        </ListboxOptions>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        )}
                                    </Listbox>
                                </div>
                                <div className="mb-3 sm:mb-6 relative">
                                    <label className="text-white font-normal text-xs sm:text-sm selection:bg-white selection:text-darkSage">
                                        Message
                                    </label>
                                    <textarea
                                        ref={textareaRef}
                                        id="message"
                                        name="message"
                                        placeholder="Type ur message ..."
                                        required
                                        value={message}
                                        onChange={handleChange}
                                        className="w-full mt-1 sm:mt-2 p-2 sm:p-3 rounded-md bg-white text-gray-700 text-[10px] sm:text-xs md:text-sm  resize-none focus:outline-none"
                                        rows={1}
                                    />      
                                </div>
                                <div className="flex w-full gap-4 font-poppins">
                                    <button 
                                        onClick={handleDiscard} 
                                        type="button" 
                                        name="discard" 
                                        className="selection:bg-white selection:text-darkSage text-[10px] sm:text-xs md:text-sm lg:text-base bg-darkSage/50 transition-all duration-500 rounded-md w-full border border-white text-white py-2 hover:bg-white hover:text-darkSage" 
                                    >
                                        Discard
                                    </button>
                                    <button 
                                        type="submit" 
                                        name="submit" 
                                        disabled={isSubmitting}
                                        className="w-full bg-darkSage text-white text-[10px] sm:text-xs md:text-sm lg:text-base py-2 rounded-md border border-darkSage hover:bg-[#4F5E56] hover:border hover:border-white transition-all duration-500"
                                    >
                                        {isSubmitting ? "Mengirim..." : "Submit"}
                                    </button>
                                </div>
                            </div>
                    </form>
                </div>
            </section>
        </>
    );
}