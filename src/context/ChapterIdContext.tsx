import {
  createContext,
} from "react";
import {
  Chapter,
} from "../modules/header-nav/containers/ChaptersList/utils/use-get-chapters";

type ResponseType =
  | {
      chapters: {
        list: Chapter[];
      };
    }
  | undefined;

export const ChapterIdContext = createContext<{
  chapterId: number | null;
  setChapterId: React.Dispatch<React.SetStateAction<number | null>>;
  chapterInfo: Chapter | null;
  setChapterInfo: React.Dispatch<React.SetStateAction<Chapter | null>>;
  allChapters: ResponseType;
  mangaId: number;
} | null>(null);

