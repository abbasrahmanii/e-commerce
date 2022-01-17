import { useContext, useState } from "react";
import { useTheme } from "next-themes";
import { Store } from "../context/Store";
import Cookies from "js-cookie";

const Switch = () => {
  const { state, dispatch } = useContext(Store);
  const { darkMode } = state;
  //dark mode
  const { theme, setTheme } = useTheme();

  const switchHandler = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    dispatch({ type: "DARK_MODE" });
    Cookies.set("darkMode", !darkMode);
  };
  return (
    <div>
      <div
        className="md:w-10 md:h-4 w-10 h-4 flex items-center bg-indigo-500 dark:bg-indigo-200 rounded-full cursor-pointer relative"
        onClick={switchHandler}
      >
        <p className="text-xs absolute left-1">🌙</p>
        <p className="text-xs absolute right-1">☀️</p>
        <div
          className={
            "pointer-events-none bg-white dark:bg-indigo-600 md:w-4 md:h-4 h-4 w-4 rounded-full shadow-md z-30 absolute duration-500 ease-out transition-all" +
            (darkMode ? "transform -translate-x-5" : "transform -translate-x-1")
          }
        ></div>
      </div>
    </div>
  );
};

export default Switch;
