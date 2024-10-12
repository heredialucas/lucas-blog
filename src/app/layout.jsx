"use client";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "../components/custom/nav";
import { useStore } from "@/zustand/config";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const { isLoading } = useStore((state) => state);

  return (
    <html lang="en">
      <body
        id="body-item"
        className={`min-h-screen bg-[#F2F2F2] max-w-6xl mx-auto p-6 ${
          geistSans.variable
        } ${geistMono.variable} antialiased ${
          isLoading ? "cursor-wait" : "cursor-default"
        }`}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
