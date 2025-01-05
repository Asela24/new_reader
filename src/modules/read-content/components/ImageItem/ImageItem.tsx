import { useState } from "react";

type Props = {
  link: string;
  handleScrollToNextPage: (index: number) => void;
  index: number;
};

export const ImageItem = ({ link, index, handleScrollToNextPage }: Props) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="w-full h-auto flex items-center justify-center aspect-[50/73]">
      <img
        onLoad={() => setLoaded(true)}
        fetchPriority={`${index === 0 ? "high" : "auto"}`}
        src={link}
        onClick={() => handleScrollToNextPage(index)}
        className={`w-full h-auto aspect-[50/73] ${loaded ? null : "hidden"}`}
      />

      <div className={`${loaded ? "hidden" : "flex"}`}>
        <div className="spinner w-12 h-12 rounded-full border-4 border-t-[#1d78b7] border-gray-200 animate-spin"></div>
      </div>
    </div>
  );
};
