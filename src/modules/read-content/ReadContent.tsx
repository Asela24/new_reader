import { Suspense, useEffect, useRef } from "react";
import { useChapter } from "./utils/use-chapter";
import { ImageItem } from "./components/ImageItem/ImageItem";
import { useChapterIdContext } from "../../context/chapter-id/useChapterIdContext";
import { useHandleChapterChange } from "../../hooks/use-handle-chapter-change";
import { useLocation, useNavigate } from "react-router-dom";
import { trackWindowScroll } from "react-lazy-load-image-component";

const getHash = (hash: string) => {
  const regex = /=.*?(\d+)/;
  const match = hash.match(regex);

  if (match?.[1]) {
    return Number(match[1]);
  }

  return null;
};

export const ImageLoader = () => (
  <div className={`fixed z-10 h-full`}>
    <div className="flex justify-center flex-col h-full">
      <div className="w-4 h-4 bg-gray-500 rounded-full animate-bounce"></div>
      <div className="w-4 h-4 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
      <div className="w-4 h-4 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
    </div>
  </div>
);

const ReadContentBase = () => {
  const pagesRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = useChapter();
  const { nextChapter } = useChapterIdContext();
  const handleChapterChange = useHandleChapterChange();

  const images = data?.response?.pages?.list;

  const handleScrollToNextPage = (index: number) => {
    if (!images?.length) return;

    if (images[index + 1]) {
      console.log("1");
      navigate(`#page=${index + 1}`, { replace: true });
    }

    if (index + 1 >= images.length) {
      if (!nextChapter || nextChapter === -1) return;

      handleChapterChange(nextChapter, location.pathname);
    }
  };

  useEffect(() => {
    const currentHash = getHash(location.hash);

    if (!currentHash || !pagesRef.current) return;

    const image = pagesRef?.current.querySelector(`#page-${currentHash}`);

    if (image) {
      image.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    }
  }, [location.hash, images]);

  const handleScrollToPreviousPage = (index: number) => {
    if (images?.[index - 1]) {
      navigate(`#page=${index - 1}`, { replace: true });
    }
  };

  const component = (
    <div className="spinner w-12 h-12 top-0 bottom-0 left-0 right-0 fixed m-auto rounded-full border-4 border-t-[#1d78b7] border-gray-200 animate-spin" />
  );

  return (
    <>
      <Suspense fallback={component}>
        <ImageLoader />
        <div className="flex-col items-center w-full" ref={pagesRef}>
          {images?.map((imgLink, index) => (
            <ImageItem
              handleScrollToPreviousPage={handleScrollToPreviousPage}
              link={imgLink.img}
              info={imgLink}
              index={index}
              key={index}
              handleScrollToNextPage={handleScrollToNextPage}
            />
          ))}
        </div>
      </Suspense>
    </>
  );
};

export const ReadContent = trackWindowScroll(ReadContentBase);
