import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../App.css";
import MUIDataTable from "mui-datatables";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";

import axios from "axios";
import Radium from "radium";

import { Link } from "react-router-dom";

function DataTable2() {
  const [filterArrayFullMatch, setFilterArrayFullMatch] = useState(true);

  const [data, setData] = useState([]);

  function capitalizeFirstLetter(str) {
    // converting first letter to uppercase
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

    return capitalized;
  }

  const isIsoDate = (dateStr) => {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(dateStr))
      return false;
    var d = new Date(dateStr);
    return d.toISOString() === dateStr;
  };

  const processDate = (dataToProcess) => {
    for (let i = 0; i < dataToProcess.length; i++) {
      for (let key in dataToProcess[i]) {
        if (isIsoDate(dataToProcess[i][key])) {
          let newDate = new Date(dataToProcess[i][key]);
          dataToProcess[i][key] = newDate;
        }
      }
    }
    return dataToProcess;
  };

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

  const getMaxHeight = (dataRow) => {
    let maxHeight = 40;
    for (let key in dataRow) {
      if (typeof dataRow[key] === "object") {
        if (dataRow[key] != null) {
          let height = 10 + dataRow[key].length * 30;
          if (height > maxHeight) {
            maxHeight = height;
          }
        }
      }
    }
    return maxHeight;
  };

  const handleGet = () => {
    axios.get("http://localhost:3001/get").then((response) => {
      console.log("Get Button Pressed");
      console.log(response);
      response.data = processDate(response.data);
      setData(response.data);
    });
  };

  useEffect(() => {
    console.log("Current Page: DataTable");
    handleGet();
  }, []);

  const columns = [
    {
      name: "user_id",
      label: "User ID",
      options: {
        filter: true,
        display: "excluded",
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sortThirdClickReset: true,
        setCellProps: () => ({ style: styles.regularTableCell }),
      },
    },
    {
      name: "phone",
      options: {
        print: false,
        filter: false,
        sortThirdClickReset: true,
        setCellProps: () => ({ style: styles.regularTableCell }),
      },
    },
    {
      name: "email",
      options: {
        filter: true,
        print: false,
        sortThirdClickReset: true,
        setCellProps: () => ({ style: styles.regularTableCell }),
      },
    },
    {
      name: "start_date",
      label: "Start Date",
      options: {
        filter: true,
        sortThirdClickReset: true,
        setCellProps: () => ({ style: styles.regularTableCell }),
        customBodyRender: (value, tableMeta, updateValue) => {
          if (value instanceof Date) {
            return <label>{value.toLocaleDateString()}</label>;
          } else {
            return <label>{value}</label>;
          }
        },
      },
    },
    {
      name: "end_date",
      label: "End Date",
      options: {
        filter: true,
        sortThirdClickReset: true,
        setCellProps: () => ({ style: styles.regularTableCell }),
        customBodyRender: (value, tableMeta, updateValue) => {
          if (value instanceof Date) {
            return <label>{value.toLocaleDateString()}</label>;
          } else {
            return <label>{value}</label>;
          }
        },
      },
    },
    {
      name: "deadline",
      label: "Deadline",
      options: {
        filter: true,
        sortThirdClickReset: true,
        setCellProps: () => ({ style: styles.regularTableCell }),
        customBodyRender: (value, tableMeta, updateValue) => {
          if (value instanceof Date) {
            return <label>{value.toLocaleDateString()}</label>;
          } else {
            return <label>{value}</label>;
          }
        },
      },
    },
    {
      name: "postal_code",
      label: "Postal Zip",
      options: {
        filter: true,
        sortThirdClickReset: true,
        setCellProps: () => ({ style: styles.regularTableCell }),
      },
    },
    {
      name: "country",
      label: "Country",
      options: {
        filter: true,
        sortThirdClickReset: true,
        setCellProps: () => ({ style: styles.regularTableCell }),
      },
    },
    {
      name: "age",
      label: "Age",
      options: {
        filter: true,
        sortThirdClickReset: true,
        setCellProps: () => ({ style: styles.regularTableCell }),
      },
    },
    {
      name: "cars",
      label: "Cars",
      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({ style: styles.regularTableCell }),
        customBodyRender: (value, tableMeta, updateValue) => {
          let maxHeight = getMaxHeight(tableMeta.rowData);
          if (value != null) {
            return (
              <Table sx={{ minWidth: "max-content", height: maxHeight + 10 }}>
                <TableBody>
                  {value.map((val, key) => {
                    return (
                      <TableRow>
                        <TableCell
                          sx={styles.innerTableCell}
                          align="left"
                          key={key}
                          component={Paper}
                        >
                          {val ? val : "-"}
                        </TableCell>
                      </TableRow>
                      // <Chip label={val} key={key} />
                    );
                  })}
                </TableBody>
              </Table>
            );
          } else {
            return (
              <Table sx={{ minWidth: "max-content", height: maxHeight + 10 }}>
                <TableBody>
                  <TableRow>
                    <TableCell
                      sx={styles.innerTableCell}
                      align="left"
                      component={Paper}
                    >
                      --
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            );
          }
        },
      },
    },
    {
      name: "previous_company_info",
      label: "Previous Companies",
      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({ style: { padding: 0 } }),
        customHeadLabelRender: (columnMeta) => {
          let columnName = columnMeta.name;
          let subHeaders = [];
          if (data.length != 0) {
            let subHeaderObj = data[0][columnName];
            for (let key in subHeaderObj) {
              key = capitalizeFirstLetter(key);
              subHeaders.push(key);
            }
            subHeaders = subHeaders.sort();
          }
          return (
            <th>
              <div>
                <TableRow style={styles.multiValueMainHeader}>
                  <div>{columnMeta.label}</div>
                </TableRow>
                <TableRow>
                  {subHeaders.map((subHeader) => (
                    <TableCell style={styles.multiValueSubHeader}>
                      {subHeader}
                    </TableCell>
                  ))}
                </TableRow>
              </div>
            </th>
          );
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          let subKeys = [];
          for (let key in value) {
            subKeys.push(key);
          }
          subKeys = subKeys.sort();
          let rows = formatRows(value, subKeys);
          let maxHeight = getMaxHeight(data[tableMeta.rowIndex]);
          return (
            <Table sx={{ height: maxHeight + 10 }}>
              <TableBody>
                {rows.map((row) => {
                  return (
                    <TableRow>
                      {subKeys.map((subKey) => {
                        return (
                          <TableCell
                            style={{
                              padding: 10,
                              width: "150px",
                              textAlign: "Left",
                            }}
                            component={Paper}
                          >
                            {row[subKey] === null
                              ? "--"
                              : row[subKey] == ""
                              ? "-"
                              : row[subKey]}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          );
        },
      },
    },
    {
      name: "password",
      label: "Password",
      options: {
        filter: false,
        sort: false,
        setCellProps: () => ({ style: styles.regularTableCell }),
      },
    },
    {
      name: "notes",
      label: "Notes",
      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({ style: styles.regularTableCell }),
        customBodyRender: (value, tableMeta, updateValue) => {
          let maxHeight = getMaxHeight(data[tableMeta.rowIndex]);
          if (value != null) {
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
          } else {
            return (
              <div style={{ width: "500px", overflow: "auto", padding: 1 }}>
                --
              </div>
            );
          }
        },
      },
    },
  ];

  const styles = {
    regularTableCell: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    longTextTableCell: {
      paddingTop: 0,
      paddingBottom: 0,
      whiteSpace: "normal",
    },
    innerTable: {
      minWidth: "max-content",
      padding: 0,
      marginRight: 0,
    },
    innerTableCell: {
      padding: 1,
      margin: 0,
      height: 20,
    },
    multiValuesHeader: {
      borderBottom: "1px solid rgba(224, 224, 224, 1)",
    },
    multiValueMainHeader: {
      cursor: "pointer",
      fontFamily: "Roboto-Regular",
      fontWeight: 100,
      fontSize: "0.875rem",
      letterSpacing: "0.01071em",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    multiValueSubHeader: {
      cursor: "pointer",
      minWidth: "150px",
      borderBottom: "0px",
      textAlign: "center",
    },
  };

  const theme = createTheme({
    components: {
      // Name of the component
      MuiPaper: {
        defaultProps: {
          // The props to change the default for.
          elevation: 1, // No more ripple, on the whole application 💣!
          square: true,
        },
      },
    },
  });

  const options = {
    draggableColumns: {
      enabled: true,
      transitionTime: 300,
    },
    filter: true,
    filterArrayFullMatch: filterArrayFullMatch,
    filterType: "dropdown",
    responsive: "standard",
    confirmFilters: true, 
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Link className="Link" to="/Home">
          <IconButton aria-label="backArrow">
            <img src={require("../Images/CSIT.png")} width="40%" />
            {/* <ArrowLeftIcon />
            <label style={{ fontSize: "15px" }}>HOME</label> */}
          </IconButton>
        </Link>
        <FormControlLabel
          control={
            <Switch
              checked={filterArrayFullMatch}
              onChange={(e) => setFilterArrayFullMatch(e.target.checked)}
              value="filterArray"
              color="primary"
            />
          }
          label="Fullmatch for Array filter"
        />
      </div>
      <ThemeProvider theme={theme}>
        <MUIDataTable
          title={"Employee list"}
          data={data}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </>
  );
}

export default DataTable2;
