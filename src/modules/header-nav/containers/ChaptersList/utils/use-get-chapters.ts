import { useState } from "react";
import { ChapterResponseType } from "../../../../../context/chapter-id/ChapterIdContext";
//TODO: move hook higher
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
  response: ChapterResponseType
}

//move out of this file
export const getMangaId = (url: string) => {
  const regex = /manga\/([a-zA-Z0-9-]+)\.(\d+)/;
  const match = url.match(regex);

  if (!match) {
    throw new Error("no such manga");
  }

  return match[2];
};

export const useGetChapters = () => {
  const [data, setData] = useState<ChapterData | null>(null);
  const [loading, setLoading] = useState(true);
  const mangaId = getMangaId(location.pathname);

  const getData = async () => {
    let isMounted = true;

    try {
      const result = await fetch(`https://desu.win/manga/api/${mangaId}`);

      if (!result.body) throw new Error("No response body found");

      const reader = result.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      let accumulatedString = "";

      while (true) {
        const { value, done } = await reader.read();

        if (value) {
          accumulatedString += decoder.decode(value, { stream: true });

          try {
            const parsedResult = JSON.parse(accumulatedString);

            if (isMounted) {
              setData(parsedResult);
            }
          } catch {
            if (!done) {
              console.log("Waiting for more chunks to parse JSON...");
            }
          }
        }

        if (done) break;
      }

      if (isMounted) {
        setLoading(false);
      }
    } catch (err) {
      console.error(err);

      if (isMounted) {
        setLoading(false);
      }
    }

    return () => {
      isMounted = false;
    };
  };

  return { response: data?.response, getData, loading, mangaId };
};
