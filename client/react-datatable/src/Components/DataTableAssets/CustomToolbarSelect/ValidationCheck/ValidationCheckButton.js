import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconButton, Tooltip } from "@mui/material";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import { Link, useNavigate, useLocation } from "react-router-dom";

import capitalizeFirstLetter from "../../../../HelperFunctions/capitalizeFirstLetter";

import {
  setIsSnackbarOpen,
  setVariant,
  setDuration,
  setMessage,
} from "../../../Notification/snackbarSlice";

export default function ValidationCheckButton(props) {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state;
  const columns = props.params.columns;
  const selectedRows = props.params.selectedRows;
  const data = props.params.data;
  const columnOrder = props.params.columnOrder;
  const colVariableToCheck = "country";
  // const colIndexToCheck = columns.findIndex((col) => col.name == colVariableToCheck);

  const getSelectedData = () => {
    let selectedData = [];
    for (let key in selectedRows.lookup) {
      selectedData.push(data[key]);
    }
    return selectedData;
  };

  const isValidDataCheck = (selectedData) => {
    return selectedData.every(
      (dataRow) => dataRow[colVariableToCheck] == selectedData[0][colVariableToCheck]
    );
  };

  const handleValidationCheck = () => {
    let selectedData = getSelectedData();
    if (isValidDataCheck(selectedData)) {
      let navObj = {
        state: {
          ...state,
          columns: JSON.stringify(columns),
          columnOrder: columnOrder,
          selectedData: selectedData,
        },
      };
      console.log(navObj);
      navigate("/PostValidationCheck", navObj);
    } else {
      console.log("diff country");
      dispatch(setIsSnackbarOpen(true));
      dispatch(setVariant("error"));
      dispatch(setDuration(5000));
      dispatch(
        setMessage(
          'Values of "' + capitalizeFirstLetter(colVariableToCheck) + '" column are different'
        )
      );
    }
  };

  return (
    <Tooltip title={"Country Validation Check"}>
      <IconButton onClick={handleValidationCheck}>
        <FactCheckIcon />
      </IconButton>
    </Tooltip>
  );
}
