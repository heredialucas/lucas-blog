"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/api/util/actions";
import { toast } from "react-toastify";
import { useStore } from "@/zustand/config";
export function NavClientSide({ isAdmin, isSubscribed, domain }) {
  const pathname = usePathname();
  const { setIsLoading } = useStore((state) => state);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogOut = async () => {
    setIsLoading(true);
    localStorage.clear();
    await logout();
    setIsLoading(false);
    toast.success("Logged out successfully");
  };

  const getLink = (path) => `/${domain}${path}`;

  return (
    <>
      <nav className="flex items-center justify-between relative p-6 rounded-xl font-semibold">
        {/* Logo/Home Link */}
        <div className="space-x-6 text-neutral">
          <Link
            href={`/${domain}`}
            className={`${
              pathname === `/${domain}` ? "underline" : ""
            } mr-2 h-4 w-4  hover:underline`}
          >
            Home
          </Link>
        </div>

        {/* Links que solo se muestran en pantallas medianas en adelante */}
        <div className="space-x-6 text-neutral hidden md:block">
          <Link
            href={getLink("/jobs")}
            className={`${
              pathname.includes(`/${domain}/jobs`) ? "underline" : ""
            } mr-2 h-4 w-4 text-neutral hover:underline`}
          >
            Timeline Jobs
          </Link>
          {isSubscribed && isAdmin && (
            <Link
              href={getLink("/create")}
              className={`${
                pathname.includes(`/${domain}/create`) ? "underline" : ""
              } mr-2 h-4 w-4 text-neutral hover:underline`}
            >
              Create Post
            </Link>
          )}
          {isSubscribed && (
            <Link
              href={getLink("/blog")}
              className={`${
                pathname.includes(`/${domain}/blog`) ? "underline" : ""
              } mr-2 h-4 w-4 text-neutral hover:underline`}
            >
              Blog
            </Link>
          )}
          {isSubscribed && isAdmin && (
            <Link
              href={getLink("/contact")}
              className={`${
                pathname.includes(`/${domain}/contact`) ? "underline" : ""
              } mr-2 h-4 w-4 text-neutral hover:underline`}
            >
              Contact
            </Link>
          )}
          {isAdmin && (
            <Link
              href={`/config/${domain}`}
              className={`${
                pathname === `/config/${domain}` ? "underline" : ""
              } mr-2 h-4 w-4 text-neutral hover:underline`}
            >
              Configuration
            </Link>
          )}
          {isAdmin && (
            <Button
              onClick={() => handleLogOut()}
              className="rounded-xl border-2 border-gray-400 hover:bg-gray-500 hover:text-white"
            >
              Sign Out
            </Button>
          )}
          {!isAdmin && (
            <Link
              href={`/auth/login`}
              className="btn btn-primary rounded-xl border-2 border-gray-400 hover:bg-gray-500 hover:text-white"
            >
              Log in
            </Link>
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
          <XIcon
            className="h-6 w-6 text-white self-end"
            onClick={() => setMenuOpen(false)}
          />

          <div className="flex flex-col h-full self-center justify-center items-center gap-8 font-semibold">
            <Link
              href={getLink("/jobs")}
              className={`${
                pathname.includes(`/${domain}/jobs`) ? "underline" : ""
              } block text-white text-xl hover:underline`}
              onClick={() => setMenuOpen(false)}
            >
              Timeline Jobs
            </Link>
            {isAdmin && isSubscribed && (
              <Link
                href={getLink("/create")}
                className={`${
                  pathname.includes(`/${domain}/create`) ? "underline" : ""
                } block text-white text-xl hover:underline`}
                onClick={() => setMenuOpen(false)}
              >
                Create Post
              </Link>
            )}
            <Link
              href={getLink("/blog")}
              className={`${
                pathname.includes(`/${domain}/blog`) ? "underline" : ""
              } block text-white text-xl hover:underline`}
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </Link>
            {isSubscribed && isAdmin && (
              <Link
                href={getLink("/contact")}
                className={`${
                  pathname.includes(`/${domain}/contact`) ? "underline" : ""
                } block text-white text-xl hover:underline`}
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
            )}
            {isAdmin && (
              <Link
                href={`/config/${domain}`}
                className={`${
                  pathname.includes(`/${domain}/contact`) ? "underline" : ""
                } block text-white text-xl hover:underline`}
                onClick={() => setMenuOpen(false)}
              >
                Configuration
              </Link>
            )}
            {isAdmin && (
              <Button
                onClick={() => handleLogOut()}
                className="text-white text-xl rounded-xl border-2 border-gray-400 hover:bg-gray-500 hover:text-white"
              >
                Sign Out
              </Button>
            )}
            {!isAdmin && (
              <Link
                href={`/auth/login`}
                className="btn btn-primary rounded-xl border-2 border-gray-400 hover:bg-gray-500 hover:text-white"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
