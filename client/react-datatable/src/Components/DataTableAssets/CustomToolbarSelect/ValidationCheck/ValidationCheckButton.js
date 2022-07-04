import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import FactCheckIcon from "@mui/icons-material/FactCheck";

export default function ValidationCheckButton(props) {
  const columns = props.columns;
  const selectedRows = props.selectedRows;
  const displayData = props.displayData;
  const colVariableToCheck = "country";
  const colIndexToCheck = columns.findIndex((col) => col.name == colVariableToCheck);

  const getSelectedData = () => {
    let selectedData = [];
    for (let key in selectedRows.lookup) {
      let displayDataIndex = displayData.findIndex(
        (displayDataRow) => displayDataRow.dataIndex == key
      );
      selectedData.push(displayData[displayDataIndex].data);
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
      console.log("same country");
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
