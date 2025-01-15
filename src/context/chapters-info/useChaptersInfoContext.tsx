import { useContext } from "react";
import { ChaptersInfoContext } from "./ChaptersInfoContext";

export const useChaptersInfoContext = () => {
  const context = useContext(ChaptersInfoContext);

  if (context === null) {
    throw new Error(
      "useChaptersInfoContext must be used within a ChaptersInfoProvider"
    );
  };

  return context;
};
