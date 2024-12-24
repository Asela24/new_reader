import { Footer } from "./Footer/Footer";
import { ReadContent } from "../modules/read-content/ReadContent";
import { NavBar } from "../modules/header-nav/components/NavBar/NavBar";
import { useState } from "react";
import { useCookies } from "react-cookie";

export const Page = () => {
  const [checked, setChecked] = useState(false);
  const [cookies, setCookie] = useCookies(['read_theme'])

  const onCheckboxChange = () => {
    setChecked((value) => !value);
    setCookie('read_theme', 'modern')
  };
  return (
    <div>
      <NavBar />

      <div key={cookies.read_theme}>
        <input
          type="checkbox"
          id="scales"
          name="scales"
          checked={checked}
          onChange={onCheckboxChange}
        />
        <label>Поменять тему</label>
      </div>
      <ReadContent />

      <Footer />
    </div>
  );
};
