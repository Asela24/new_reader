import { useState } from "react";
import { useCookies } from "react-cookie";

const themes = {
  classic: {
    name: "Классическая",
    cookie: "classic",
  },
  alternative: {
    name: "Альтернативная",
    cookie: "alternative",
  },
  modern: {
    name: "Современная",
    cookie: "modern",
  },
  dev: {
    name: "Разработка",
    cookie: "dev",
  },
};

export const ThemeSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTheme] = useState(themes.dev.name);
  const [_, setCookie] = useCookies(["read_theme"]);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectTheme = (cookie: string) => {
    setCookie("read_theme", cookie, {
      path: "/",
    });

    location.reload()
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="text-white">Сменить тему</div>
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="w-full flex items-center justify-between px-4 py-2 text-gray-300 text-sm rounded-lg border border-bg-[#1d78b7] focus:ring-2 hover:bg-[#1d78b7]"
        >
          {selectedTheme}
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <ul className="absolute mt-2 w-full bg-[#2e3336] border rounded-lg shadow-lg divide-y divide-[#165a8b2d] text-gray-300 z-10">
            {Object.values(themes).map((theme) => (
              <li
                key={theme.name}
                onClick={() => selectTheme(theme.cookie)}
                className={`px-4 py-2 cursor-pointer ${
                  selectedTheme === theme.name
                    ? "bg-[#1d78b7]"
                    : "hover:bg-[#1d77b734]"
                }`}
              >
                {theme.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
