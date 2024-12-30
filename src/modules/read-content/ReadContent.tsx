import { useEffect, useRef } from "react";
import { useChapter } from "./utils/use-chapter";
import { useChapterIdContext } from "../../context/useChapterIdContext";
import { ImageItem } from "./components/ImageItem/ImageItem";

export const ReadContent = () => {
  const pagesRef = useRef<HTMLDivElement | null>(null);
  const { chapterId, mangaId, setNextChapter, setPreviousChapter } =
    useChapterIdContext();
  const { data, loading } = useChapter({
    id: chapterId,
    mangaId,
  });
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

  useEffect(() => {
    if (!loading) {
      setNextChapter(data?.response?.pages?.ch_next ?? null);
    }
  }, [loading, data?.response?.pages?.ch_next, setNextChapter]);

  useEffect(() => {
    if (!loading) {
      setPreviousChapter(data?.response?.pages?.ch_prev ?? null);
    }
  }, [loading, data?.response?.pages?.ch_prev, setPreviousChapter]);

  if (loading && !data?.response) {
    return (
      <div className="flex items-center justify-center">
        <div className="spinner w-12 h-12 rounded-full border-4 border-t-[#1d78b7] border-gray-200 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center" ref={pagesRef}>
      {imgUrl?.map((imgLink, index) => (
        <ImageItem
          link={imgLink}
          index={index}
          key={index}
          handleScrollToNextPage={handleScrollToNextPage}
        />
      ))}
    </div>
  );
};
