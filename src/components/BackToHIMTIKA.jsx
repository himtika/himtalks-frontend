"use client";
import "./../app/himtalks/globals.css";

export default function BackToHIMTIKA() {    
    return (
        <>
            <div className="fixed bottom-8 right-9 z-10">
                <a href="https://himtika.cs.unsika.ac.id/">
                    <button className="Btn">
                        <div className="sign">
                            <img
                                src="/logo/HIMTIKA.png"
                                width="40"
                                height="40"
                                alt="HIMTIKA"
                                className="select-none"
                            />  
                        </div>            
                        <div className="text flex justify-center items-center h-full">
                            <h1 className="font-[Plus Jakarta Sans] text-md font-normal leading-1 mt-2">Back To <span className="text-lg font-bold italic">HIMTIKA</span></h1>
                        </div>
                    </button>
                </a>
            </div>
        </>
    );
}