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
};

export const ImageItem = ({
  link,
  index,
  info,
  handleScrollToNextPage,
  handleScrollToPreviousPage,
}: Props) => {
  const [loaded, setLoaded] = useState(false);

  const handleOnLoad = () => {
    setLoaded(true);
  };

  return (
    <div
      className={`w-full relative h-auto flex items-center justify-center ${loaded && `z-20`}`}
      id={`page-${String(index)}`}
    >
      <LazyLoadImage
        threshold={2000}
        onLoad={handleOnLoad}
        fetchPriority={`${index === 0 ? "high" : "auto"}`}
        src={link}
        width={info.width}
        height={info.height}
        onClick={() => handleScrollToNextPage(index)}
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
