import { useState, useContext, useRef } from "react";
import { Store } from "../context/Store";
import { FiFilter } from "react-icons/fi";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slider,
  Paper,
  Grid,
  Typography,
  TextField,
  MenuItem,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import useStyles from "../utils/styles";
import RTL from "./RTL";

const FilterList = () => {
  const [filterValue, setFilterValue] = useState("");
  const [isFree, setIsFree] = useState(false);
  // const [rangeValue, setRangeValue] = useState(0);
  const [rangeValue, setRangeValue] = useState([0, 1500000]);
  const { dispatch } = useContext(Store);

  const checkboxRef = useRef();

  const classes = useStyles();

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
    setRangeValue(newValue);
  };

  //add comma
  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const freeDeliveryTextColor = checkboxRef.current?.checked
    ? "text-blue-800"
    : "";

  return (
    <RTL>
      <Grid item xs={9} sm={5} md={4} lg={3}>
        <Paper className={classes.filterList}>
          {/* <div className="my-8 flex flex-col dark:bg-indigo-400 w-max p-6 rounded-md bg-indigo-500"> */}
          <List>
            <ListItem>
              {/* <div className="flex items-center text-white dark:text-black mb-4"> */}
              <ListItemIcon>
                <FiFilter fontSize="1.2rem" />
              </ListItemIcon>
              {/* <h4 className="mr-2 dark:text-black text-base"> */}
              <ListItemText>فیلتر محصولات</ListItemText>
              {/* <Typography component="h5" variant="h5">
              فیلتر محصولات
            </Typography> */}
              {/* </h4> */}
              {/* </div> */}
            </ListItem>
            <ListItem>
              {/* <select
                className="w-full p-2 focus:outline-none bg-indigo-100 text-black"
                name="category"
                id="category"
                value={filterValue}
                onChange={filterHandler}
              >
                <option value="All">همه محصولات</option>
                <option value="Entertainment">سرگرمی</option>
                <option value="Clothing">پوشاک</option>
                <option value="Home Appliances">لوازم منزل</option>
              </select> */}
              <TextField
                select
                variant="outlined"
                label="دسته بندی"
                fullWidth
                value={filterValue}
                onChange={filterHandler}
                color="primary"
                className={classes.select}
              >
                <MenuItem value="All">همه محصولات</MenuItem>
                <MenuItem value="Entertainment">سرگرمی</MenuItem>
                <MenuItem value="Clothing">پوشاک</MenuItem>
                <MenuItem value="Home Appliances">لوازم منزل</MenuItem>
              </TextField>
            </ListItem>
            <ListItem>
              {/* <label htmlFor="range" className="my-3 text-white dark:text-black"> */}
              <ListItemText>
                حداقل قیمت: {numberWithCommas(rangeValue[0])} تومان
              </ListItemText>
              {/* </label> */}
            </ListItem>
            <ListItem>
              {/* <label htmlFor="range" className="my-3 text-white dark:text-black"> */}
              <ListItemText>
                حداکثر قیمت: {numberWithCommas(rangeValue[1])} تومان
              </ListItemText>
              {/* </label> */}
            </ListItem>
            <ListItem>
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
              />
            </ListItem>
            <ListItem>
              <label
                htmlFor="checkbox"
                className={`py-2 text-black dark:text-gray-900 ${freeDeliveryTextColor}`}
              >
                <input
                  className="ml-2"
                  // style={{ accentColor: "#2aff3d" }}
                  style={{ accentColor: "#3F51B5" }}
                  id="checkbox"
                  type="checkbox"
                  checked={isFree}
                  onChange={checkboxHandler}
                  ref={checkboxRef}
                />
                ارسال رایگان
              </label>
            </ListItem>
            {/* </div> */}
          </List>
        </Paper>
      </Grid>
    </RTL>
  );
};

export default FilterList;
