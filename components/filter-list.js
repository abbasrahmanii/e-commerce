import { useState, useContext } from "react";
import { Store } from "../context/Store";

const FilterList = () => {
  const [filterValue, setFilterValue] = useState("");
  const { state, dispatch } = useContext(Store);

  const filterHandler = (e) => {
    dispatch({ type: "FILTER_LIST", payload: e.target.value });
    setFilterValue(e.target.value);
  };

  return (
    <div className="my-4">
      <select
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
      {/* <label htmlFor="checkbox">
        ersal rayegan
        <input
          id="checkbox"
          type="checkbox"
          checked={free}
          onChange={checkboxHandler}
        />
      </label> */}
    </div>
  );
};

export default FilterList;
