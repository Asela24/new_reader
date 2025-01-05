import { useState } from "react";

type Props = {
  link: string;
  handleScrollToNextPage: (index: number) => void;
  handleScrollToPreviousPage: (index: number) => void;
  index: number;
  onLoad: () => void;
};

export const ImageItem = ({
  link,
  index,
  handleScrollToNextPage,
  handleScrollToPreviousPage,
  onLoad,
}: Props) => {
  const [loaded, setLoaded] = useState(false);

  const handleOnLoad = () => {
    onLoad();
    setLoaded(true);
  };

  return (
    <div className="w-full relative h-auto flex items-center justify-center">
      <img
        onLoad={handleOnLoad}
        fetchPriority={`${index === 0 ? "high" : "auto"}`}
        src={link}
        onClick={() => handleScrollToNextPage(index)}
        className={`w-full h-auto ${loaded ? "z-10" : "invisible"}`}
      />
      <div
        onClick={() => handleScrollToPreviousPage(index)}
        className={`absolute top-0 left-0 h-full ${
          loaded ? null : "hidden"
        } w-[30%]`}
      />
    </div>
  );
};
