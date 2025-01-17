import { ReactNode, useState } from "react";

export type Option<T = string> = {
  name: string;
  key: T;
};

export type SelectorProps<T = string> = {
  selectedItem: Option<T>;
  label: string;
  options: Option<T>[];
  onSelect: (item: Option<T>) => void;
  description?: ReactNode;
};

export const Selector = <T = string>({
  selectedItem,
  label,
  options,
  onSelect,
  description,
}: SelectorProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOnSelect = (item: Option<T>) => {
    onSelect(item);
    setIsOpen(false)
  };

  return (
    <div className="flex flex-col space-y-4 gap-1">
      <div className="text-white">{label}</div>
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="w-full flex items-center justify-between px-4 py-2 text-gray-300 text-sm rounded-lg border border-bg-[#1d78b7] focus:ring-2 hover:bg-[#1d78b7]"
        >
          {selectedItem.name as string}
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
          <ul className="absolute mt-0.5 w-full bg-[#2e3336] border rounded-lg shadow-lg divide-y divide-[#165a8b2d] text-gray-300 z-10">
            {Object.values(options).map((item, index) => (
              <li
                key={index}
                onClick={() => handleOnSelect(item)}
                className={`px-4 py-2 cursor-pointer ${
                  selectedItem === item
                    ? "bg-[#1d78b7]"
                    : "hover:bg-[#1d77b734]"
                }`}
              >
                {item.name as string}
              </li>
            ))}
          </ul>
        )}
      </div>
      <p>{description}</p>
    </div>
  );
};
