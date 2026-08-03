import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Philosophy from "@/components/Philosophy";

export default function Home() {
  return (
    <>
      <Nav />
      {/* Clears the fixed bar, which sits outside the flow. */}
      <main className="flex flex-1 flex-col pt-[72px]">
        <Hero />
        <Philosophy />
      </main>
    </>
  );
}
