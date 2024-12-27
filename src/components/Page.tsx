import { Footer } from "./Footer/Footer";
import { NavBar } from "../modules/header-nav/components/NavBar/NavBar";
import { MainContent } from "./MainContent/MainContent";

import { BrowserRouter } from "react-router-dom";
import { ChapterIdProvider } from "../context/ChapterIdProvider";

export const Page = () => {
  return (
    <BrowserRouter>
      <div className="h-[100vh] flex flex-col">
        <ChapterIdProvider>
          <NavBar />
          <MainContent />
        </ChapterIdProvider>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
