import Hero from "@/components/Hero";
import HeroStatement from "@/components/HeroStatement";
import Nav from "@/components/Nav";
import Philosophy from "@/components/Philosophy";
import Properties from "@/components/Properties";

export default function Home() {
  return (
    <>
      <Nav />
      {/* Clears the fixed bar, which sits outside the flow. */}
      <main className="flex flex-1 flex-col pt-nav">
        <Hero />
        <HeroStatement />
        <Philosophy />
        <Properties />
      </main>
    </>
  );
}
