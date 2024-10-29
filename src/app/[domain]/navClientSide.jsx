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
    await logout(domain);
    setIsLoading(false);
    toast.success("Logged out successfully");
  };

  const getLink = (path) => `/${domain}${path}`;

  return (
    <>
      <nav className="flex items-center justify-between relative p-6 rounded-xl font-semibold">
        {/* Logo/Home Link */}
        <div className="space-x-6 ">
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
        <div className="space-x-6  hidden md:block">
          <Link
            href={getLink("/jobs")}
            className={`${
              pathname.includes(`/${domain}/jobs`) ? "underline" : ""
            } mr-2 h-4 w-4  hover:underline`}
          >
            Timeline Jobs
          </Link>
          {isSubscribed && isAdmin && (
            <Link
              href={getLink("/create")}
              className={`${
                pathname.includes(`/${domain}/create`) ? "underline" : ""
              } mr-2 h-4 w-4  hover:underline`}
            >
              Create Post
            </Link>
          )}
          {isSubscribed && (
            <Link
              href={getLink("/blog")}
              className={`${
                pathname.includes(`/${domain}/blog`) ? "underline" : ""
              } mr-2 h-4 w-4  hover:underline`}
            >
              Blog
            </Link>
          )}
          {((isSubscribed && isAdmin) || domain === "hlucas") && (
            <Link
              href={getLink("/contact")}
              className={`${
                pathname.includes(`/${domain}/contact`) ? "underline" : ""
              } mr-2 h-4 w-4  hover:underline`}
            >
              Contact
            </Link>
          )}
          {isAdmin && (
            <Link
              href={`/config/${domain}`}
              className={`${
                pathname === `/config/${domain}` ? "underline" : ""
              } mr-2 h-4 w-4  hover:underline`}
            >
              Configuration
            </Link>
          )}
          <div className="dropdown ">
            <div tabIndex={0} role="button" className="btn m-1">
              Theme
              <svg
                width="12px"
                height="12px"
                className="inline-block h-2 w-2 fill-current opacity-60"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 2048 2048"
              >
                <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl"
            >
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Cupcake"
                  value="cupcake"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Dark"
                  value="darkMode"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Bumblebee"
                  value="bumblebee"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Retro"
                  value="retro"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Cyberpunk"
                  value="cyberpunk"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Valentine"
                  value="valentine"
                />
              </li>
            </ul>
          </div>
          {isAdmin && (
            <Button
              onClick={() => handleLogOut()}
              className="rounded-xl border-2 border-gray-400  "
            >
              Sign Out
            </Button>
          )}
          {!isAdmin && (
            <Link
              href={`/auth/login`}
              className="btn btn-primary rounded-xl border-2 border-gray-400  "
            >
              Log in
            </Link>
          )}
        </div>

        {/* Menú hamburguesa para pantallas pequeñas */}
        <div className="block md:hidden">
          <MenuIcon className="h-6 w-6 " onClick={handleMenu} />
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
            {((isSubscribed && isAdmin) || domain === "hlucas") && (
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
                className="text-white text-xl rounded-xl border-2 border-gray-400  "
              >
                Sign Out
              </Button>
            )}
            {!isAdmin && (
              <Link
                href={`/auth/login`}
                className="btn btn-primary text-white text-xl rounded-xl border-2 border-gray-400  "
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
