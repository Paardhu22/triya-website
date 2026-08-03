import type { Metadata } from "next";
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
  title: "Triya Group — Hotels & Managed Living",
  description:
    "Triya Group manages a portfolio of hotels and premium paying-guest residences built around comfort, consistency and considered design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
          <SmoothScrollProvider>
            <ClickSpark sparkColor="#c2532c" className="flex flex-1 flex-col">
              {children}
            </ClickSpark>
          </SmoothScrollProvider>
        </body>
    </html>
  );
}
