import localFont from "next/font/local";
import "./globals.css";
import { NavServerSide } from "../components/custom/navServerSide";
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
  return (
    <html lang="en" data-theme={"cupcake"}>
      <body
        id="body-item"
        className={`min-h-screen max-w-6xl mx-auto p-6 ${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <NavServerSide />
        {children}
      </body>
    </html>
  );
}
