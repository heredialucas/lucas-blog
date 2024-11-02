"use client";

import localFont from "next/font/local";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { useStore } from "@/zustand/config";
import { ToastContainer } from "react-toastify";
import CookieBanner from "@/components/ui/cookieBanner";

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

export default function RootLayoutBlogui({ children }) {
  const { isLoading, theme, client } = useStore((state) => state);
  return (
    <html data-theme={theme || client?.theme || "cupcake"} lang="en">
      <body
        id="body-item"
        className={`grid min-h-dvh grid-rows-[auto_1fr_auto] max-w-6xl mx-auto px-6 pt-6 ${
          geistSans.variable
        } ${geistMono.variable} antialiased ${isLoading ? "cursor-wait" : ""} `}
      >
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <CookieBanner />
      </body>
    </html>
  );
}
