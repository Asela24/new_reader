import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export type ImageType = {
  width: number;
  height: number;
  img: string;
};

type Props = {
  info: ImageType;
  link: string;
  handleScrollToNextPage: (index: number) => void;
  handleScrollToPreviousPage: (index: number) => void;
  index: number;
  onLoad: () => void;
};

export const ImageItem = ({
  link,
  index,
  info,
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
      <LazyLoadImage
        onLoad={handleOnLoad}
        fetchPriority={`${index === 0 ? "high" : "auto"}`}
        src={link}
        width={info.width}
        height={info.height}
        onClick={() => handleScrollToNextPage(index)}
      />
      <div className={`absolute${loaded ? `hidden` : ""}`}>
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
      </div>
      <div
        onClick={() => handleScrollToPreviousPage(index)}
        className={`absolute top-0 left-0 h-full ${
          loaded ? null : "hidden"
        } w-[30%]`}
      />
    </div>
  );
};

