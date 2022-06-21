import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconButton, Tooltip, Badge } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterDialog from "./FilterDialog";
import { openFilterDialog } from "./filterSlice";

export default function FilterButton(props) {
  const dispatch = useDispatch();

  const filterCount = useSelector((state) => state.filter.filterCount);

  const columns = props.columns;
  const data = props.data;

  const handleClick = () => {
    console.log("Filter icon pressed!");
    dispatch(openFilterDialog());
  };

  return (
    <React.Fragment>
      <Tooltip title={"Filter"}>
        <IconButton onClick={handleClick}>
          <Badge badgeContent={filterCount ? filterCount : 0} color="info">
            <FilterListIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <FilterDialog columns={columns} data={data} />
    </React.Fragment>
  );
}
