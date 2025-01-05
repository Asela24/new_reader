import { useRef } from "react";
import { useChapter } from "./utils/use-chapter";
import { ImageItem } from "./components/ImageItem/ImageItem";
//action => url change => take all these actions on url change
export const ReadContent = () => {
  const pagesRef = useRef<HTMLDivElement | null>(null);
  const { data } = useChapter();

  const pages = data?.response?.pages;
  const imgUrl = pages?.list.map((item) => item.img);

  const handleScrollToNextPage = (index: number) => {
    if (!pagesRef.current) return;

    const images = pagesRef.current.querySelectorAll("img");

    if (index + 1 < images.length) {
      images[index + 1].scrollIntoView({
        behavior: "auto",
        block: "start",
      });
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
          handleScrollToPreviousPage={handleScrollToPreviousPage}
          link={imgLink}
          index={index}
          key={index}
          handleScrollToNextPage={handleScrollToNextPage}
        />
      ))}
    </div>
  );
};
