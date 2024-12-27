import { useState } from "react";

type Props = {
  link: string;
  handleScrollToNextPage: (index: number) => void;
  index: number;
};

export const ImageItem = ({ link, index, handleScrollToNextPage }: Props) => {
  const [error, setError] = useState(false);

  if (error) {
    return <div>ERROR</div>;
  }

  return (
    <img
      src={link}
      loading="lazy"
      onClick={() => handleScrollToNextPage(index)}
      onError={() => setError(true)}
    />
  );
};
