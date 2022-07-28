import React, { useState, useEffect } from "react";
import "../App.css";
import { IconButton, Avatar } from "@mui/material";
import { amber } from "@mui/material/colors";
import defaultTableOptions from "../Components/DataTableAssets/DataTable/Props/defaultTableOptions";
import defaultTableColumn from "../Components/DataTableAssets/DataTable/Props/columnDetails";

import ReactDataTable from "../Components/DataTableAssets/DataTable/ReactDataTable";

import getDefaultColumnOrder from "../Components/DataTableAssets/DataTable/HelperFunctions/getDefaultColumnOrder";
import processDateObj from "../Components/DataTableAssets/DataTable/HelperFunctions/processDateObj";

import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";

function DataTable2() {
  //User ID
  const location = useLocation();
  const userID = Number(location.state.userID);

  //Column Details
  const defaultColumnDetails = JSON.parse(JSON.stringify(defaultTableColumn));
  const tableName = "Employee List";

  const [data, setData] = useState([]);
  const [columnDetails, setColumnDetails] = useState(defaultColumnDetails);
  const [columnOrder, setColumnOrder] = useState(getDefaultColumnOrder(columnDetails));
  const [numRowsPerPage, setNumRowsPerPage] = useState(10);

  const handleGet = () => {
    let dbColumnInfo = [];
    let dbColumnOrder = [];
    let dbNumRowsPerPage = 10;

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
            dbColumnOrder = JSON.parse(response.data[0].column_order);
          }
          if (response.data[0].column_settings !== null) {
            dbColumnInfo = JSON.parse(response.data[0].column_settings);
          }
          if (response.data[0].num_rows_per_page !== 10) {
            dbNumRowsPerPage = response.data[0].num_rows_per_page;
          }
        }
      });

    //Get table data
    axios.get("http://localhost:3001/getData").then((response) => {
      console.log(response);
      response.data = processDateObj(response.data);
      setData(response.data);
      if (dbColumnInfo.length !== 0) {
        setColumnDetails(dbColumnInfo);
      }
      if (dbColumnOrder.length !== 0) {
        setColumnOrder(dbColumnOrder);
      }
      if (dbNumRowsPerPage !== 10) {
        setNumRowsPerPage(dbNumRowsPerPage);
      }
    });
  };

  useEffect(() => {
    console.log("Current Page: DataTable");
    handleGet();
  }, []);

  const defaultOptions = defaultTableOptions;

  const tableOptions = {
    options: {
      ...defaultOptions,
      rowsPerPage: numRowsPerPage,
      columnOrder: columnOrder,
      customToolbar: true,
      customToolbarSelect: true,
    },
    onViewColumnChange: (newColumns) => {
      console.log(columnDetails);
      console.log(newColumns);
    },
    onColumnOrderChange: (newColumnOrder) => {
      console.log("oldColumnOrder: " + columnOrder);
      console.log("newColumnOrder: " + newColumnOrder);
    },
    onRowsPerPageChange: (newRowsPerPage) => {
      console.log("oldRowsPerPage: " + numRowsPerPage);
      console.log("newRowsPerPage: " + newRowsPerPage);
    },
    onFilterSaveClick: (filterSettings) => {
      console.log(filterSettings);
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
        <Link className="Link" to="/Home" state={{ userID: userID }}>
          <IconButton aria-label="backArrow">
            <img src={require("../Images/CSIT.png")} width="40%" />
          </IconButton>
        </Link>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Avatar sx={{ bgcolor: amber[800], height: 35, width: 35 }}>{userID}</Avatar>
          <label style={{ marginLeft: 5, fontFamily: "Roboto-Regular" }}>User {userID}</label>
        </div>
      </div>
      <ReactDataTable
        tableName={tableName}
        data={data}
        defaultColumnDetails={defaultTableColumn}
        columnDetails={columnDetails}
        tableOptions={tableOptions}
      />
    </React.Fragment>
  );
}

export default DataTable2;
