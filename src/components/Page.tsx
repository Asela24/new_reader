import { Footer } from "./Footer/Footer";
import { NavBar } from "../modules/header-nav/components/NavBar/NavBar";
import { MainContent } from "./MainContent/MainContent";
import { ChapterIdProvider } from "../context/ChapterIdContext";

export const Page = () => {
  return (
    <div className="h-[100vh] flex flex-col">
      <ChapterIdProvider>
        <NavBar />
        <MainContent />
      </ChapterIdProvider>
      <Footer />
    </div>
  );
};
