/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, ReactNode } from "react";
//TODO: change loading to using
export const ChapterIdContext = createContext<{
  chapterId: number | null;
  setChapterId: React.Dispatch<React.SetStateAction<number | null>>;
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

export const ChapterIdProvider: React.FC<ChapterIdProviderProps> = ({
  children,
}) => {
  const [chapterId, setChapterId] = useState<number | null>(null);

  return (
    <ChapterIdContext.Provider value={{ chapterId, setChapterId }}>
      {children}
    </ChapterIdContext.Provider>
  );
};
