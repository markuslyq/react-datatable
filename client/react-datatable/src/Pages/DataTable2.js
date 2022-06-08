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
import CustomToolbar from "../Components/CustomToolbar";

import axios from "axios";

import { Link } from "react-router-dom";

function capitalizeFirstLetter(str) {
  // converting first letter to uppercase
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

  return capitalized;
}

function getSubHeaders(subHeaderObj) {
  let subHeaders = [];
  for (let key in subHeaderObj) {
    key = capitalizeFirstLetter(key);
    subHeaders.push(key);
  }
  subHeaders = subHeaders.sort();
  return subHeaders;
}

function getDataType(data, key) {
  for (let i = 0; i < data.length; i++) {
    let variable = data[i][key];
    if (variable !== null) {
      if (typeof variable === "object") {
        //Return "Array" if object is an array
        if (Array.isArray(variable)) {
          return "array";
        }
        //Return "Date" if object is a Date Object
        if (variable instanceof Date) {
          return "date";
        }
        return getSubHeaders(variable);
      }
      return typeof variable;
    }
  }
  return null;
}

function DataTable2() {

  const columnsDetails = [
    // {
    //   name: "user_id",
    //   label: "User ID",
    //   options: {
    //     filter: false,
    //     display: "excluded",
    //   },
    // },
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
      label: "Phone",
      options: {
        print: false,
        filter: true,
        sortThirdClickReset: true,
        setCellProps: () => ({ style: styles.regularTableCell }),
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: false,
        print: false,
        sortThirdClickReset: true,
        setCellProps: () => ({ style: styles.regularTableCell }),
      },
    },
    {
      name: "start_date",
      label: "Start Date",
      options: {
        filter: false,
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
        filter: false,
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
        filter: false,
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
        filter: false,
        sortThirdClickReset: true,
        setCellProps: () => ({ style: styles.regularTableCell }),
      },
    },
    {
      name: "country",
      label: "Country",
      options: {
        filter: false,
        sortThirdClickReset: true,
        setCellProps: () => ({ style: styles.regularTableCell }),
      },
    },
    {
      name: "age",
      label: "Age",
      options: {
        filter: false,
        sortThirdClickReset: true,
        setCellProps: () => ({ style: styles.regularTableCell }),
      },
    },
    {
      name: "cars",
      label: "Cars",
      options: {
        filter: false,
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
                      <TableRow key={key}>
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
        filter: false,
        sort: false,
        setCellProps: () => ({ style: { padding: 0 } }),
        customHeadLabelRender: (columnMeta) => {
          return renderSubHeader(columnMeta);
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return renderSubBody(value, tableMeta);
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
        filter: false,
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

  const [filterArrayFullMatch, setFilterArrayFullMatch] = useState(true);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState(columnsDetails);

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

  const addDataType = (cols, dataToProcess) => {
    for (let i = 0; i < cols.length; i++) {
      cols[i]["dataType"] = getDataType(dataToProcess, cols[i].name);
      if (Array.isArray(cols[i]["dataType"])) {
        cols[i]["subHeaders"] = cols[i]["dataType"];
        cols[i]["dataType"] = "object";
      }
    }
    return cols;
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
      console.log(response);
      response.data = processDate(response.data);
      setData(response.data);
      let columnsInfo = addDataType(columnsDetails, response.data);
      setColumns(columnsInfo);
    });
  };

  useEffect(() => {
    console.log("Current Page: DataTable");
    handleGet();
  }, []);

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
      minWidth: "10em",
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
    filter: false,
    filterArrayFullMatch: filterArrayFullMatch,
    filterType: "multiselect",
    responsive: "standard",
    confirmFilters: true,
    print: false,
    download: false,
    // columnOrder: [12, 10, 2, 3, 4, 5, 1, 7, 6, 8, 9, 11, 0],
    onColumnOrderChange: (newColumnOrder, columnIndex, newPosition) => {
      console.log(newColumnOrder);
    },
    // customFilterDialogFooter: (currentFilterList, applyNewFilters) => {
    //   return (
    //     <div style={{ marginTop: '40px' }}>
    //       <Button variant="contained" onClick={() => applyNewFilters()}>Apply</Button>
    //     </div>
    //   );
    // }
    customToolbar: () => {
      return (
        <CustomToolbar
          columns={columns}
          data={data}
          filteredData={setData}
        />
      );
    },
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

  function renderSubBody(value, tableMeta) {
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
                        width: "10em",
                        textAlign: "Left",
                      }}
                      component={Paper}
                    >
                      {row[subKey] === null
                        ? "--"
                        : row[subKey] === ""
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
  }

  function renderSubHeader(columnMeta) {
    let columnIndex = columnMeta.index;
    let subHeaders = [];
    if ("subHeaders" in columns[columnIndex]) {
      subHeaders = columns[columnIndex]["subHeaders"];
    }
    // if (data.length !== 0) {
    //   let subHeaderObj = data[0][columnName];
    //   subHeaders = getSubHeaders(subHeaderObj);
    //   console.log("subHeaders: " + subHeaders);
    // }
    return (
      <th>
        <TableRow style={styles.multiValueMainHeader}>
          {columnMeta.label}
        </TableRow>
        <TableRow>
          {subHeaders.map((subHeader) => (
            <TableCell style={styles.multiValueSubHeader}>
              {subHeader}
            </TableCell>
          ))}
        </TableRow>
      </th>
    );
  }
}

export default DataTable2;
