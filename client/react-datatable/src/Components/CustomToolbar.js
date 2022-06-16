import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { IconButton, Tooltip } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterDialog from "./Filter/FilterDialog";
import { openFilterDialog } from "./Filter/filterSlice";

export default function CustomToolbar(props) {
  const dispatch = useDispatch();

  const columns = props.columns;
  const data = props.data;

  const handleClick = () => {
    console.log("Filter icon pressed!");
    dispatch(openFilterDialog());
  };

  return (
    <React.Fragment>
      <Tooltip title={"filter icon"}>
        <IconButton onClick={handleClick}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <FilterDialog
        columns={columns}
        data={data}
      />
    </React.Fragment>
  );
}
