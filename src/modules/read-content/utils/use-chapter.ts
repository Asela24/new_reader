import { useEffect, useState } from "react";
import { Chapter } from "../../header-nav/containers/ChaptersList/utils/use-get-chapters";
import { useChapterIdContext } from "../../../context/chapter-id/useChapterIdContext";
import { ImageType } from "../components/ImageItem/ImageItem";

type ChapterPages = {
  response?: {
    pages?: {
      list: ImageType[];
      ch_prev: Chapter;
      ch_next: Chapter;
    };
  };
};

export const useChapter = () => {
  const { setNextChapter, setPreviousChapter, mangaId, chapterId } = useChapterIdContext();
  const [data, setData] = useState<ChapterPages | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getData = async () => {
      if (!chapterId) {
        return;
      }

      setLoading(true);
      setError(null);
      setData(null);

      try {
        const result = await fetch(
          `https://desu.win/manga/api/${mangaId}/chapter/${chapterId}`,
          {
            signal: controller.signal,
          }
        );
        if (!result.body) throw new Error("No response body found");

        const reader = result.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let accumulatedString = "";

        while (true) {
          const { value, done } = await reader.read();

          if (value) {
            accumulatedString += decoder.decode(value, { stream: true });

            try {
              const parsedResult: ChapterPages = JSON.parse(accumulatedString);

              if (isMounted) {
                setData(parsedResult);
                setNextChapter(parsedResult.response?.pages?.ch_next ?? null);
                setPreviousChapter(
                  parsedResult?.response?.pages?.ch_prev ?? null
                );
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
          setError((err as Error).message || "An error occurred");
          setLoading(false);
        }
      }
    };

    getData();

    // Cleanup function to set `isMounted` to false
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [chapterId, mangaId]);

  return { loading, data, error };
};
