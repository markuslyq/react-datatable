import React from "react";
import ValidationCheckButton from "./ValidationCheck/ValidationCheckButton";
import DeselectAllButton from "./DeselectAll/DeselectAllButton";

export default function CustomToolbarSelect(props) {
  const params = props.params;

  return (
    <div>
      <DeselectAllButton setSelectedRows={props.setSelectedRows}/>
      <ValidationCheckButton params={params} />
    </div>
  );
}
