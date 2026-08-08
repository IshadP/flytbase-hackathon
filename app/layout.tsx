import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NestGen '26 — Autonomous Drone Operations & Physical AI Summit",
  description: "The premier global conference for autonomous drone operations, dock fleets, BVLOS telemetry, and physical AI. Hosted by FlytBase on September 29, 2026.",
  keywords: ["NestGen '26", "FlytBase", "Autonomous Drones", "Drone Dock", "Physical AI", "BVLOS", "DFR"],
  openGraph: {
    title: "NestGen '26 — Autonomous Drone Operations & Physical AI Summit",
    description: "The premier global conference for autonomous drone operations, dock fleets, BVLOS telemetry, and physical AI.",
    type: "website",
    siteName: "NestGen '26",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Single:wght@100..900&family=Bitcount+Grid+Single:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#070709] text-white selection:bg-white/20 selection:text-white">
        {children}
      </body>
    </html>
  );
}
