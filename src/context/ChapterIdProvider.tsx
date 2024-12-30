import { ReactNode, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Chapter,
  useGetChapters,
} from "../modules/header-nav/containers/ChaptersList/utils/use-get-chapters";
import { ChapterIdContext } from "./ChapterIdContext";
import { updateVolAndChUrl } from "../modules/header-nav/utils/update-vol-and-ch-url";

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
  const changePath = useNavigate();
  const [chapterId, setChapterId] = useState<number | null>(null);
  const [chapterInfo, setChapterInfo] = useState<Chapter | null>(null);
  const [nextChapter, setNextChapter] = useState<Chapter | null>(null);
  const [prevChapter, setPrevChapter] = useState<Chapter | null>(null);

  console.log(nextChapter)

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

  const handleChapterChange = (newChapter: Chapter) => {
    const updatedUrl = updateVolAndChUrl({
      url: location.pathname,
      newCh: newChapter.ch,
      newVol: newChapter.vol,
    });
    setChapterId(newChapter.id);
    setChapterInfo(newChapter);
    changePath(updatedUrl);
  };

  return (
    <ChapterIdContext.Provider
      value={{
        chapterId,
        setChapterId,
        chapterInfo,
        setChapterInfo,
        allChapters: response,
        mangaId: Number(mangaId),
        setNextChapter,
        setPreviousChapter: setPrevChapter,
        prevChapter,
        nextChapter,
        handleChapterChange,
      }}
    >
      {children}
    </ChapterIdContext.Provider>
  );
};
