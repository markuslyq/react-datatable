import React from "react";
import { IconButton, Tooltip, Badge } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useLocation } from "react-router-dom";

import axios from "axios";

export default function SaveButton(props) {
  const location = useLocation();
  const { userID } = location.state;
  const columnSettings = props.columnSettings;
  const columnOrder = props.columnOrder;

  const handleClick = () => {
    console.log("Save Button Clicked!");
    console.log("userID on save button click: " + userID);
    console.log(columnSettings);
    axios.put("http://localhost:3001/updateColumnSettings", {
      userID: userID,
      tableName: "Employee List",
      columnOrder: columnOrder,
      columnSettings: columnSettings,
    });
  };

  return (
    <Tooltip title={"Save Table Configuration"}>
      <IconButton onClick={handleClick}>
        <SaveIcon />
      </IconButton>
    </Tooltip>
  );
}
