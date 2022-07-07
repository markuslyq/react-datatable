import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { TableCell, TableRow } from "@mui/material";
import { styles } from "../styles";

export default function SubTableHeader(props) {
  const dispatch = useDispatch();

  const isLoadingFromDB = props.isLoadingFromDB;
  const columns = props.columns;
  const columnMeta = props.columnMeta;

  let columnIndex = columnMeta.index;
  let subHeaders = [];
  if (isLoadingFromDB) {
    if (columns.length > 0)
      if ("subHeaders" in columns[columnIndex]) {
        subHeaders = columns[columnIndex]["subHeaders"];
        props.updateIsLoadingFromDB(false);
      }
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
}
