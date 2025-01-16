import { ReadContent } from "../../modules/read-content/ReadContent";

export const MainContent = () => {
  // const [checked, setChecked] = useState(false);
  // const [cookies, setCookie] = useCookies(["read_theme"]);

  // const onCheckboxChange = () => {
  //   setChecked((value) => !value);
  //   setCookie("read_theme", "modern", {
  //     path: "/",
  //   });
  // };
  return (
    <main className="flex justify-center grow mt-[52px]">
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
      <ReadContent/>
    </main>
  );
};
