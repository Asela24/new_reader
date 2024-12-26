import { useState } from "react";
import { useLocation } from "react-router-dom";
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

const getMangaId = (url: string) => {
  const regex = /manga\/([a-zA-Z0-9-]+)\.(\d+)/;
  const match = url.match(regex);

  if (!match) {
    throw new Error('no such manga')
  }

  return match[2];
};

export const useGetChapters = () => {
  const [data, setData] = useState<ChapterData | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const mangaId = getMangaId(location.pathname);

  const getData = async () => {
    const result = await fetch(`https://desu.win/manga/api/${mangaId}`);

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

  return { response: data?.response, getData, loading, mangaId };
};
