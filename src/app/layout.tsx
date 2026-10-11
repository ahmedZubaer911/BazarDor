import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import BanglaDate from "@/components/BanglaDate";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "বাজার দর | BazarDor",
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর এক নজরে দেখুন।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body>
        <Suspense fallback={<div className="min-h-20" />}>
          <Navbar
            date={
              <Suspense
                fallback={<span className="mt-1 block text-xs text-gray-500" />}
              >
                <BanglaDate />
              </Suspense>
            }
          />
        </Suspense>
        <PriceTicker />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "12px",
              fontSize: "14px",
            },
          }}
        />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
