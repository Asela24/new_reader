import RangeComponent from "./components/PageRangeComponent";
import { ReaderMode } from "./components/ReaderMode";
import { ThemeSelector } from "./components/ThemeSelector";

export const ViewSettings = () => {
  return (
    <div className="flex flex-col gap-6">
      <ReaderMode />
      <ThemeSelector />
      <RangeComponent />;
    </div>
  );
};
