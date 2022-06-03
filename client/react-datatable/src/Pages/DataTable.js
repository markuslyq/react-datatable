import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../App.css";
import MUIDataTable from "mui-datatables";
import Chip from "@mui/material/Chip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

import moment from "moment";
import axios from "axios";
import Radium from "radium";

import { Link } from "react-router-dom";

function DataTable() {
  const [filterArrayFullMatch, setFilterArrayFullMatch] = useState(true);

  const [data, setData] = useState([]);

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
          if (value != null) {
            return (
              <Table sx={styles.innerTable} component={Paper}>
                <TableBody>
                  {value.map((val, key) => {
                    return (
                      <TableRow>
                        <TableCell
                          sx={styles.innerTableCell}
                          align="left"
                          key={key}
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
              <Table sx={styles.innerTable} component={Paper}>
                <TableBody>
                  <TableRow>
                    <TableCell sx={styles.innerTableCell} align="left">
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
      name: "previous_company",
      label: "Company",
      options: {
        filter: true,
        sort: false,
        draggable: false,
        setCellProps: () => ({ style: { padding: 0 } }),
        customBodyRender: (value, tableMeta, updateValue) => {
          if (value != null) {
            return (
              <Table sx={styles.innerTable} component={Paper}>
                <TableBody>
                  {value.map((val, key) => {
                    return (
                      <TableRow>
                        <TableCell
                          sx={styles.innerTableCell}
                          align="left"
                          key={key}
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
              <Table sx={styles.innerTable} component={Paper}>
                <TableBody>
                  <TableRow>
                    <TableCell sx={styles.innerTableCell} align="left">
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
      name: "years_stayed",
      label: "Years Stayed",
      options: {
        filter: true,
        sort: false,
        draggable: false,
        sortThirdClickReset: false,
        setCellProps: () => ({ style: { padding: 0 } }),
        customBodyRender: (value, tableMeta, updateValue) => {
          if (value != null) {
            return (
              <Table sx={styles.innerTable} component={Paper}>
                <TableBody>
                  {value.map((val, key) => {
                    return (
                      <TableRow>
                        <TableCell
                          sx={styles.innerTableCell}
                          align="left"
                          key={key}
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
              <Table sx={styles.innerTable} component={Paper}>
                <TableBody>
                  <TableRow>
                    <TableCell sx={styles.innerTableCell} align="left">
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
      name: "department",
      label: "Department",
      options: {
        filter: true,
        sort: false,
        draggable: false,
        sortThirdClickReset: false,
        setCellProps: () => ({ style: { padding: 0 } }),
        customBodyRender: (value, tableMeta, updateValue) => {
          if (value != null) {
            return (
              <Table sx={styles.innerTable} component={Paper}>
                <TableBody>
                  {value.map((val, key) => {
                    return (
                      <TableRow>
                        <TableCell
                          sx={styles.innerTableCell}
                          align="left"
                          key={key}
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
              <Table sx={styles.innerTable} component={Paper}>
                <TableBody>
                  <TableRow>
                    <TableCell sx={styles.innerTableCell} align="left">
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
        setCellProps: () => ({
          style: styles.regularTableCell,
        }),
        customBodyRenderLite: (dataIndex) => {
          let value = data[dataIndex].notes;
          let maxHeight = getMaxHeight(data[dataIndex]);
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
      width: "max-content",
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
      padding: 1.5,
      margin: 0,
      height: 20,
    },
  };

  const theme = createTheme({
    components: {
      // Name of the component
      MuiPaper: {
        defaultProps: {
          // The props to change the default for.
          elevation: 1,
          square: true,
        },
      },
    },
  });

  const options = {
    filter: true,
    filterArrayFullMatch: filterArrayFullMatch,
    filterType: "dropdown",
    responsive: "standard",
    draggableColumns: {
      enabled: true,
      transitionTime: 300,
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
          title={"ACME Employee list"}
          data={data}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </>
  );
}

export default DataTable;
