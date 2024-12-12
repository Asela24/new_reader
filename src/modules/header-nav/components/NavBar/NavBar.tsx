import { HouseIcon } from "../../assets/HomeIcon";
import { NotificationIcon } from "../../assets/NotificationIcon";
import { SettingIcon } from "../../assets/SettingIcon";
import { WarningIcon } from "../../assets/WarningIcon";
import { Switcher } from "../Switcher/Switcher";

export const NavBar = () => {
  return (
    <nav className="bg-black p-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <HouseIcon />
          <WarningIcon />
        </div>

        <Switcher />
        <div className="flex gap-5">
          <NotificationIcon />
          <SettingIcon />
        </div>
      </div>
    </nav>
  );
};
//color black
// height - 40px but auto
//
