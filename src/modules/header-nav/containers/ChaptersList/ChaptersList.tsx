import { useState } from "react";

import { ListItem } from "./components/ListItem";
import { Chapter } from "./utils/use-get-chapters";
import { useChapterIdContext } from "../../../../context/ChapterIdContext";
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
  const [chapterId, setChapterId] = useState<null | number>(49481);
  const changePath = useNavigate();

  const {
    setChapterId: setIdContext,
    setChapterInfo,
    allChapters,
  } = useChapterIdContext();

  const handleChapterSelection = (chapterInfo: Chapter) => {
    const updatedUrl = updateVolAndChInPath({
      url: location.pathname,
      newCh: chapterInfo.ch,
      newVol: chapterInfo.vol,
    });

    setChapterId(chapterInfo.id);
    setIdContext(chapterInfo.id);
    setChapterInfo(chapterInfo);
    changePath(updatedUrl);
  };

  return (
    <li className="text-white max-h-[25vh] overflow-y-auto scrollbar-hide flex flex-col gap-y-[4px] cursor-pointer">
      {allChapters?.chapters.list.map((chapter) => (
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
