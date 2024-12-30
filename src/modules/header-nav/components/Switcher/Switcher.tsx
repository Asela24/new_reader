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

  const handleChapterChangeClick = (chapter: Chapter | null) => {
    if (!chapter) return;

    handleChapterChange(chapter);
  };

  return (
    <div className="flex gap-4 items-center text-white">
      <button
        className="bg-none"
        onClick={() => handleChapterChangeClick(prevChapter)}
      >
        <ChevronLeft />
      </button>
      <div className="cursor-pointer" onClick={handleChapterListOpens}>
        {chapterInfo ? `${chapterInfo.vol} - ${chapterInfo.ch}` : null}
      </div>
      <button
        className="bg-none"
        onClick={() => handleChapterChangeClick(nextChapter)}
      >
        <ChevronRight />
      </button>
    </div>
  );
};
