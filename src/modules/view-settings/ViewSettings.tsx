import RangeComponent from "./components/PageRangeComponent";
import { ThemeSelector } from "./components/ThemeSelector";

export const ViewSettings = () => {
  return (
    <div>
      <ThemeSelector />
      <RangeComponent />;
    </div>
  );
};
