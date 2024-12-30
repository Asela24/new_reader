import { useState } from "react";
import { HouseIcon } from "../../assets/HomeIcon";
import { NotificationIcon } from "../../assets/NotificationIcon";
import { SettingIcon } from "../../assets/SettingIcon";
import { WarningIcon } from "../../assets/WarningIcon";
import { Switcher } from "../Switcher/Switcher";
import { ChaptersList } from "../../containers/ChaptersList/ChaptersList";

export const NavBar = () => {
  const [chapterListShow, setChapterListShow] = useState(false);

  const handleChapterListShow = () => {
    setChapterListShow((value) => !value);
  };

  const handleBackHome = () => {
    const current = window.location.href;

    window.location.href = current.split("/vol")[0];
  };

  return (
    <nav className="bg-black">
      <div className="flex justify-between items-center p-2">
        <div className="flex gap-5 items-center">
          <button onClick={() => handleBackHome()}>
            <HouseIcon />
          </button>
          <WarningIcon />
        </div>

        <Switcher handleChapterListOpens={handleChapterListShow} />

        <div className="flex gap-5">
          <NotificationIcon />
          <SettingIcon />
        </div>
      </div>

      {chapterListShow && <ChaptersList />}
    </nav>
  );
};
