import { ReactNode, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Chapter,
  getMangaId,
} from "../../modules/header-nav/containers/ChaptersList/utils/use-get-chapters";
import { ChapterIdContext } from "./ChapterIdContext";
import { useChaptersInfoContext } from "../chapters-info/useChaptersInfoContext";

//pass chapterID here
interface ChapterIdProviderProps {
  children: ReactNode;
}

//TODO: вынести это в верхний компонент чтобы оно не было null (page component)
const getChapterIdInitalLoading = (pathname: string) => {
  const volRegex = /vol(\d+)/;
  const cpRegex = /ch(\d+(\.\d+)?)/;

  const volMatch = pathname.match(volRegex);
  const cpMatch = pathname.match(cpRegex);

  return {
    vol: volMatch ? Number(volMatch[1]) : null, // Extracts the number after 'vol'
    cp: cpMatch ? Number(cpMatch[1]) : null, // Extracts the number after 'ch'
  };
};

export const ChapterIdProvider: React.FC<ChapterIdProviderProps> = ({
  children,
}) => {
  const location = useLocation();
  const [chapterId, setChapterId] = useState<number | null>(null);
  const [chapterInfo, setChapterInfo] = useState<Chapter | null>(null);
  const [nextChapter, setNextChapter] = useState<Chapter | null | -1>(null);
  const [prevChapter, setPrevChapter] = useState<Chapter | null | -1>(null);
  const mangaId = getMangaId(location.pathname);

  const { allChapters, loading } = useChaptersInfoContext();

  //think about this!
  useEffect(() => {
    if (!allChapters?.chapters.list && !loading) return;

    const result = getChapterIdInitalLoading(location.pathname);
    if (allChapters?.chapters?.list) {
      const selectedChapter = allChapters.chapters.list.find(
        (chapter) => chapter.ch === result.cp && chapter.vol === result.vol
      );

      if (selectedChapter?.id === null || selectedChapter?.id === undefined) {
        throw new Error("No chapter id");
      }
      // Set the selected chapter ID, defaulting to null if not found
      setChapterId(selectedChapter.id);
      setChapterInfo(selectedChapter);
    }
  }, [allChapters?.chapters.list, loading, location.pathname]);

  return (
    <ChapterIdContext.Provider
      value={{
        chapterId,
        setChapterId,
        chapterInfo,
        setChapterInfo,
        mangaId: Number(mangaId),
        setNextChapter,
        setPreviousChapter: setPrevChapter,
        prevChapter,
        nextChapter,
      }}
    >
      {children}
    </ChapterIdContext.Provider>
  );
};
