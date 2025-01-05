import { useRef, useState } from "react";
import { useChapter } from "./utils/use-chapter";
import { ImageItem } from "./components/ImageItem/ImageItem";
import { useChapterIdContext } from "../../context/useChapterIdContext";
// import { useLocation, useNavigate } from "react-router-dom";

// const getHash = (hash: string) => {
//   const regex = /=.*?(\d+)/;
//   const match = hash.match(regex);

//   if (match) {
//     return Number(match[1]);
//   }
// };

//action => url change => take all these actions on url change
export const ReadContent = () => {
  const pagesRef = useRef<HTMLDivElement | null>(null);
  const imagesLoading = useRef(0);
  const { data } = useChapter();
  const { nextChapter, handleChapterChange } = useChapterIdContext();
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  const pages = data?.response?.pages;
  const imgUrl = pages?.list.map((item) => item.img);

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

      handleChapterChange(nextChapter);
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
        <div
          className={`fixed top-[50%] left-[50%] h-full min-h-[700px] justify-center items-center w-full`}
        >
          <div className="spinner w-12 h-12 rounded-full border-4 border-t-[#1d78b7] border-gray-200 animate-spin"></div>
        </div>
      )}
    </div>
  );
};
