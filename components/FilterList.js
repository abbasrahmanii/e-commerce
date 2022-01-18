import { useState, useContext, useRef } from "react";
import { Store } from "../context/Store";
import { FiFilter } from "react-icons/fi";
import { Slider } from "@material-ui/core";

const FilterList = () => {
  const [filterValue, setFilterValue] = useState("");
  const [isFree, setIsFree] = useState(false);
  // const [rangeValue, setRangeValue] = useState(0);
  const [rangeValue, setRangeValue] = useState([0, 1500000]);
  const { dispatch } = useContext(Store);

  const checkboxRef = useRef();

  const filterHandler = (e) => {
    dispatch({
      type: "FILTER_LIST",
      payload: { selectFilter: e.target.value, check: isFree, rangeValue },
    });
    setFilterValue(e.target.value);
  };
  const checkboxHandler = (e) => {
    dispatch({
      type: "FILTER_LIST",
      payload: {
        selectFilter: filterValue,
        check: e.target.checked,
        rangeValue,
      },
    });
    setIsFree((prev) => !prev);
  };
  const rangeHandler = (e, newValue) => {
    dispatch({
      type: "FILTER_LIST",
      payload: {
        selectFilter: filterValue,
        check: isFree,
        rangeValue: newValue,
      },
    });
    console.log(newValue);
    setRangeValue(newValue);
  };

  //add comma
  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const freeDeliveryTextColor = checkboxRef.current.checked
    ? "text-green-300"
    : "";

  return (
    <div className="my-8 flex flex-col dark:bg-indigo-400 w-max p-6 rounded-md bg-indigo-500">
      <div className="flex items-center text-white dark:text-black mb-4">
        <FiFilter fontSize="1.2rem" />
        <h4 className="mr-2 dark:text-black text-base">فیلتر محصولات</h4>
      </div>
      <select
        className="w-full p-2 focus:outline-none bg-indigo-100 text-black"
        name="category"
        id="category"
        value={filterValue}
        onChange={filterHandler}
      >
        <option value="">همه محصولات</option>
        <option value="Entertainment">سرگرمی</option>
        <option value="Clothing">پوشاک</option>
        <option value="Home Appliances">لوازم منزل</option>
      </select>
      <label htmlFor="range" className="my-3 text-white dark:text-black">
        حداقل قیمت: {numberWithCommas(rangeValue[0])} تومان
        <br />
        حداکثر قیمت: {numberWithCommas(rangeValue[1])} تومان
      </label>

      <Slider
        onChange={rangeHandler}
        // valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        type="range"
        id="range"
        name="range"
        min={0}
        max={1500000}
        defaultValue={[0, 1500000]}
        dir="ltr"
      />
      <label
        htmlFor="checkbox"
        className={`py-2 text-white dark:text-gray-900 ${freeDeliveryTextColor}`}
      >
        <input
          className="ml-2"
          style={{ accentColor: "#2aff3d" }}
          id="checkbox"
          type="checkbox"
          checked={isFree}
          onChange={checkboxHandler}
          ref={checkboxRef}
        />
        ارسال رایگان
      </label>
    </div>
  );
};

export default FilterList;
