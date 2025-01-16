import { useEffect, useState } from "react";
import { HouseIcon } from "../../assets/HomeIcon";
import { NotificationIcon } from "../../assets/NotificationIcon";
import { SettingIcon } from "../../assets/SettingIcon";
import { WarningIcon } from "../../assets/WarningIcon";
import { Switcher } from "../Switcher/Switcher";
import { ChaptersList } from "../../containers/ChaptersList/ChaptersList";
import { Modal } from "../../../../components/Modal/Modal";
import { ViewSettings } from "../../../view-settings/ViewSettings";

export const NavBar = () => {
  const [chapterListShow, setChapterListShow] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [showHeader, setShowHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleChapterListShow = () => {
    setChapterListShow((value) => !value);
  };

  const handleBackHome = () => {
    const current = window.location.href;

    window.location.href = current.split("/vol")[0];
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  return (
    <nav
      className={`bg-black fixed z-30 w-full ${
        showHeader || modalOpen ? "visible" : "invisible"
      }`}
    >
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
          <button onClick={() => handleModalOpen()}>
            <SettingIcon />
          </button>
        </div>
      </div>

      {chapterListShow && <ChaptersList />}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Настройки"
        children={<ViewSettings />}
      />
    </nav>
  );
};
