import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 left-0 z-50 p-3 bg-green-400 shadow-xl">
      <nav className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        <ul className="flex items-center justify-between">
          <li className="p-3 mx-8">
            <Link href="/">
              <a>خانه</a>
            </Link>
          </li>
          <li className="p-3 mx-8">
            <Link href="/products">
              <a>فروشگاه</a>
            </Link>
          </li>
          <Link href="/">
            <h1 className="p-3 mx-8 text-2xl font-bold cursor-pointer">
              فروشگاه اینترنتی
            </h1>
          </Link>
          <li className="p-3 mx-8">بلاگ</li>
          <li className="p-3 mx-8">ارتباط با ما</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
