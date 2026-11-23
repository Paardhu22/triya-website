import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Nav from "@/components/Nav";
import RegistrationForm from "@/components/RegistrationForm";
import { BRAND } from "@/data/brand";
import { properties } from "@/data/properties";
import { getAcceptingSlugs } from "@/lib/registration";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const property = properties.find((p) => p.slug === slug);
  return { title: property ? `Register at ${property.name} | Triya Group` : "Register | Triya Group", robots: { index: false } };
}

export default async function RegisterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = properties.find((p) => p.slug === slug);
  if (!property) notFound();
  const open = (await getAcceptingSlugs()).includes(slug);

  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="flex flex-1 flex-col pt-nav outline-none">
        <div className="section-shell py-[max(3rem,10svh)]">
          <p className="text-[10px] font-medium tracking-[0.28em] text-foreground/45 uppercase">
            {property.location} · {property.kind}
          </p>
          <h1 className="mt-4 text-[clamp(2rem,5.5vw,4.5rem)] leading-[0.98] font-medium tracking-[-0.045em] text-pretty">
            Register at {property.name}
          </h1>
          <div className="mt-12 max-w-2xl">
            {open ? (
              <>
                <p className="mb-10 max-w-[48ch] text-[16px] leading-[1.6] text-foreground/70">
                  Tell us who you are and when you would like to move in. The property team reviews every request and will contact you.
                </p>
                <RegistrationForm slug={slug} propertyName={property.name} contactEmail={BRAND.email} />
              </>
            ) : (
              <div className="border-t border-line pt-8">
                <p className="text-[clamp(1.2rem,2.2vw,1.75rem)] leading-[1.3] font-medium tracking-[-0.03em]">
                  Online registration is not open for {property.name} yet.
                </p>
                <p className="mt-4 text-[16px] text-foreground/65">
                  Please contact us directly:{" "}
                  <a className="underline underline-offset-4" href={BRAND.phoneHref}>{BRAND.phone}</a>
                  {" · "}
                  <a className="underline underline-offset-4" href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
                </p>
                <Link href="/" className="focus-ring mt-8 inline-block text-[11px] font-medium tracking-[0.28em] uppercase underline underline-offset-8">Back to Triya</Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
