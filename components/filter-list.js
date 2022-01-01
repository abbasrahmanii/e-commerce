import { useState, useContext } from "react";
import { Store } from "../context/Store";
import { FiFilter } from "react-icons/fi";

const FilterList = () => {
  const [filterValue, setFilterValue] = useState("");
  const [free, setFree] = useState(false);
  const { dispatch } = useContext(Store);

  const filterHandler = (e) => {
    dispatch({
      type: "FILTER_LIST",
      payload: { filter: e.target.value, check: free },
    });
    setFilterValue(e.target.value);
  };
  const checkboxHandler = (e) => {
    dispatch({
      type: "FILTER_LIST",
      payload: { filter: filterValue, check: e.target.checked },
    });
    setFree((prev) => !prev);
  };

  return (
    <div className="my-8 flex flex-col dark:bg-indigo-400 w-min p-3 rounded-md bg-indigo-500">
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
      <label htmlFor="checkbox" className="py-2 text-white dark:text-gray-900">
        <input
          className="ml-2"
          id="checkbox"
          type="checkbox"
          checked={free}
          onChange={checkboxHandler}
        />
        ارسال رایگان
      </label>
    </div>
  );
};

export default FilterList;
