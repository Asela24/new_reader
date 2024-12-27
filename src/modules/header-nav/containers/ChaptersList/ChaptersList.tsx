import { useChapterIdContext } from "../../../../context/useChapterIdContext";
import { ListItem } from "./components/ListItem";
import { Chapter } from "./utils/use-get-chapters";

import { useNavigate } from "react-router-dom";

const updateVolAndChInPath = ({
  url,
  newVol,
  newCh,
}: {
  url: string;
  newVol: number;
  newCh: number;
}) => {
  const volRegex = /vol\d+/;
  const chRegex = /ch\d+(\.\d+)?/;

  let updatedPath = url.replace(volRegex, `vol${newVol}`);
  updatedPath = updatedPath.replace(chRegex, `ch${newCh}`);

  return updatedPath;
};

export const ChaptersList = () => {
  const changePath = useNavigate();

  const {
    setChapterId: setIdContext,
    setChapterInfo,
    allChapters,
    chapterId,
  } = useChapterIdContext();

  const handleChapterSelection = (chapterInfo: Chapter) => {
    const updatedUrl = updateVolAndChInPath({
      url: location.pathname,
      newCh: chapterInfo.ch,
      newVol: chapterInfo.vol,
    });
    setIdContext(chapterInfo.id);
    setChapterInfo(chapterInfo);
    changePath(updatedUrl);
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
