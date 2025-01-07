import { useEffect, useRef, useState } from "react";
import { useChapter } from "./utils/use-chapter";
import { ImageItem } from "./components/ImageItem/ImageItem";
import { useChapterIdContext } from "../../context/chapter-id/useChapterIdContext";
import { useHandleChapterChange } from "../../hooks/use-handle-chapter-change";
import { useLocation } from "react-router-dom";
// import { useLocation, useNavigate } from "react-router-dom";

// const getHash = (hash: string) => {
//   const regex = /=.*?(\d+)/;
//   const match = hash.match(regex);

//   if (match) {
//     return Number(match[1]);
//   }
// };

//action => url change => take all these actions on url change
// add hashing scroll to the page
// change loading
export const ReadContent = () => {
  const pagesRef = useRef<HTMLDivElement | null>(null);
  const imagesLoading = useRef(0);
  const { data } = useChapter();
  const { nextChapter } = useChapterIdContext();
  const location = useLocation();
  const handleChapterChange = useHandleChapterChange();
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  const pages = data?.response?.pages;
  const imgUrl = pages?.list.map((item) => item.img);

  useEffect(() => {
    setAllImagesLoaded(false);
  }, [imgUrl]);

  // useEffect(() => {
  //   if (!imgUrl?.length || !pagesRef.current) return;

  //   const currentHash = getHash(location.hash);
  //   const images = pagesRef.current.querySelectorAll("img");

  //   if (currentHash && currentHash < images.length) {
  //     const images = pagesRef.current.querySelectorAll("img");

  //     images[currentHash].scrollIntoView({
  //       behavior: "auto",
  //       block: "start",
  //     });
  //   }
  // }, [imgUrl]);

  const trackImageLoading = () => {
    if (!imgUrl?.length) return;
    imagesLoading.current += 1;

    if (imagesLoading.current === imgUrl.length - 1) {
      setAllImagesLoaded(true);
    }
  };

  const handleScrollToNextPage = (index: number) => {
    if (!pagesRef.current) return;

    const images = pagesRef.current.querySelectorAll("img");

    if (index + 1 < images.length) {
      images[index + 1].scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    }

    if (index + 1 >= images.length) {
      if (!nextChapter || nextChapter === -1) return;

      handleChapterChange(nextChapter, location.pathname);
    }
  };

  const handleScrollToPreviousPage = (index: number) => {
    if (!pagesRef.current) return;

    const images = pagesRef.current.querySelectorAll("img");

    if (index - 1 >= 0) {
      images[index - 1].scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    }
  };

  return (
    <div className="flex-col items-center w-full" ref={pagesRef}>
      {imgUrl?.map((imgLink, index) => (
        <ImageItem
          onLoad={trackImageLoading}
          handleScrollToPreviousPage={handleScrollToPreviousPage}
          link={imgLink}
          index={index}
          key={index}
          handleScrollToNextPage={handleScrollToNextPage}
        />
      ))}

      {!allImagesLoaded && (
        <div className="spinner w-12 h-12 top-0 bottom-0 left-0 right-0 fixed m-auto rounded-full border-4 border-t-[#1d78b7] border-gray-200 animate-spin"></div>
      )}
    </div>
  );
};
