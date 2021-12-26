import { useState } from "react";
import { useTheme } from "next-themes";

const Switch = () => {
  const [toggle, setToggle] = useState(true);
  const toggleClass = "transform -translate-x-2 bg-white";
  //dark mode
  const { theme, setTheme } = useTheme();

  const switchHandler = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setToggle(!toggle);
  };

  return (
    <div>
      <div
        className="md:w-8 md:h-4 w-12 h-6 flex items-center bg-indigo-400 dark:bg-white rounded-full p-1 cursor-pointer"
        onClick={switchHandler}
      >
        <div
          className={
            "dark:bg-indigo-400 md:w-4 md:h-4 h-5 w-5 rounded-full shadow-md transform" +
            (toggle ? null : toggleClass)
          }
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        ></div>
      </div>
    </div>
  );
};

export default Switch;
