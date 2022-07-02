import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../App.css";
import MUIDataTable from "mui-datatables";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  IconButton,
  Snackbar,
  Avatar,
} from "@mui/material";
import { amber } from "@mui/material/colors";
import CustomToolbar from "../Components/CustomToolbar/CustomToolbar";
import CustomAlert from "../Components/Notification/CustomAlert";
import CustomSnackbar from "../Components/Notification/CustomSnackbar";
import { useLocation } from "react-router-dom";

import axios from "axios";

import { Link } from "react-router-dom";

import {
  clearFilterObjArr,
  setFilterUserID,
  setIsFilterAppliedClicked,
} from "../Components/CustomToolbar/Filter/filterSlice";
import { setIsRevertClicked } from "../Components/CustomToolbar/Revert/revertSlice";
import {
  setIsSnackbarOpen,
  setVariant,
  setDuration,
  setMessage,
} from "../Components/Notification/snackbarSlice";

function capitalizeFirstLetter(str) {
  // converting first letter to uppercase
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

  return capitalized;
}

function getSubHeaders(dataToProcess, key) {
  let subHeaderObj = dataToProcess[0][key];
  let subHeaders = [];
  for (let key in subHeaderObj) {
    key = capitalizeFirstLetter(key);
    subHeaders.push(key);
  }
  subHeaders = subHeaders.sort();
  return subHeaders;
}

