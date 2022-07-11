import React from "react";
import ValidationCheckButton from "./ValidationCheck/ValidationCheckButton";

export default function CustomToolbarSelect(props) {
  const params = props.params;

  return (
    <React.Fragment>
      <ValidationCheckButton params={params} />
    </React.Fragment>
  );
}
