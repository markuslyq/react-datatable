import React from "react";
import { Table, TableBody, TableRow, TableCell, Paper } from "@mui/material";
import getMaxHeight from "../HelperFunctions/getMaxHeight";

const getNumRows = (val, keys) => {
  let numRows = 1;
  keys.forEach((key) => {
    if (val[key] != null) {
      let currNumRows = val[key].length;
      if (currNumRows > numRows) {
        numRows = currNumRows;
      }
    }
  });
  return numRows;
};

const formatRows = (val, keys) => {
  let numRows = getNumRows(val, keys);
  let rows = [];
  for (let i = 0; i < numRows; i++) {
    let individualRow = {};
    keys.forEach((key) => {
      if (val[key] != null) {
        individualRow[key] = val[key][i];
      } else {
        individualRow[key] = null;
      }
    });
    rows.push(individualRow);
  }
  return rows;
};

export default function SubTableBody(props) {
  const data = props.data;
  const value = props.value;
  const tableMeta = props.tableMeta;

  let subKeys = [];
  for (let key in value) {
    subKeys.push(key);
  }
  subKeys = subKeys.sort();
  let rows = formatRows(value, subKeys);
  let maxHeight = getMaxHeight(data[tableMeta.rowIndex]);
  return (
    <div style={{ maxHeight: 100, overflowY: "auto" }}>
      <Table sx={{ height: maxHeight + 10 }}>
        <TableBody>
          {rows.map((row) => {
            return (
              <TableRow>
                {subKeys.map((subKey) => {
                  return (
                    <TableCell
                      key={subKey}
                      style={{
                        padding: 10,
                        width: "10em",
                        textAlign: "Left",
                      }}
                      component={Paper}
                    >
                      {row[subKey]}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
