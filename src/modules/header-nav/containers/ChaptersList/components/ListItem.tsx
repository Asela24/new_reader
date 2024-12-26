import { Chapter } from "../utils/use-get-chapters";
//parse using split method. /manga/my-wife-is-from-a-thousand-years-ago.4072/vol1/ch0.1/rus
//change routing
//update naming
//update current chapter

type ListItemProps = {
  chapterInfo: Chapter;
  selected: boolean;
  handleChapterSelection: (id: Chapter) => void;
};

export const ListItem = ({
  chapterInfo,
  selected,
  handleChapterSelection,
}: ListItemProps) => {
  return (
    <ul
      className={`h-[42px] ${
        selected ? "bg-[#1d78b7]" : "bg-neutral-950"
      } text-white rounded-md flex items-center p-[16px]`}
      onClick={() => handleChapterSelection(chapterInfo)}
    >
      Том {chapterInfo.vol}. Глава {chapterInfo.ch}
    </ul>
  );
};

//То1 - Глава 389
//#1d78b7;
