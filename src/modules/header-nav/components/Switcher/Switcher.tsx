import { useChapterIdContext } from "../../../../context/useChapterIdContext";
import { Chapter } from "../../containers/ChaptersList/utils/use-get-chapters";
import { ChevronLeft } from "./assets/ChevronLeft";
import { ChevronRight } from "./assets/ChevronRight";
//TODO: add some loader and think about errors and edges
type SwitcherProps = {
  handleChapterListOpens: () => void;
};

export const Switcher = ({ handleChapterListOpens }: SwitcherProps) => {
  const { chapterInfo, nextChapter, handleChapterChange, prevChapter } =
    useChapterIdContext();

  const emptyPrevChapter = !prevChapter || prevChapter === -1;
  const emptyNextChapter = !nextChapter || nextChapter === -1;

  const handleChapterChangeClick = (chapter: Chapter | null | -1) => {
    if (!chapter || chapter === -1) return;

    handleChapterChange(chapter);
  };

  return (
    <div className="flex gap-4 items-center text-white">
      <button
        className="bg-none hover:bg-[#1d78b7] py-1.5 px-1.5 rounded-full"
        onClick={() => handleChapterChangeClick(prevChapter)}
        disabled={emptyPrevChapter}
      >
        <ChevronLeft fill={emptyPrevChapter ? "grey" : undefined} />
      </button>
      <div className="cursor-pointer" onClick={handleChapterListOpens}>
        {chapterInfo ? (
          `${chapterInfo.vol} - ${chapterInfo.ch}`
        ) : (
          <span className="block w-20 h-5 bg-[#1d78b7] animate-pulse rounded-full"></span>
        )}
      </div>
      <button
        className="bg-none hover:bg-[#1d78b7] py-1.5 px-1.5 rounded-full"
        disabled={emptyNextChapter}
        onClick={() => handleChapterChangeClick(nextChapter)}
      >
        <ChevronRight fill={emptyNextChapter ? "grey" : undefined} />
      </button>
    </div>
  );
};
