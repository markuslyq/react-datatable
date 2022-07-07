import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function ValidationCheckButton(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state;
  const columns = props.columns;
  const selectedRows = props.selectedRows;
  const data = props.data;
  const colVariableToCheck = "country";
  const colIndexToCheck = columns.findIndex((col) => col.name == colVariableToCheck);

  const getSelectedData = () => {
    let selectedData = [];
    for (let key in selectedRows.lookup) {
      selectedData.push(data[key]);
    }
    return selectedData;
  };

  const isValidDataCheck = (selectedData) => {
    return selectedData.every(
      (dataRow) => dataRow[colIndexToCheck] == selectedData[0][colIndexToCheck]
    );
  };

  const handleValidationCheck = () => {
    let selectedData = getSelectedData();
    if (isValidDataCheck(selectedData)) {
      let navObj = {
        state: {
          ...state,
          columns: columns,
          selectedData: selectedData,
        },
      };
      console.log(selectedData);
      navigate("/PostValidationCheck", navObj);
    } else {
      console.log("diff country");
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
