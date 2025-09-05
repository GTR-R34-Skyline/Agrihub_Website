// app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Suspense } from "react";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "AgriHub",
  description: "Empowering Agriculture with AI & Community",
  generator: "v0.app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${jetbrainsMono.variable} antialiased`}>
      <head>
        {/* Add Geist Mono Google Fonts link */}
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
          <main className="min-h-[calc(100dvh-56px)]">{children}</main>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
