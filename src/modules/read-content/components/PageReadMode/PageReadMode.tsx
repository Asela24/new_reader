import { ImageItem, ImageType } from "../ImageItem/ImageItem";

type Props = {
  currentPage?: ImageType;
  index: number;
  handleScrollToPreviousPage: (index: number) => void;
  handleScrollToNextPage: (index: number) => void;
};

export const PageReadMode = ({
  currentPage,
  index,
  handleScrollToNextPage,
  handleScrollToPreviousPage,
}: Props) => {
  if (!currentPage) {
    return;
  }
  return (
    <>
      <ImageItem
        handleScrollToPreviousPage={handleScrollToPreviousPage}
        link={currentPage.img}
        info={currentPage}
        index={index}
        handleScrollToNextPage={handleScrollToNextPage}
      />
    </>
  );
};
