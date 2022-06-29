import React from "react";
import { IconButton, Tooltip, Badge } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useLocation } from "react-router-dom";

import axios from "axios";

export default function SaveTableButton(props) {
  const location = useLocation();
  const { userID } = location.state;
  const columnSettings = props.columnSettings;
  const columnOrder = props.columnOrder;

  const handleSaveTable = () => {
    console.log("Save Button Clicked!");
    console.log("userID on save table button click: " + userID);
    axios.put("http://localhost:3001/updateColumnSettings", {
      userID: userID,
      tableName: "Employee List",
      columnOrder: columnOrder,
      columnSettings: columnSettings,
    });
  };

  return (
    <Tooltip title={"Save Table Configuration"}>
      <IconButton onClick={handleSaveTable} sx={{padding:0, maxHeight: "40px", maxWidth: "40px"}}>
        <img
          src={require("../../../Images/Save Table Icon.png")}
          width="50%"
          style={{ margin: 0 }}
        />
      </IconButton>
    </Tooltip>
  );
}
