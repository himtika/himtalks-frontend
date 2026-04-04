import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/ui/PageTransition";
import StairTransition from "@/components/ui/StairTransition";
import BackToHIMTIKA from "@/components/BackToHIMTIKA";

export default function HimtalksLayout({ children }) {
  return (
    <>
      <Header />
      <StairTransition />
      <PageTransition>
        {children}
      </PageTransition>
      <BackToHIMTIKA />
      <Footer />
    </>
  );
}