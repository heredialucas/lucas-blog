"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { logout } from "@/app/api/util/actions";

export function NavClientSide({ isAdmin }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogOut = () => {
    logout();
  };

  return (
    <>
      <nav className="flex items-center justify-between relative p-6 rounded-xl font-semibold">
        {/* Logo/Home Link */}
        <div className="space-x-6 text-neutral">
          <Link
            href="/home"
            className={`${
              pathname === "/home" ? "underline" : ""
            } mr-2 h-4 w-4  hover:underline`}
          >
            Home
          </Link>
        </div>

        {/* Links que solo se muestran en pantallas medianas en adelante */}
        <div className="space-x-6 text-neutral hidden md:block">
          <Link
            href="/jobs"
            className={`${
              pathname === "/jobs" ? "underline" : ""
            } mr-2 h-4 w-4 text-neutral hover:underline`}
          >
            Timeline Jobs
          </Link>
          {isAdmin && (
            <Link
              href="/admin/create"
              className={`${
                pathname === "/admin/create" ? "underline" : ""
              } mr-2 h-4 w-4 text-neutral hover:underline`}
            >
              Create Post
            </Link>
          )}
          <Link
            href="/blog"
            className={`${
              pathname === "/blog" ? "underline" : ""
            } mr-2 h-4 w-4 text-neutral hover:underline`}
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className={`${
              pathname === "/contact" ? "underline" : ""
            } mr-2 h-4 w-4 text-neutral hover:underline`}
          >
            Contact
          </Link>
          {isAdmin && (
            <Button
              onClick={() => handleLogOut()}
              className="rounded-xl border-2 border-gray-400 hover:bg-gray-500 hover:text-white"
            >
              Sign Out
            </Button>
          )}
        </div>

        {/* Menú hamburguesa para pantallas pequeñas */}
        <div className="block md:hidden">
          <MenuIcon className="h-6 w-6 text-neutral" onClick={handleMenu} />
        </div>
      </nav>

      {/* Menú desplegable para pantallas pequeñas */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-950 bg-opacity-90 z-50 flex flex-col items-start space-y-4 p-8">
          {/* Botón de cierre */}
          <XIcon
            className="h-6 w-6 text-white self-end"
            onClick={() => setMenuOpen(false)}
          />

          <div className="flex flex-col h-full self-center justify-center items-center gap-8 font-semibold">
            <Link
              href="/jobs"
              className={`${
                pathname === "/jobs" ? "underline" : ""
              } block text-white text-xl hover:underline`}
              onClick={() => setMenuOpen(false)} // Cierra el menú al hacer clic
            >
              Timeline Jobs
            </Link>
            {isAdmin && (
              <Link
                href="/admin/create"
                className={`${
                  pathname === "/admin/create" ? "underline" : ""
                } block text-white text-xl hover:underline`}
                onClick={() => setMenuOpen(false)}
              >
                Create Post
              </Link>
            )}
            <Link
              href="/blog"
              className={`${
                pathname === "/blog" ? "underline" : ""
              } block text-white text-xl hover:underline`}
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className={`${
                pathname === "/contact" ? "underline" : ""
              } block text-white text-xl hover:underline`}
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
            {isAdmin && (
              <Button
                onClick={() => handleLogOut()}
                className=" text-white text-xl rounded-xl border-2 border-gray-400 hover:bg-gray-500 hover:text-white"
              >
                Sign Out
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
