import React from "react";

export default function DateBody(props) {
  const value = props.value;

  if (value instanceof Date) {
    return <label>{value.toLocaleDateString()}</label>;
  } else {
    return <label>{value}</label>;
  }
}
