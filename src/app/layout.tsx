import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import ClickSpark from "@/components/ui/ClickSpark";

// Fallback for the licensed Gustavo face — see the @font-face block in globals.css.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Triya Group | Hotels & Managed Living",
  description:
    "Triya Group manages a portfolio of hotels and premium paying-guest residences built around comfort, consistency and considered design.",
  // On Vercel, Next resolves these against the deployment URL by itself.
  openGraph: {
    title: "Triya Group | Hotels & Managed Living",
    description: "Hotels and managed residences across Hyderabad. Meals, housekeeping and Wi-Fi already sorted.",
    type: "website",
  },
};

/**
 * Declared rather than left to Next's default so the intent is on the record.
 * `maximumScale`/`userScalable` are deliberately not set: pinch-zoom is an
 * accessibility affordance and capping it fails WCAG 1.4.4.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f6f4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          <div aria-hidden="true" className="site-grain" />
          <SmoothScrollProvider>
            <ClickSpark sparkColor="#c2532c" className="flex flex-1 flex-col">
              {children}
            </ClickSpark>
          </SmoothScrollProvider>
        </body>
    </html>
  );
}
