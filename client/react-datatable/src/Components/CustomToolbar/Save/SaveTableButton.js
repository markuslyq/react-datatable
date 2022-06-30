import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconButton, Tooltip, Badge } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useLocation } from "react-router-dom";

import axios from "axios";

import {
  setIsSnackbarOpen,
  setVariant,
  setDuration,
  setMessage,
} from "../../Notification/snackbarSlice";

export default function SaveTableButton(props) {
  const dispatch = useDispatch();

  const location = useLocation();
  const { userID } = location.state;
  const tableName = props.tableName;
  const columnSettings = props.columnSettings;
  const columnOrder = props.columnOrder;

  const handleSaveTable = () => {
    console.log("Save Button Clicked!");
    // console.log("userID on save table button click: " + userID);
    axios
      .put("http://localhost:3001/updateColumnSettings", {
        userID: userID,
        tableName: tableName,
        columnOrder: columnOrder,
        columnSettings: columnSettings,
      })
      .then((response) => {
        dispatch(setIsSnackbarOpen(true));
        dispatch(setVariant("success"));
        dispatch(setDuration(3000));
        dispatch(setMessage("Save Table Settings Successfully"));
      })
      .catch((error) => {
        dispatch(setIsSnackbarOpen(true));
        dispatch(setVariant("success"));
        dispatch(setDuration(5000));
        dispatch(setMessage(error));
      });
  };

  return (
    <React.Fragment>
      <Tooltip title={"Save Table Settings"}>
        <IconButton
          onClick={handleSaveTable}
          sx={{ padding: 0, maxHeight: "40px", maxWidth: "40px" }}
        >
          <img
            src={require("../../../Images/Save Table Icon.png")}
            width="50%"
            style={{ margin: 0 }}
          />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}
