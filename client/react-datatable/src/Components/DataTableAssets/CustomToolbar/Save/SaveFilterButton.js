import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconButton, Tooltip, Badge } from "@mui/material";
import { useLocation } from "react-router-dom";

import axios from "axios";

import {
  setIsSnackbarOpen,
  setVariant,
  setDuration,
  setMessage,
} from "../../../Notification/snackbarSlice";

export default function SaveFilterButton(props) {
  const dispatch = useDispatch();

  const filterSettings = useSelector((state) => state.filter.filterObjArr);

  const location = useLocation();
  const { userID } = location.state;
  const tableName = props.tableName;

  const handleSaveFilter = () => {
    console.log("Save Filter Clicked!");
    // console.log("userID on save filter button click: " + userID);
    // console.log(filterSettings);
    axios
      .put("http://localhost:3001/updateFilterSettings", {
        userID: userID,
        tableName: tableName,
        filterSettings: filterSettings,
      })
      .then((response) => {
        dispatch(setIsSnackbarOpen(true));
        dispatch(setVariant("success"));
        dispatch(setDuration(3000));
        dispatch(setMessage("Save Filter Settings Successfully"));
      })
      .catch((error) => {
        dispatch(setIsSnackbarOpen(true));
        dispatch(setVariant("success"));
        dispatch(setDuration(5000));
        dispatch(setMessage(error));
      });
  };

  return (
    <Tooltip title={"Save Filter Settings"}>
      <IconButton onClick={handleSaveFilter} sx={{ padding: 0, height: "40px", width: "40px" }}>
        <img
          src={require("../../../../Images/Save Filter Icon.png")}
          width="50%"
          style={{ margin: 0 }}
        />
      </IconButton>
    </Tooltip>
  );
}
