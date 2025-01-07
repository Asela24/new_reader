import { memo } from "react";

type ListItemProps = {
  ch: number,
  vol: number,
  id: number,
  selected: boolean;
  handleChapterSelection: () => void;
};

export const ListItem = memo(({ ch, vol, id, selected, handleChapterSelection }: ListItemProps) => {
  return (
    <li
      className={`h-[50px] ${
        selected ? "bg-[#1d78b7]" : "bg-neutral-950"
      } text-white rounded-md flex items-center p-[16px]`}
      onClick={handleChapterSelection}
      data-selected={id}
    >
      Том {vol}. Глава {ch}
    </li>
  );
});
