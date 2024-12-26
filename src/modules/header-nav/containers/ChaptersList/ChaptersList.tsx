import { useState } from "react";
import { ListItem } from "./components/ListItem";
import { Chapter, useGetChapters } from "./utils/use-get-chapters";
import { useChapterIdContext } from "../../../../context/ChapterIdContext";

export const ChaptersList = () => {
  const [chapterId, setChapterId] = useState<null | number>(49481);
  const { response } = useGetChapters();
  const { setChapterId: setIdContext, setChapterInfo } = useChapterIdContext();

  const handleChapterSelection = (chapterInfo: Chapter) => {
    setChapterId(chapterInfo.id);
    setIdContext(chapterInfo.id);
    setChapterInfo(chapterInfo)
  };

  return (
    <li className="text-white max-h-[25vh] overflow-y-auto scrollbar-hide flex flex-col gap-y-[4px] cursor-pointer">
      {response?.chapters.list.map((chapter) => (
        <ListItem
          chapterInfo={chapter}
          key={chapter.id}
          selected={chapterId === chapter.id}
          handleChapterSelection={handleChapterSelection}
        />
      ))}
    </li>
  );
};
