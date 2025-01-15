import { createContext } from "react";
import { ChapterResponseType } from "../chapter-id/ChapterIdContext";

export const ChaptersInfoContext = createContext<{
    allChapters: ChapterResponseType | undefined,
    loading: boolean,
} | null>(null)
