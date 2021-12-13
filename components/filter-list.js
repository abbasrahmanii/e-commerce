import { useState, useContext } from "react";
import { Store } from "../context/Store";

const FilterList = () => {
  const [filterValue, setFilterValue] = useState("");
  const [free, setFree] = useState(false);
  const { state, dispatch } = useContext(Store);

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
    <div className="my-4 flex flex-col bg-indigo-400 w-min p-3">
      <select
        className="w-min p-2 focus:outline-none"
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
      <label htmlFor="checkbox" className="py-2 text-white">
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
