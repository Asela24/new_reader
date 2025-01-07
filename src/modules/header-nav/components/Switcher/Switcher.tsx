import { useLocation } from "react-router-dom";
import { useChapterIdContext } from "../../../../context/chapter-id/useChapterIdContext";
import { useHandleChapterChange } from "../../../../hooks/use-handle-chapter-change";
import { Chapter } from "../../containers/ChaptersList/utils/use-get-chapters";
import { ChevronLeft } from "./assets/ChevronLeft";
import { ChevronRight } from "./assets/ChevronRight";
//TODO: add some loader and think about errors and edges
type SwitcherProps = {
  handleChapterListOpens: () => void;
};

export const Switcher = ({ handleChapterListOpens }: SwitcherProps) => {
  const { chapterInfo, nextChapter, prevChapter } =
    useChapterIdContext();
  const handleChapterChange = useHandleChapterChange();
  const location = useLocation();

  const emptyPrevChapter = !prevChapter || prevChapter === -1;
  const emptyNextChapter = !nextChapter || nextChapter === -1;

  const handleChapterChangeClick = (chapter: Chapter | null | -1) => {
    if (!chapter || chapter === -1) return;

    handleChapterChange(chapter, location.pathname);
  };

  return (
    <div className="flex gap-4 items-center text-white">
      <button
        className="bg-none active:bg-[#1d78b7] py-1.5 px-1.5 rounded-full"
        onClick={() => handleChapterChangeClick(prevChapter)}
        disabled={emptyPrevChapter}
      >
        <ChevronLeft fill={emptyPrevChapter ? "grey" : undefined} />
      </button>
      <div className="cursor-pointer" onClick={handleChapterListOpens}>
        {chapterInfo ? (
          `${chapterInfo.vol} - ${chapterInfo.ch}`
        ) : (
          <span className="block w-7 h-2 bg-[#2e3336] animate-pulse rounded-full"></span>
        )}
      </div>
      <button
        className="bg-none active:bg-[#1d78b7] py-1.5 px-1.5 rounded-full"
        disabled={emptyNextChapter}
        onClick={() => handleChapterChangeClick(nextChapter)}
      >
        <ChevronRight fill={emptyNextChapter ? "grey" : undefined} />
      </button>
    </div>
  );
};
