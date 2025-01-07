import { useContext } from "react";
import { ChapterIdContext } from "./ChapterIdContext";

export const useChapterIdContext = () => {
    const context = useContext(ChapterIdContext);
  
    if (context === null) {
      throw new Error(
        "useChapterIdContext must be used within a ChapterIdProvider"
      );
    }
  
    return context;
  };