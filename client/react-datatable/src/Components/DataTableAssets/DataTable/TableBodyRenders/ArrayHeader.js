import React from "react";
import { TableRow } from "@mui/material";
import { styles } from "../styles";

export default function ArrayHeader(props) {
  const columnMeta = props.columnMeta;

  return <TableRow style={styles.multiValueMainHeader}>{columnMeta.label}</TableRow>;
}
