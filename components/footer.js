const Footer = () => {
  return (
    <footer className="flex items-center justify-center w-full h-24 border-t font-serif text-xl">
      <div className="dark:text-white">
        ساخته شده با <span>❤️</span> توسط{" "}
        <span className="font-semibold text-red-800 dark:text-red-600">
          عبـاس رحمـانی نکو
        </span>
      </div>
      {/* <div>
        Made with <span>❤️</span> by{" "}
        <span className="font-semibold">
          <span className="text-red-700">A</span>bbas Rahmani
        </span>
      </div> */}
      {/* <div className="p-5"></div> */}
    </footer>
  );
};

export default Footer;
