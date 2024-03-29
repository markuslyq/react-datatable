import React from "react";
import getMaxHeight from "../HelperFunctions/getMaxHeight";

export default function LongStringBody(props) {
  const data = props.data;
  const value = props.value;
  const tableMeta = props.tableMeta;

  let maxHeight = getMaxHeight(tableMeta.rowData);
  return (
    <div
      style={{
        width: "500px",
        maxHeight: maxHeight > 100 ? 100 : maxHeight,
        overflow: "auto",
        padding: 0,
        margin: 0,
      }}
    >
      {value}
    </div>
  );
}
