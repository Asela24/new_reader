import { useRef } from "react";
import { useChapter } from "./utils/use-chapter";
import { useChapterIdContext } from "../../context/ChapterIdContext";

export const ReadContent = () => {
  const pagesRef = useRef<HTMLDivElement | null>(null);
  const { chapterId } = useChapterIdContext();
  const { data, loading } = useChapter({
    id: chapterId ?? 49480,
  });
  const pages = data?.response?.pages;
  console.log(data, loading, chapterId);

  const imgUrl = pages?.list.map((item) => item.img);

  const handleScrollToNextPage = (index: number) => {
    if (!pagesRef.current) return;

    const images = pagesRef.current.querySelectorAll("img");
    console.log(pagesRef.current);
    if (index + 1 < images.length) {
      images[index + 1].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

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
        <img
          src={imgLink}
          key={index}
          onClick={() => handleScrollToNextPage(index)}
        />
      ))}
    </div>
  );
};
