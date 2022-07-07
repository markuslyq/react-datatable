import React from "react";
import ValidationCheckButton from "./ValidationCheck/ValidationCheckButton";

export default function CustomToolbarSelect(props) {
  const columns = props.columns;
  const selectedRows = props.selectedRows;
  const data = props.data

  return (
    <React.Fragment>
      <ValidationCheckButton columns={columns} selectedRows={selectedRows} data={data} />
    </React.Fragment>
  );
}
