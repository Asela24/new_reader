import { Footer } from "./Footer/Footer";
import { MainContent } from "./MainContent/MainContent";
import { NavBar } from "../modules/header-nav/components/NavBar/NavBar";

export const Page = () => {
  return (
    <div>
      <NavBar />
      <MainContent />

      <Footer />
    </div>
  );
};
