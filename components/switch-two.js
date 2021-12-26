import { useState } from "react";
import { useTheme } from "next-themes";

const SwitchTwo = () => {
  const [toggle, setToggle] = useState(true);
  const toggleClass = "transform -translate-x-5";
  //dark mode
  const { theme, setTheme } = useTheme();

  const switchHandler = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setToggle(!toggle);
  };
  return (
    <div>
      <div
        className="md:w-10 md:h-4 w-12 h-6 flex items-center bg-indigo-500 dark:bg-indigo-200 rounded-full cursor-pointer relative"
        onClick={switchHandler}
      >
        <p className="text-xs absolute left-1">🌙</p>
        <p className="text-xs absolute right-1">☀️</p>
        <div
          className={
            " bg-white dark:bg-indigo-600 md:w-4 md:h-4 h-5 w-5 rounded-full shadow-md z-30 absolute duration-500 ease-out transition-all" +
            (toggle ? "transform -translate-x-1" : toggleClass)
          }
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        ></div>
      </div>
    </div>
  );
};

export default SwitchTwo;
