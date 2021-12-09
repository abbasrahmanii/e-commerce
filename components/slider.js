import { useEffect, useState } from "react";
import Image from "next/image";

import { getAllSlider } from "../data";

const Slider = () => {
  const allSlider = getAllSlider();
  const [sliderNum, setSliderNum] = useState(0);
  const forwardHandler = () => {
    if (sliderNum < allSlider.length - 1) {
      setSliderNum((prev) => prev + 1);
    } else {
      setSliderNum(0);
    }
  };
  const backwardHandler = () => {
    if (sliderNum !== 0) {
      setSliderNum((prev) => prev - 1);
    } else {
      setSliderNum(allSlider.length - 1);
    }
  };

  return (
    <div>
      <div className="relative">
        <span
          className="absolute z-10 p-3 bg-indigo-100 rounded-full cursor-pointer w-14 h-14 top-1/2 left-5"
          onClick={backwardHandler}
        >
          <p className="">Prev</p>
        </span>
        <div className="relative rounded-lg">
          <Image
            className="rounded-lg"
            src={`/images/slider${sliderNum}.jpeg`}
            width={1780}
            height={790}
          />
        </div>

        <span
          className="absolute z-10 p-3 bg-indigo-100 rounded-full cursor-pointer w-14 h-14 top-1/2 right-5"
          onClick={forwardHandler}
        >
          <p>Next</p>
        </span>
      </div>
    </div>
  );
};

export default Slider;
