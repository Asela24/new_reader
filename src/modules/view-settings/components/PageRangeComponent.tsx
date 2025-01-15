import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { changePageSize } from "../../../store/viewSettingsSlice";

const RangeComponent = () => {
  const dispatch = useAppDispatch();
  const size = useAppSelector((state) => state.viewSettings.pageSize);

  const handleChange = (value: number) => {
    dispatch(changePageSize(value));
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="text-white">Размер страницы: {size}%</div>
      <input
        type="range"
        min={10}
        max={100}
        value={size}
        onChange={(e) => handleChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
};

export default RangeComponent;
