import { useEffect, useRef } from "react";
import { useChapterIdContext } from "../../../../context/useChapterIdContext";
import { ListItem } from "./components/ListItem";
import { Chapter } from "./utils/use-get-chapters";

export const ChaptersList = () => {
   const listRef = useRef<HTMLUListElement | null>(null);
  const { allChapters, chapterId, handleChapterChange } = useChapterIdContext();

  const handleChapterSelection = (chapterInfo: Chapter) => {
    handleChapterChange(chapterInfo);
  };

  useEffect(() => {
    if (!listRef.current || !chapterId) return;

    const selectedElement = listRef.current.querySelector(`[data-selected="${chapterId}"]`)

    if (selectedElement) {
      selectedElement.scrollIntoView({
        block: 'end'
      });
    }

  }, [])

  return (
    <ul className="text-white max-h-[40vh] overflow-y-auto scrollbar-hide flex flex-col gap-y-[4px] cursor-pointer" ref={listRef}>
      {allChapters?.chapters.list.map((chapter) => (
        <ListItem
          chapterInfo={chapter}
          key={chapter.id}
          selected={chapterId === chapter.id}
          handleChapterSelection={handleChapterSelection}
        />
      ))}
    </ul>
  );
};
