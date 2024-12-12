import { ChevronLeft } from "./assets/ChevronLeft";
import { ChevronRight } from "./assets/ChevronRight";

export const Switcher = () => {
  return (
    <div className="flex gap-4 items-center text-white">
      <ChevronLeft />
      1 - 1
      <ChevronRight />
    </div>
  );
};
