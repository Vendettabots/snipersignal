// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Orbitron, Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700"]
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "TradeBot | Algorithmic Trading Solutions",
  description: "Next-gen trading automation powered by machine learning",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${spaceGrotesk.variable}`}>
      <body className={cn(
        "min-h-screen bg-black font-sans antialiased",
        spaceGrotesk.className
      )}>
        {children}
      </body>
    </html>
  );
}
