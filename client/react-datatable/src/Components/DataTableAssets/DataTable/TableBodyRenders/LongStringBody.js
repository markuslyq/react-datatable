import React from "react";
import { useSelector, useDispatch } from "react-redux";
import getMaxHeight from "../HelperFunctions/getMaxHeight";

export default function LongStringBody(props) {
  const data = props.data;
  const value = props.value;
  const tableMeta = props.tableMeta;

  let maxHeight = getMaxHeight(data[tableMeta.rowIndex]);
  return (
    <div
      style={{
        width: "500px",
        height: maxHeight,
        overflow: "auto",
        padding: 0,
        margin: 0,
      }}
    >
      {value}
    </div>
  );
}
