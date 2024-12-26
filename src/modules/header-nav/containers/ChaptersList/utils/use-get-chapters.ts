import { useState } from "react";
//TODO: check why we have 2 requests
export type ChapterFullInfo = {
  ch: number;
  title: number;
  id: number;
  vol: 2;
  nextChapterId: number;
  prevChapterId: number;
};

export type Chapter = {
  ch: number;
  title: number;
  id: number;
  vol: number;
};

export interface ChapterData {
  response: {
    chapters: {
      list: Chapter[];
    };
  };
}

export const useGetChapters = () => {
  const [data, setData] = useState<ChapterData | null>(null);

  const [loading, setLoading] = useState(false);

  const getData = async () => {
    const result = await fetch("https://desu.win/manga/api/2");

    const reader = result.body?.getReader();

    if (!reader?.read) {
      return null;
    }

    const { value } = await reader.read();
    if (value) {
      const result = new TextDecoder("utf-8").decode(value);
      const parsedResult = JSON.parse(result);

      setData(parsedResult);
      setLoading(false);
    }
  };


  return { response: data?.response, getData, loading };
};
