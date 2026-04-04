import "./himtalks/globals.css";
import { Cormorant_Garamond, Poppins, Playfair_Display } from "next/font/google";

export const metadata = {
  title: "HIMTALKS ー HIMTIKA ー Himpunan Mahasiswa Informatika UNSIKA",
  description: "HIMTIKA Talks",
  icons: {
    icon: "/logo/himtalks-logo.webp",
  },
};

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400","500","600","700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});
export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400","500","600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${playfair.variable} ${cormorant.variable} ${poppins.variable}`}>
      <body className={`flex flex-col min-h-screen bg-[var(--background)] text-[var(--foreground)]`}>
        {children}
      </body>
    </html>
  );
}