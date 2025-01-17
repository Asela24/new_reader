import { Suspense, useEffect, useRef, useState } from "react";
import { useChapter } from "./utils/use-chapter";
import { useChapterIdContext } from "../../context/chapter-id/useChapterIdContext";
import { useHandleChapterChange } from "../../hooks/use-handle-chapter-change";
import { useLocation, useNavigate } from "react-router-dom";
import { trackWindowScroll } from "react-lazy-load-image-component";
import { useAppSelector } from "../../store/hooks";
import { VerticalReadMode } from "./components/VerticalReadMode/VerticalReadMode";
import { ReaderModeType } from "../../store/viewSettingsSlice";
import { PageReadMode } from "./components/PageReadMode/PageReadMode";

const getHash = (hash: string) => {
  const regex = /=.*?(\d+)/;
  const match = hash.match(regex);

  if (match?.[1]) {
    return Number(match[1]);
  }

  return 0;
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
  const { pageSize: size, readerMode } = useAppSelector(
    (state) => state.viewSettings
  );
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState(getHash(location.hash));
  const { data } = useChapter();
  const { nextChapter, prevChapter, chapterId } = useChapterIdContext();
  const handleChapterChange = useHandleChapterChange();

  useEffect(() => {
    setSelectedPage(0)
  }, [chapterId])

  const images = data?.response?.pages?.list;

  const handleScrollToNextPage = (index: number) => {
    if (!images?.length) return;

    if (images[index + 1]) {
      navigate(`#page=${index + 1}`, { replace: true });
      setSelectedPage(index + 1);
    }

    if (index + 1 >= images.length) {
      if (!nextChapter || nextChapter === -1) return;

      handleChapterChange(nextChapter, location.pathname);
    }
  };

  useEffect(() => {
    if (!selectedPage || !pagesRef.current) return;

    const image = pagesRef?.current.querySelector(`#page-${selectedPage}`);

    if (image) {
      image.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    }
  }, [images, selectedPage, readerMode]);

  const handleScrollToPreviousPage = (index: number) => {
    if (images?.[index - 1]) {
      navigate(`#page=${index - 1}`, { replace: true });
      setSelectedPage(index - 1);
    }

    if (index - 1 < 0) {
      if (!prevChapter || prevChapter === -1) return;

      handleChapterChange(prevChapter, location.pathname)
    }
  };

  //update this
  const component = (
    <div className="spinner w-12 h-12 top-0 bottom-0 left-0 right-0 fixed m-auto rounded-full border-4 border-t-[#1d78b7] border-gray-200 animate-spin" />
  );

  return (
    <>
      <Suspense fallback={component}>
        <ImageLoader />
        <div
          className="flex-col items-center"
          ref={pagesRef}
          style={{ width: `${size}%` }}
        >
          {readerMode === ReaderModeType.Page ? (
            <PageReadMode
              currentPage={images?.[selectedPage]}
              index={selectedPage}
              handleScrollToNextPage={handleScrollToNextPage}
              handleScrollToPreviousPage={handleScrollToPreviousPage}
            />
          ) : (
            <VerticalReadMode
              images={images}
              handleScrollToNextPage={handleScrollToNextPage}
              handleScrollToPreviousPage={handleScrollToPreviousPage}
            />
          )}
        </div>
      </Suspense>
    </>
  );
};

export const ReadContent = trackWindowScroll(ReadContentBase);
