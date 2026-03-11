import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/components/LangContext";
import FarcasterReady from "@/components/FarcasterReady";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://bitcoin-pool-power-map.vercel.app";

const frameEmbed = {
  version: "next",
  imageUrl: `${APP_URL}/image.png`,
  button: {
    title: "⛏ View Live Map",
    action: {
      type: "launch_frame",
      name: "Pool Power Map",
      url: APP_URL,
      splashImageUrl: `${APP_URL}/splash.png`,
      splashBackgroundColor: "#F7931A",
    },
  },
};

export const metadata: Metadata = {
  title: "Pool Power Map",
  description: "Bitcoin Mining Pool World Distribution — Farcaster MiniApp",
  openGraph: {
    title: "Pool Power Map",
    description: "Bitcoin Mining Pool World Distribution",
    images: [`${APP_URL}/image.png`],
  },
  other: {
    "fc:frame": JSON.stringify(frameEmbed),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-gray-100`}
      >
        <FarcasterReady />
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
