import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F3EEE6]">
      
      <Image
        src="/New folder/burung-mikir.svg"
        width={200}
        height={200}
        alt="loading"
        className="mb-4 animate-bounce"
      />

      <div className="w-10 h-10 border-4 border-[#5E6F69] border-t-transparent rounded-full animate-spin"></div>

      <p className="mt-4 text-[#5E6F69] text-sm">
        Menyiapkan diskusi...
      </p>

    </div>
  );
}