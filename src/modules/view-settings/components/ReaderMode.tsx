import {
  Option,
  Selector,
} from "../../header-nav/components/Selector/Selector";
import { PageImage } from "../assets/PageImage";
import { VerticalImage } from "../assets/VerticalImage";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  changeReaderMode,
  ReaderModeType,
} from "../../../store/viewSettingsSlice";

const modes = {
  [ReaderModeType.Page]: {
    name: "Страница",
    key: ReaderModeType.Page,
  },
  [ReaderModeType.Vertical]: {
    name: "Вертикально",
    key: ReaderModeType.Vertical,
  },
} as const;

export const ReaderMode = () => {
  const dispatch = useAppDispatch();
  const currentReaderMode = useAppSelector(
    (state) => state.viewSettings.readerMode
  );

  const handleOnSelect = (newlySelectedMode: Option<ReaderModeType>) => {
    dispatch(changeReaderMode(newlySelectedMode.key));
  };

  const description = (
    <div className="flex flex-col">
      <div className="flex gap-3 items-center">
        <div className="w-[40px]">
          <PageImage />
        </div>
        <span className="text-white text-xs">
          <b>Вертикально</b> - изображения подгружаются сразу и листаются сверху
          вниз.
        </span>
      </div>

      <div className="flex gap-3 items-center">
        <div className="w-[40px]">
          <VerticalImage />
        </div>
        <span className="text-white text-xs">
          <b>Страница</b> - классический режим чтения
        </span>
      </div>
    </div>
  );

  console.log(currentReaderMode);
  console.log(modes[currentReaderMode]);

  return (
    <Selector
      label="Режим чтения"
      selectedItem={modes[currentReaderMode]}
      options={Object.values(modes)}
      onSelect={handleOnSelect}
      description={description}
    />
  );
};
