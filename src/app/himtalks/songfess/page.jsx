import SongfessCard from "@/components/SongfessCard";
import SongfessHero from "@/components/SongfessHero";
import SongfessSlideshow from "@/components/SongfessSlideshow";
import Image from "next/image";

export default function Home() {
  return (
      <>
        <SongfessHero />
        <SongfessCard />
        <SongfessSlideshow />
      </>
    );
}
