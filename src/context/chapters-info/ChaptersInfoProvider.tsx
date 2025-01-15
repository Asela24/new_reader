import { ReactNode, useEffect } from "react";
import { useGetChapters } from "../../modules/header-nav/containers/ChaptersList/utils/use-get-chapters";
import { ChaptersInfoContext } from "./ChaptersInfoContext";

type ChapterInfoProvider = {
  children: ReactNode;
};

export const ChapterInfoProvider = ({ children }: ChapterInfoProvider) => {
  const { getData, response, loading } = useGetChapters();

  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };

    fetchData();
  }, []);

  return (
    <ChaptersInfoContext.Provider value={{
        allChapters: response,
        loading,
    }}>{children}</ChaptersInfoContext.Provider>
  );
};
