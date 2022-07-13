import React from "react";
import { TableCell, TableRow } from "@mui/material";
import { styles } from "../styles";

export default function SubTableHeader(props) {
  const subHeaders = props.subHeaders;
  const columnMeta = props.columnMeta;

  return (
    <th>
      <TableRow style={styles.multiValueMainHeader}>{columnMeta.label}</TableRow>
      <TableRow>
        {subHeaders.map((subHeader) => (
          <TableCell key={subHeader} style={styles.multiValueSubHeader}>
            {subHeader}
          </TableCell>
        ))}
      </TableRow>
    </th>
  );
}
