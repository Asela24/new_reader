import { useState } from "react";
import { ReadContent } from "../../modules/read-content/ReadContent";
import { useCookies } from "react-cookie";

export const MainContent = () => {
  const [checked, setChecked] = useState(false);
  const [cookies, setCookie] = useCookies(["read_theme"]);

  const onCheckboxChange = () => {
    setChecked((value) => !value);
    setCookie("read_theme", "modern", {
      path: "/",
    });
  };
  return (
    <div className="bg-neutral-800 flex justify-center grow">
      {/* <div key={cookies.read_theme}>
        <input
          type="checkbox"
          id="scales"
          name="scales"
          checked={checked}
          onChange={onCheckboxChange}
        />
        <label>Поменять тему</label>
      </div> */}
      <ReadContent />
    </div>
  );
};
