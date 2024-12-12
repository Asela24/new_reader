import { Footer } from "./Footer/Footer";
import { ReadContent } from "../modules/read-content/ReadContent";
import { NavBar } from "../modules/header-nav/components/NavBar/NavBar";

export const Page = () => {
  return (
    <div>
      <NavBar />
      <ReadContent />

      <Footer />
    </div>
  );
};
