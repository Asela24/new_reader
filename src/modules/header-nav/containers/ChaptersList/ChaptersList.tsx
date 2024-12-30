import { useChapterIdContext } from "../../../../context/useChapterIdContext";
import { ListItem } from "./components/ListItem";
import { Chapter } from "./utils/use-get-chapters";

export const ChaptersList = () => {
  const { allChapters, chapterId, handleChapterChange } = useChapterIdContext();

  const handleChapterSelection = (chapterInfo: Chapter) => {
    handleChapterChange(chapterInfo);
  };

  return (
    <ul className="text-white max-h-[25vh] overflow-y-auto scrollbar-hide flex flex-col gap-y-[4px] cursor-pointer">
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
