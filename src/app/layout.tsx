import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amazon Bulletin",
  description: "Intelligence feed per venditori Amazon — powered by AI",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${spaceMono.variable} h-full`}>
      <body className="min-h-full bg-black text-white scanlines" style={{ fontFamily: "var(--font-space-mono), monospace" }}>
        <div className="scan-beam" />
        {children}
      </body>
    </html>
  );
}
