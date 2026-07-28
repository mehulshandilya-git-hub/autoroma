import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AutoRoma | Premium Car Fragrances",
  description:
    "Luxury car fragrances crafted for every journey. Transform your drive with AutoRoma's premium mist and hanging collections.",
  keywords: [
    "car fragrance",
    "premium perfume",
    "luxury car accessories",
    "AutoRoma",
    "car perfume",
    "premium car fragrance",
  ],
  openGraph: {
    title: "AutoRoma | Premium Car Fragrances",
    description: "Luxury Has A New Fragrance",
    url: "https://autoroma.in",
    siteName: "AutoRoma",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-black text-white antialiased noise-overlay">
        {children}
      </body>
    </html>
  );
}
