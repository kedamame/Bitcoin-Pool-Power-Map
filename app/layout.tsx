import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/components/LangContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://pool-power-map.vercel.app";

export const metadata: Metadata = {
  title: "Pool Power Map",
  description: "Bitcoin Mining Pool World Distribution — Farcaster MiniApp",
  openGraph: {
    title: "Pool Power Map",
    description: "Bitcoin Mining Pool World Distribution",
    images: [`${APP_URL}/og-image.png`],
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": `${APP_URL}/og-image.png`,
    "fc:frame:button:1": "🗺 View Live Map",
    "fc:frame:button:1:action": "link",
    "fc:frame:button:1:target": APP_URL,
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
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
