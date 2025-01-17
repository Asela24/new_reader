import { ImageItem, ImageType } from "../ImageItem/ImageItem";

type VerticalReadModeType = {
  images: ImageType[] | undefined;
  handleScrollToPreviousPage: (index: number) => void;
  handleScrollToNextPage: (index: number) => void;
};

export const VerticalReadMode = ({
  images,
  handleScrollToNextPage,
  handleScrollToPreviousPage,
}: VerticalReadModeType) => {
  return (
    <>
      {images?.map((imgLink, index) => (
        <ImageItem
          handleScrollToPreviousPage={handleScrollToPreviousPage}
          link={imgLink.img}
          info={imgLink}
          index={index}
          key={index}
          handleScrollToNextPage={handleScrollToNextPage}
        />
      ))}
    </>
  );
};
