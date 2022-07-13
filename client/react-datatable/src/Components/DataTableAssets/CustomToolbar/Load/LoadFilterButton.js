import React from "react";
import { useDispatch } from "react-redux";
import { IconButton, Tooltip } from "@mui/material";
import { useLocation } from "react-router-dom";

import axios from "axios";

import { setFilterObjArr, setIsFilterAppliedClicked } from "../Filter/filterSlice";

import {
  setIsSnackbarOpen,
  setVariant,
  setDuration,
  setMessage,
} from "../../../Notification/snackbarSlice";

export default function LoadFilterButton(props) {
  const dispatch = useDispatch();

  const location = useLocation();
  const { userID } = location.state;
  const tableName = props.tableName;

  const isIsoDate = (dateStr) => {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(dateStr)) return false;
    var d = new Date(dateStr);
    return d.toISOString() === dateStr;
  };

  const processSettings = (settingsToProcess) => {
    for (let i = 0; i < settingsToProcess.length; i++) {
      if (
        typeof settingsToProcess[i]["value"] === "object" &&
        !Array.isArray(settingsToProcess[i]["value"])
      ) {
        for (let key in settingsToProcess[i]["value"]) {
          if (isIsoDate(settingsToProcess[i]["value"][key])) {
            let newDate = new Date(settingsToProcess[i]["value"][key]);
            settingsToProcess[i]["value"][key] = newDate;
          }
        }
      }
    }
    return settingsToProcess;
  };

  const handleLoadLatestFilter = () => {
    axios
      .get("http://localhost:3001/getFilterSettings", {
        params: {
          userID: userID,
          tableName: tableName,
        },
      })
      .then((response) => {
        if (response.data.length > 0) {
          let dbFilterSettings = JSON.parse(response.data[0].filter_settings);
          dbFilterSettings = processSettings(dbFilterSettings);
          dispatch(setFilterObjArr(dbFilterSettings));
          dispatch(setIsFilterAppliedClicked(true));

          //Handles Success Snackbar Message
          dispatch(setIsSnackbarOpen(true));
          dispatch(setVariant("success"));
          dispatch(setDuration(3000));
          dispatch(setMessage("Filter Settings Successfully Loaded"));
        } else {
          //Handles Failure Snackbar Message
          dispatch(setIsSnackbarOpen(true));
          dispatch(setVariant("error"));
          dispatch(setDuration(5000));
          dispatch(setMessage("You do not have any filter settings saved"));
        }
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
      <Tooltip title={"Load Latest Filter Configuration"}>
        <IconButton
          onClick={handleLoadLatestFilter}
          sx={{ padding: 0, maxHeight: "40px", maxWidth: "40px" }}
        >
          <img
            src={require("../../../../Images/Load Filter Icon.png")}
            width="50%"
            style={{ margin: 0 }}
          />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}
