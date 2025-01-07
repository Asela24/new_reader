import { Footer } from "./Footer/Footer";
import { NavBar } from "../modules/header-nav/components/NavBar/NavBar";
import { MainContent } from "./MainContent/MainContent";

import { BrowserRouter } from "react-router-dom";
import { ChapterIdProvider } from "../context/chapter-id/ChapterIdProvider";
import { ChapterInfoProvider } from "../context/chapters-info/ChaptersInfoProvider";

export const Page = () => {
  return (
    <div className="h-[100%] flex flex-col">
      <BrowserRouter>
        <ChapterInfoProvider>
          <ChapterIdProvider>
            <NavBar />
            <MainContent />
          </ChapterIdProvider>
        </ChapterInfoProvider>
          <Footer />
      </BrowserRouter>
    </div>
  );
};
