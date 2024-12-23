import { useEffect, useState } from "react";

const useChapter = () => {
  const [data, setData] = useState<{ response?: { pages?: { list: { img: string }[] } } } | null>(null);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    const result = await fetch("https://desu.me/manga/api/2/chapter/49480", {
      mode: "no-cors",
    });

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

    return null;
  };

  useEffect(() => {
    getData();
  }, []);

  return { loading, data };
};

export const ReadContent = () => {
  const { data } = useChapter();
  const pages = data?.response?.pages;

  const imgUrl = pages?.list.map((item) => item.img);

  console.log(imgUrl);

  console.log(pages);

  return (
    <div>
      {imgUrl?.map((imgLink, index) => (
        <img src={imgLink} key={index}/>
      ))}
    </div>
  );
};
