"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <>
      <nav className="flex items-center justify-between p-6 bg-[#9BCAF2] rounded-xl font-semibold">
        <div className="space-x-6 text-gray-800">
          <Link
            href="/home"
            className={`${
              pathname === "/home" ? "underline" : ""
            } mr-2 h-4 w-4 text-gray-800 hover:underline`}
          >
            Home
          </Link>
        </div>
        <div className="space-x-6 text-gray-800">
          <Link
            href="/jobs"
            className={`${
              pathname === "/jobs" ? "underline" : ""
            } mr-2 h-4 w-4 text-gray-800 hover:underline`}
          >
            Timeline Jobs
          </Link>
          <Link
            href="/blog"
            className={`${
              pathname === "/blog" ? "underline" : ""
            } mr-2 h-4 w-4 text-gray-800 hover:underline`}
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className={`${
              pathname === "/contact" ? "underline" : ""
            } mr-2 h-4 w-4 text-gray-800 hover:underline`}
          >
            Contact
          </Link>
        </div>
      </nav>
    </>
  );
}
