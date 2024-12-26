import { useChapterIdContext } from "../../../../context/ChapterIdContext";
import { ChevronLeft } from "./assets/ChevronLeft";
import { ChevronRight } from "./assets/ChevronRight";

type SwitcherProps = {
  handleChapterListOpens: () => void;
};

export const Switcher = ({ handleChapterListOpens }: SwitcherProps) => {
  const { chapterInfo } = useChapterIdContext();
  return (
    <div className="flex gap-4 items-center text-white">
      <ChevronLeft />
      <div className="cursor-pointer" onClick={handleChapterListOpens}>
        {chapterInfo ? `${chapterInfo.vol} - ${chapterInfo.ch}` : "1 - 1"}
      </div>
      <ChevronRight />
    </div>
  );
};