function DataTable2() {
  const dispatch = useDispatch();

  const parseColumnSettings = (oldColumnSettings) => {
    let parsedColumnSettings = [];

    if (oldColumnSettings !== null) {
      oldColumnSettings.forEach((oldColumnInfo) => {
        oldColumnInfo["options"]["setCellProps"] = () => ({
          style: styles.regularTableCell,
        });

        if (oldColumnInfo["dataType"] === "date") {
          oldColumnInfo["options"]["customBodyRender"] = (value) => {
            return renderDateBody(value);
          };
        }

        if (oldColumnInfo["dataType"] === "longString") {
          oldColumnInfo["options"]["customBodyRender"] = (value, tableMeta) => {
            return renderLongStringBody(value, tableMeta);
          };
        }

        if (oldColumnInfo["dataType"] === "array") {
          oldColumnInfo["options"]["customBodyRender"] = (value, tableMeta) => {
            return renderArrayBody(value, tableMeta);
          };
        }

        if (oldColumnInfo["dataType"] === "group") {
          oldColumnInfo["options"]["customHeadLabelRender"] = (columnMeta) => {
            return renderSubHeader(columnMeta);
          };
          oldColumnInfo["options"]["customBodyRender"] = (value, tableMeta) => {
            return renderSubBody(value, tableMeta);
          };
        }
        parsedColumnSettings.push(oldColumnInfo);
      });
    }

    return parsedColumnSettings;
  };

  const getDefaultColumnOrder = () => {
    let colOrderArr = [];
    // if (columns !== null) {
    for (let i = 0; i < columnDetails.length; i++) {
      colOrderArr.push(i);
      // }
    }
    return colOrderArr;
  };

  const isIsoDate = (dateStr) => {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(dateStr)) return false;
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

  const addSubHeaders = (cols, dataToProcess) => {
    for (let i = 0; i < cols.length; i++) {
      if (cols[i]["dataType"] === "group") {
        cols[i]["subHeaders"] = getSubHeaders(dataToProcess, cols[i].name);
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
    let dbColumnInfo = [];
    let dbColumnOrder = [];

    if (!isRevertClicked) {
      //Get table configurations
      axios
        .get("http://localhost:3001/getTableSettings", {
          params: {
            userID: userID,
            tableName: tableName,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.length > 0) {
            if (response.data[0].column_order !== null) {
              dbColumnInfo = parseColumnSettings(JSON.parse(response.data[0].column_settings));
              dbColumnOrder = JSON.parse(response.data[0].column_order);
            }
          }

          if (dbColumnInfo.length !== 0) {
            setColumns(dbColumnInfo);
          }
          if (dbColumnOrder.length !== 0) {
            setColumnOrder(dbColumnOrder);
          }
        });
    }
    //Get table data
    axios.get("http://localhost:3001/getData").then((response) => {
      console.log(response);
      response.data = processDate(response.data);
      setData(response.data);
      if (dbColumnInfo.length === 0) {
        dbColumnInfo = addSubHeaders(columns, response.data);
        setColumns(dbColumnInfo);
      }
    });
  };

  const handleRevertSettings = () => {
    setIsLoadingFromDB(true);
    setColumnOrder(getDefaultColumnOrder());
    dispatch(setIsSnackbarOpen(true));
    dispatch(setVariant("success"));
    dispatch(setDuration(3000));
    dispatch(setMessage("Revert Successfully"));
    dispatch(setIsRevertClicked(false));
  };

  const renderDateBody = (value) => {
    if (value instanceof Date) {
      return <label>{value.toLocaleDateString()}</label>;
    } else {
      return <label>{value}</label>;
    }
  };

  const renderLongStringBody = (value, tableMeta) => {
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
  };

  const renderArrayBody = (value, tableMeta) => {
    let maxHeight = getMaxHeight(tableMeta.rowData);
    // if (value != null) {
    return (
      <React.Fragment>
        <Table
          sx={{
            minWidth: "120px",
            height: maxHeight + 10,
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
  };

  const renderSubBody = (value, tableMeta) => {
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
  };

  const renderSubHeader = (columnMeta) => {
    let columnIndex = columnMeta.index;
    let subHeaders = [];
    if (isLoadingFromDB) {
      if ("subHeaders" in columns[columnIndex]) {
        subHeaders = columns[columnIndex]["subHeaders"];
        setIsLoadingFromDB(false);
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
  };

  const isFilterApplied = useSelector((state) => state.filter.isFilterApplied);
  const filteredData = useSelector((state) => state.filter.filteredData);
  const filterUserID = useSelector((state) => state.filter.filterUserID);

  const isRevertClicked = useSelector((state) => state.revert.isRevertClicked);

  const columnDetails = [
    {
      name: "user_id",
      label: "User ID",
      dataType: "id",
      options: {
        filter: false,
        display: false,
      },
    },
    {
      name: "name",
      label: "Name",
      dataType: "string",
      options: {
        filter: true,
        sortThirdClickReset: true,
      },
    },
    {
      name: "phone",
      label: "Phone",
      dataType: "string",
      options: {
        print: false,
        filter: true,
        sortThirdClickReset: true,
      },
    },
    {
      name: "email",
      label: "Email",
      dataType: "string",
      options: {
        filter: false,
        print: false,
        sortThirdClickReset: true,
      },
    },
    {
      name: "start_date",
      label: "Start Date",
      dataType: "date",
      options: {
        filter: false,
        sortThirdClickReset: true,
      },
    },
    {
      name: "end_date",
      label: "End Date",
      dataType: "date",
      options: {
        filter: false,
        sortThirdClickReset: true,
      },
    },
    {
      name: "deadline",
      label: "Deadline",
      dataType: "date",
      options: {
        filter: false,
        sortThirdClickReset: true,
      },
    },
    {
      name: "postal_code",
      label: "Postal Zip",
      dataType: "string",
      options: {
        filter: false,
        sortThirdClickReset: true,
      },
    },
    {
      name: "country",
      label: "Country",
      dataType: "string",
      options: {
        filter: false,
        sortThirdClickReset: true,
      },
    },
    {
      name: "age",
      label: "Age",
      dataType: "number",
      options: {
        filter: false,
        sortThirdClickReset: true,
      },
    },
    {
      name: "cars",
      label: "Cars",
      dataType: "array",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "previous_company_info",
      label: "Previous Companies",
      dataType: "group",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "password",
      label: "Password",
      dataType: "string",
      options: {
        filter: false,
        sortThirdClickReset: true,
      },
    },
    {
      name: "notes",
      label: "Notes",
      dataType: "longString",
      options: {
        filter: false,
        sortThirdClickReset: true,
      },
    },
  ];
  const tableName = "Employee List";
  const defaultColumnDetails = parseColumnSettings(columnDetails);

  const location = useLocation();
  const { userID } = location.state;

  const [data, setData] = useState([]);
  const [columns, setColumns] = useState(defaultColumnDetails);
  const [columnOrder, setColumnOrder] = useState(getDefaultColumnOrder());

  const [isLoadingFromDB, setIsLoadingFromDB] = useState(true);

  useEffect(() => {
    console.log("userID: " + userID);
    console.log("Current Page: DataTable");
    if (filterUserID !== userID) {
      dispatch(clearFilterObjArr());
      dispatch(setFilterUserID(userID));
      dispatch(setIsFilterAppliedClicked(true));
    }
    if (isLoadingFromDB) {
      handleGet();
    }
    if (isRevertClicked) {
      handleRevertSettings();
    }
  });

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
      cursor: "grab",
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
      cursor: "grab",
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
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            width: "max-content",
          },
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
    responsive: "standard",
    selectableRowsOnClick: true,
    selectableRowsHideCheckboxes: true,
    print: false,
    download: false,
    columnOrder: columnOrder,
    // setTableProps: () => {
    //   return {
    //     paddingTop: "none",
    //     paddingBottom: "none",
    //   };
    // },
    onColumnOrderChange: (newColumnOrder, columnIndex, newPosition) => {
      console.log(newColumnOrder);
      setColumnOrder(newColumnOrder);
    },
    customToolbar: () => {
      return (
        <CustomToolbar
          columns={columns}
          data={data}
          columnOrder={columnOrder}
          tableName={tableName}
        />
      );
    },
  };

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingRight: 30,
        }}
      >
        <Link className="Link" to="/Home">
          <IconButton aria-label="backArrow">
            <img src={require("../Images/CSIT.png")} width="40%" />
          </IconButton>
        </Link>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Avatar sx={{ bgcolor: amber[800], height: 35, width: 35 }}>{userID}</Avatar>
          <label style={{ marginLeft: 5 }}>User {userID}</label>
        </div>
      </div>
      <CustomSnackbar />
      <ThemeProvider theme={theme}>
        {columns !== null && columnOrder !== null && data !== [] ? (
          <MUIDataTable
            title={tableName}
            data={isFilterApplied ? filteredData : data}
            columns={columns}
            options={options}
          />
        ) : (
          <div>
            <img src={require("../Images/loading.gif")} width="10%" />
          </div>
        )}
      </ThemeProvider>
    </React.Fragment>
  );
}

export default DataTable2;
