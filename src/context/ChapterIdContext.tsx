/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  Chapter,
  useGetChapters,
} from "../modules/header-nav/containers/ChaptersList/utils/use-get-chapters";
import { useLocation } from "react-router-dom";

export const ChapterIdContext = createContext<{
  chapterId: number | null;
  setChapterId: React.Dispatch<React.SetStateAction<number | null>>;
  chapterInfo: Chapter | null;
  setChapterInfo: React.Dispatch<React.SetStateAction<Chapter | null>>;
  allChapters: ResponseType;
  mangaId: number;
} | null>(null);

export const useChapterIdContext = () => {
  const context = useContext(ChapterIdContext);

  if (context === null) {
    throw new Error(
      "useChapterIdContext must be used within a ChapterIdProvider"
    );
  }

  return context;
};

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

type ResponseType =
  | {
      chapters: {
        list: Chapter[];
      };
    }
  | undefined;
export const ChapterIdProvider: React.FC<ChapterIdProviderProps> = ({
  children,
}) => {
  const [chapterId, setChapterId] = useState<number | null>(null);
  const [chapterInfo, setChapterInfo] = useState<Chapter | null>(null);
  const { getData, response, mangaId, loading } = useGetChapters();

  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const result = getChapterIdInitalLoading(location.pathname);

      await getData();

      if (response?.chapters?.list) {
        const selectedChapter = response.chapters.list.find(
          (chapter) => chapter.ch === result.cp && chapter.vol === result.vol
        );

        // Set the selected chapter ID, defaulting to null if not found
        setChapterId(selectedChapter?.id || null);
      }
    };

    fetchData();
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
