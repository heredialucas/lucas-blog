"use client";

import { saveTheme } from "@/app/server/actions/saveTheme";
import { Button } from "@/components/ui/button";
import { useStore } from "@/zustand/config";
import { toast } from "react-toastify";
import { themes } from "@/lib/utils";

export default function ThemeClientServer({ domain }) {
  const { theme, setTheme } = useStore((state) => state);

  const handleTheme = async () => {
    const { user } = await saveTheme(theme, domain);
    if (!user) {
      toast.error("Something went wrong");
    }

    toast.success("Saved successfully");
  };

  return (
    <div className="flex gap-6 items-center mx-auto p-4  transition">
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
          className="dropdown-content h-[500px] overflow-auto bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl"
        >
          {themes.map((theme) => (
            <li key={theme.nameLower}>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label={theme.nameUpper}
                value={theme.nameLower}
                onChange={(e) => setTheme(e.target.value)}
              />
            </li>
          ))}
        </ul>
      </div>
      <Button
        className="btn btn-primary"
        onClick={() => handleTheme()}
        disabled={!theme.length}
      >
        Save theme
      </Button>
      {theme.length ? (
        <div>
          <p>Selected theme</p>
          <span className="text-sm bg-primary px-2 py-1 rounded-lg">
            {theme}
          </span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
