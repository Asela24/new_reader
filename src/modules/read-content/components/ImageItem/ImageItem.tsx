import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const { ref } = useInView({
    threshold: 0.1,
    onChange: (result) => {
      if (result) {
        navigate(`#page=${index}`, { replace: true });
      }
    },
  });

  const handleOnLoad = () => {
    setLoaded(true);
  };

  return (
    <div
      className={`w-full relative h-auto flex items-center justify-center ${
        loaded && `z-20`
      }`}
      id={`page-${String(index)}`}
    >
      <LazyLoadImage
        threshold={info.height}
        onLoad={handleOnLoad}
        fetchPriority={`${index === 0 ? "high" : "auto"}`}
        src={link}
        width={info.width}
        height={info.height}
        onClick={() => handleScrollToNextPage(index)}
      />
      <div
        ref={ref}
        onClick={() => handleScrollToPreviousPage(index)}
        className={`absolute top-0 left-0 h-full ${
          loaded ? null : "hidden"
        } w-[30%]`}
      />
    </div>
  );
};
