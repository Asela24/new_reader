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
  ChapterData,
  useGetChapters,
} from "../modules/header-nav/containers/ChaptersList/utils/use-get-chapters";
import { useLocation } from "react-router-dom";

export const ChapterIdContext = createContext<{
  chapterId: number | null;
  setChapterId: React.Dispatch<React.SetStateAction<number | null>>;
  chapterInfo: Chapter | null;
  setChapterInfo: React.Dispatch<React.SetStateAction<Chapter | null>>;
  allChapters: ResponseType;
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

const getChapterIdInitalLoading = (pathname: string) => {
  console.log(location.pathname);
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
  const { getData, response } = useGetChapters();

  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const result = getChapterIdInitalLoading(location.pathname);

      // Assuming getData is an async function, await it if necessary
      await getData();

      const selectedChapter = response?.chapters.list.filter(
        (chapter) => chapter.ch === result.cp && chapter.vol === result.vol
      )[0];
      setChapterId(selectedChapter?.id || null);
    };

    fetchData();
  }, []);

  return (
    <ChapterIdContext.Provider
      value={{
        chapterId,
        setChapterId,
        chapterInfo,
        setChapterInfo,
        allChapters: response,
      }}
    >
      {children}
    </ChapterIdContext.Provider>
  );
};
