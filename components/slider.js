import { useState, useEffect } from "react";
import Image from "next/image";
import { BiChevronLeftCircle, BiChevronRightCircle } from "react-icons/bi";
import { RiFocusLine, RiFocusFill } from "react-icons/ri";

import { getAllSlider } from "../data";

const Slider = () => {
  const allSlider = getAllSlider();
  const [sliderNum, setSliderNum] = useState(0);

  const indicatorHandler = (indicatorNum) => {
    const indicator = +indicatorNum[1];
    setSliderNum(indicator);
  };

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

  useEffect(() => {
    let slider = setInterval(() => {
      forwardHandler();
    }, 3500);
    return () => clearInterval(slider);
  }, [sliderNum]);

  return (
    <div>
      <div className="relative">
        <div className="relative rounded-lg">
          <Image
            className="rounded-lg"
            src={`/images/slider${sliderNum}.jpeg`}
            width={1780}
            height={790}
          />
        </div>
        <span
          className="absolute rounded-full cursor-pointer top-1/2 left-5"
          onClick={backwardHandler}
        >
          <BiChevronLeftCircle color="white" fontSize="2.5rem" />
        </span>
        <span
          className="absolute rounded-full cursor-pointer top-1/2 right-5"
          onClick={forwardHandler}
        >
          <BiChevronRightCircle color="white" fontSize="2.5rem" />
        </span>
        <div className="flex flex-row-reverse absolute bottom-4 right-1/2 translate-x-1/2">
          {allSlider.map((p) => (
            <div key={p.id}>
              <span
                hidden={p.id === `s${sliderNum}`}
                onClick={(e) => indicatorHandler(p.id)}
              >
                <RiFocusLine fontSize="1.1rem" color="#eee" />
              </span>
              <span hidden={p.id !== `s${sliderNum}`}>
                <RiFocusFill fontSize="1.1rem" color="#eee" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
