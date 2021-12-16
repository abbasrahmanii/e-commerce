import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

const Custom404 = () => {
  return (
    <Fragment>
      <div className="w-2/3 max-h-full mx-auto flex flex-col transition-all">
        <Image src="/images/404.jpg" alt="404" width={1100} height={500} />
        <Link href="/">
          <a className="text-white mx-auto bg-indigo-400 py-1 px-3 rounded-lg mb-6 hover:px-6 duration-300 hover:bg-indigo-500">
            برو به سایت
          </a>
        </Link>
      </div>
    </Fragment>
  );
};

export default Custom404;
