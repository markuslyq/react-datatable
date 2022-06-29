import React from "react";
import { IconButton, Tooltip, Badge } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useLocation } from "react-router-dom";

import axios from "axios";

export default function SaveFilterButton(props) {
  const location = useLocation();
  const { userID } = location.state;
  const columnSettings = props.columnSettings;
  const columnOrder = props.columnOrder;

  const handleSaveFilter = () => {
    console.log("Save Filter Clicked!");
    console.log("userID on save filter button click: " + userID);
    // axios.put("http://localhost:3001/updateColumnSettings", {
    //   userID: userID,
    //   tableName: "Employee List",
    //   columnOrder: columnOrder,
    //   columnSettings: columnSettings,
    // });
  };

  return (
    <Tooltip title={"Save Filter Configuration"}>
      <IconButton onClick={handleSaveFilter} sx={{padding:0, height: "40px", width: "40px"}}>
        <img
          src={require("../../../Images/Save Filter Icon.png")}
          width="50%"
          style={{ margin: 0 }}
        />
      </IconButton>
    </Tooltip>
  );
}
