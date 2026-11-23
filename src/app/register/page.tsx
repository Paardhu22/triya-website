import type { Metadata } from "next";
import Link from "next/link";

import Nav from "@/components/Nav";
import { BRAND } from "@/data/brand";
import { properties } from "@/data/properties";
import { getAcceptingSlugs } from "@/lib/registration";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Register | Triya Group", robots: { index: false } };

export default async function RegisterIndex() {
  const open = new Set(await getAcceptingSlugs());
  const list = properties.filter((p) => open.has(p.slug));
  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="flex flex-1 flex-col pt-nav outline-none">
        <div className="section-shell py-[max(3rem,10svh)]">
          <h1 className="text-[clamp(2rem,5.5vw,4.5rem)] leading-[0.98] font-medium tracking-[-0.045em]">Register as a tenant</h1>
          {list.length ? (
            <ul className="mt-12 max-w-2xl">
              {list.map((p) => (
                <li key={p.slug} className="border-t border-line">
                  <Link href={`/register/${p.slug}`} className="focus-ring flex items-baseline justify-between gap-6 py-5 text-[clamp(1.1rem,2vw,1.6rem)] tracking-[-0.025em] transition-opacity hover:opacity-60">
                    <span>{p.name}</span>
                    <span className="text-[11px] tracking-[0.2em] text-foreground/45 uppercase">{p.location}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-10 max-w-[52ch] text-[16px] leading-[1.6] text-foreground/70">
              Online registration is not open yet. Please contact us on{" "}
              <a className="underline underline-offset-4" href={BRAND.phoneHref}>{BRAND.phone}</a> or{" "}
              <a className="underline underline-offset-4" href={`mailto:${BRAND.email}`}>{BRAND.email}</a>.
            </p>
          )}
        </div>
      </main>
    </>
  );
}
