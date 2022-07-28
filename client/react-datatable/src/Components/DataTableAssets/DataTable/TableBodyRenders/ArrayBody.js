import React from "react";
import { styles } from "../styles";
import { Table, TableBody, TableRow, TableCell, Paper } from "@mui/material";
import getMaxHeight from "../HelperFunctions/getMaxHeight";

export default function ArrayBody(props) {
  const value = props.value;
  const tableMeta = props.tableMeta;

  let maxHeight = getMaxHeight(tableMeta.rowData);
  return (
    <React.Fragment>
      <Table
        sx={{
          minWidth: "120px",
          height: maxHeight >= 100 ? maxHeight : maxHeight + 10,
          overflowY: "auto",
        }}
      >
        <TableBody>
          {value.map((val, key) => {
            return (
              <TableRow key={key}>
                <TableCell sx={styles.innerTableCell} align="left" key={key} component={Paper}>
                  {val ? val : "-"}
                </TableCell>
              </TableRow>
              // <Chip label={val} key={key} />
            );
          })}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
