import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import HeroStatement from "@/components/HeroStatement";
import Journey from "@/components/Journey";
import Nav from "@/components/Nav";
import Philosophy from "@/components/Philosophy";
import Properties from "@/components/Properties";

export default function Home() {
  return (
    <>
      <Nav />
      {/* Clears the fixed bar, which sits outside the flow. */}
      <main id="main" tabIndex={-1} className="flex flex-1 flex-col pt-nav outline-none">
        <Hero />
        <Journey />
        <HeroStatement />
        <Philosophy />
        <Properties />
        <Contact />
      </main>
    </>
  );
}
