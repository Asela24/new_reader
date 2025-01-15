import { useNavigate } from "react-router-dom";
import { Chapter } from "../modules/header-nav/containers/ChaptersList/utils/use-get-chapters";
import { updateVolAndChUrl } from "../modules/header-nav/utils/update-vol-and-ch-url";
import { useCallback } from "react";

export const useHandleChapterChange = () => {
  const changePath = useNavigate();

  const handleChapterChange = useCallback(
    (newChapter: Pick<Chapter, "ch" | "vol">, pathname: string) => {
      const updatedUrl = updateVolAndChUrl({
        url: pathname,
        newCh: newChapter.ch,
        newVol: newChapter.vol,
      });

      changePath(updatedUrl);
    },
    [changePath]
  );

  return handleChapterChange;
};
