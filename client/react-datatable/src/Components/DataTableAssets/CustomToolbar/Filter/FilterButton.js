import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../../../App.css";
import { IconButton, Tooltip, Badge } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterDialog from "./FilterDialog";
import filterData from "./FilterFunctions/filterData";

import {
  openFilterDialog,
  setIsOnInitialLoad,
  setFilteredData,
  setFilterCount,
  setIsFilterApplied,
  setIsFilterAppliedClicked,
} from "./filterSlice";

import {
  setIsSnackbarOpen,
  setVariant,
  setDuration,
  setMessage,
} from "../../../Notification/snackbarSlice";

import store from "../../../../store";

export default function FilterButton(props) {
  const dispatch = useDispatch();

  const isOnInitialLoad = useSelector((state) => state.filter.isOnInitialLoad);
  const filterCount = useSelector((state) => state.filter.filterCount);
  const isFilterAppliedClicked = useSelector((state) => state.filter.isFilterAppliedClicked);

  const columns = props.columns;
  const data = props.data;

  const handleFilterClick = () => {
    console.log("Filter icon pressed!");
    dispatch(openFilterDialog());
  };

  useEffect(() => {
    let latestFilterObjArr = store.getState().filter.filterObjArr;

    if (isOnInitialLoad) {
      let filteredData = filterData(latestFilterObjArr, data);
      dispatch(setFilteredData(filteredData));
      let newFilterCount = latestFilterObjArr.length;
      dispatch(setFilterCount(newFilterCount));
      dispatch(setIsOnInitialLoad(false));
    }

    //Handles application of filter
    if (isFilterAppliedClicked) {
      console.log("filteredData: ");
      let filteredData = filterData(latestFilterObjArr, data);
      console.log(filteredData);
      dispatch(setFilteredData(filteredData));

      let newFilterCount = latestFilterObjArr.length;
      dispatch(setFilterCount(newFilterCount));

      if (newFilterCount > 0) {
        dispatch(setIsFilterApplied(true));
        dispatch(setIsSnackbarOpen(true));
        dispatch(setVariant("success"));
        dispatch(setDuration(3000));
        dispatch(
          setMessage(
            newFilterCount.toString() +
              (newFilterCount > 1 ? " Filters Applied" : " Filter Applied")
          )
        );
      } else {
        dispatch(setIsSnackbarOpen(true));
        dispatch(setVariant("success"));
        dispatch(setDuration(3000));
        dispatch(setMessage("No Filters Applied"));
        dispatch(setIsFilterApplied(false));
      }
      dispatch(setIsFilterAppliedClicked(false));
    }
  });

  return (
    <React.Fragment>
      <Tooltip title={"Filter"}>
        <IconButton className="IconButton" onClick={handleFilterClick}>
          <Badge badgeContent={filterCount ? filterCount : 0} color="info">
            <FilterListIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <FilterDialog columns={columns} data={data} />
    </React.Fragment>
  );
}
