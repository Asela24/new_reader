import { useEffect, useRef } from "react";
import { ListItem } from "./components/ListItem";
import { useChaptersInfoContext } from "../../../../context/chapters-info/useChaptersInfoContext";
import { useHandleChapterChange } from "../../../../hooks/use-handle-chapter-change";
import { useLocation } from "react-router-dom";
import { useChapterIdContext } from "../../../../context/chapter-id/useChapterIdContext";

export const ChaptersList = () => {
  const listRef = useRef<HTMLUListElement | null>(null);
  const { allChapters } = useChaptersInfoContext();
  const { chapterId } = useChapterIdContext();
  const location = useLocation();
  const handleChapterChange = useHandleChapterChange();

  useEffect(() => {
    if (!listRef.current) return;

    const selectedElement = listRef.current.querySelector(
      `[data-selected="${chapterId}"]`
    );

    if (selectedElement) {
      selectedElement.scrollIntoView({
        block: "end",
      });
    }
  }, []);

  return (
    <ul
      className="text-white max-h-[40vh] overflow-y-auto scrollbar-hide flex flex-col gap-y-[4px] cursor-pointer"
      ref={listRef}
    >
      {allChapters?.chapters.list.map((chapter) => (
        <ListItem
          {...chapter}
          key={chapter.id}
          selected={chapterId === chapter.id}
          handleChapterSelection={() =>
            handleChapterChange(chapter, location.pathname)
          }
        />
      ))}
    </ul>
  );
};
