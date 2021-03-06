import React from "react";

const Footer = () => {
  return (
    <footer className="flex items-center justify-center w-full h-16 border-t font-serif text-xl static bottom-0">
      <div className="dark:text-white">
        ساخته شده با <span>❤️</span> توسط{" "}
        <span className="font-semibold text-red-800 dark:text-red-600">
          عبـاس رحمـانی نکو
        </span>
      </div>
    </footer>
  );
};

export default Footer;
