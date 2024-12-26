import { useEffect, useState } from "react";

export const useChapter = ({ id, mangaId }: { id: number | null, mangaId: number }) => {
  const [data, setData] = useState<{
    response?: { pages?: { list: { img: string }[] } };
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController()

    const getData = async () => {
      setLoading(true);
      setError(null);
      setData(null)

      try {
        const result = await fetch(`https://desu.win/manga/api/${mangaId}/chapter/${id}`, {
          signal: controller.signal,
        });
        if (!result.body) throw new Error("No response body found");

        const reader = result.body.getReader();
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
          setError((err as Error).message || "An error occurred");
          setLoading(false);
        }
      }
    };

    getData();

    // Cleanup function to set `isMounted` to false
    return () => {
      isMounted = false;
      controller.abort()
    };
  }, [id]);

  return { loading, data, error };
};
