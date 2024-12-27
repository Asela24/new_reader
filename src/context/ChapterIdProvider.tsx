import { ReactNode, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Chapter,
  useGetChapters,
} from "../modules/header-nav/containers/ChaptersList/utils/use-get-chapters";
import { ChapterIdContext } from "./ChapterIdContext";

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
  const [chapterId, setChapterId] = useState<number | null>(null);
  const [chapterInfo, setChapterInfo] = useState<Chapter | null>(null);
  const { getData, response, mangaId, loading } = useGetChapters();

  const location = useLocation();

  console.log(loading);

  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!response?.chapters.list) return;

    const result = getChapterIdInitalLoading(location.pathname);
    if (response?.chapters?.list) {
      const selectedChapter = response.chapters.list.find(
        (chapter) => chapter.ch === result.cp && chapter.vol === result.vol
      );

      if (selectedChapter?.id === null || selectedChapter?.id === undefined) {
        throw new Error("No chapter id");
      }
      // Set the selected chapter ID, defaulting to null if not found
      setChapterId(selectedChapter.id);
    }
  }, [loading]);

  return (
    <ChapterIdContext.Provider
      value={{
        chapterId,
        setChapterId,
        chapterInfo,
        setChapterInfo,
        allChapters: response,
        mangaId: Number(mangaId),
      }}
    >
      {children}
    </ChapterIdContext.Provider>
  );
};
