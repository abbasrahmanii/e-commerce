import { useState, useRef, useContext } from "react";
import { Store } from "../context/Store";
import { FiFilter } from "react-icons/fi";

const FilterList = () => {
  const [filterValue, setFilterValue] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [rangeValue, setRangeValue] = useState(0);
  const rangeValueRef = useRef();
  const { dispatch } = useContext(Store);

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
  const rangeHandler = () => {
    dispatch({
      type: "FILTER_LIST",
      payload: {
        selectFilter: filterValue,
        check: isFree,
        rangeValue: rangeValueRef.current.value,
      },
    });
    setRangeValue(rangeValueRef.current.value);
  };

  //add comma
  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="my-8 flex flex-col dark:bg-indigo-400 w-max p-3 rounded-md bg-indigo-500">
      <div className="flex items-center text-white dark:text-black mb-4">
        <FiFilter />
        <h4 className="mr-2 dark:text-black">فیلتر محصولات</h4>
      </div>
      <select
        className="w-min p-2 focus:outline-none bg-indigo-100 text-black"
        name="category"
        id="category"
        value={filterValue}
        onChange={filterHandler}
      >
        <option value="">All</option>
        <option value="Personal">Personal</option>
        <option value="Clothing">Clothing</option>
        <option value="Home Appliances">Home Appliances</option>
      </select>
      <label
        htmlFor="range"
        className="my-3 text-white dark:text-black text-sm"
      >
        حداقل قیمت: {numberWithCommas(rangeValue)} تومان
      </label>
      <input
        type="range"
        id="range"
        name="range"
        min={0}
        max={2000000}
        dir="ltr"
        ref={rangeValueRef}
        className="form-range appearance-none w-full h-2 p-0 bg-white focus:outline-none focus:ring-0 focus:shadow-none rounded-xl"
        onChange={rangeHandler}
      />
      <label htmlFor="checkbox" className="py-2 text-white dark:text-gray-900">
        <input
          className="ml-2"
          id="checkbox"
          type="checkbox"
          checked={isFree}
          onChange={checkboxHandler}
        />
        ارسال رایگان
      </label>
    </div>
  );
};

export default FilterList;
