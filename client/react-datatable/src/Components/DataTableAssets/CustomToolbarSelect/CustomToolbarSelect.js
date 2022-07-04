import React from "react";
import ValidationCheckButton from "./ValidationCheck/ValidationCheckButton";

export default function CustomToolbarSelect(props) {
  const columns = props.columns;
  const selectedRows = props.selectedRows;
  const displayData = props.displayData;

  return (
    <React.Fragment>
      <ValidationCheckButton columns={columns} selectedRows={selectedRows} displayData={displayData} />
    </React.Fragment>
  );
}
