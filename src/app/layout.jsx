import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import CookieBanner from "@/components/ui/cookieBanner";
import localFont from "next/font/local";
import { useCookie } from "@/hooks/useSignOut";

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

export default async function RootLayoutBlogui({ children }) {
  const { theme } = await useCookie();

  return (
    <html data-theme={theme?.value || "cupcake"} lang="en">
      <body
        id="body-item"
        className={`grid min-h-dvh grid-rows-[auto_1fr_auto] max-w-6xl mx-auto px-6 pt-6 ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ToastContainer
          position="bottom-right"
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
