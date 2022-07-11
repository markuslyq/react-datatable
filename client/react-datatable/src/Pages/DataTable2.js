import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import "../App.css";
import MUIDataTable from "mui-datatables";
import { IconButton, Avatar } from "@mui/material";
import { amber } from "@mui/material/colors";
import { styles } from "../Components/DataTableAssets/DataTable/styles";
import tableTheme from "../Components/DataTableAssets/DataTable/tableTheme";

import CustomToolbar from "../Components/DataTableAssets/CustomToolbar/CustomToolbar";
import CustomToolbarSelect from "../Components/DataTableAssets/CustomToolbarSelect/CustomToolbarSelect";
import CustomSnackbar from "../Components/Notification/CustomSnackbar";
import getDefaultColumnOrder from "../Components/DataTableAssets/DataTable/HelperFunctions/getDefaultColumnOrder";
import processDateObj from "../Components/DataTableAssets/DataTable/HelperFunctions/processDateObj";
import parseColumnSettings from "../Components/DataTableAssets/DataTable/HelperFunctions/parseColumnSettings";

import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";

import { setIsLoadingFromDB } from "../Components/DataTableAssets/DataTable/tableSlice";
import {
  clearFilterObjArr,
  setFilterUserID,
  setIsOnInitialLoad,
} from "../Components/DataTableAssets/CustomToolbar/Filter/filterSlice";
import { setIsRevertClicked } from "../Components/DataTableAssets/CustomToolbar/Revert/revertSlice";
import {
  setIsSnackbarOpen,
  setVariant,
  setDuration,
  setMessage,
} from "../Components/Notification/snackbarSlice";

function DataTable2() {
  const dispatch = useDispatch();

  const isLoadingFromDB = useSelector((state) => state.table.isLoadingFromDB);

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
      subHeaders: ["Company", "Department", "Years"],
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

  const location = useLocation();
  const { userID } = location.state;

  const [data, setData] = useState([]);
  const defaultColumnDetails = parseColumnSettings(columnDetails, data);
  const [columns, setColumns] = useState(defaultColumnDetails);
  const [columnOrder, setColumnOrder] = useState(getDefaultColumnOrder(columns));

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
              dbColumnInfo = parseColumnSettings(
                JSON.parse(response.data[0].column_settings),
                data
              );
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
      response.data = processDateObj(response.data);
      setData(response.data);
      if (dbColumnInfo.length === 0) {
        dbColumnInfo = defaultColumnDetails;
        console.log("ran");
        setColumns(dbColumnInfo);
      }
    });
  };

  const handleRevertSettings = () => {
    setColumns(defaultColumnDetails);
    setColumnOrder(getDefaultColumnOrder(columns));
    dispatch(setIsSnackbarOpen(true));
    dispatch(setVariant("success"));
    dispatch(setDuration(3000));
    dispatch(setMessage("Revert Successfully"));
    dispatch(setIsRevertClicked(false));
  };

  useEffect(() => {
    console.log("Current Page: DataTable");
    if (filterUserID !== userID) {
      dispatch(clearFilterObjArr());
      dispatch(setFilterUserID(userID));
      dispatch(setIsOnInitialLoad(true));
    }
    if (isLoadingFromDB) {
      handleGet();
      dispatch(setIsLoadingFromDB(false));
    }
    if (isRevertClicked) {
      handleRevertSettings();
    }
  }, [isRevertClicked, isLoadingFromDB]);

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
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
      let params = {
        columns: columns,
        selectedRows: selectedRows,
        data: data,
        columnOrder: columnOrder,
      }
      return <CustomToolbarSelect params={params}/>;
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
          <label style={{ marginLeft: 5, fontFamily: "Roboto-Regular" }}>User {userID}</label>
        </div>
      </div>
      <CustomSnackbar />
      <ThemeProvider theme={tableTheme}>
        {columns !== null && columnOrder !== null && data !== [] ? (
          <MUIDataTable
            title={tableName}
            data={isFilterApplied ? filteredData : data}
            columns={columns}
            options={options}
          />
        ) : (
          <React.Fragment>
            <img src={require("../Images/loading.gif")} width="10%" />
          </React.Fragment>
        )}
      </ThemeProvider>
    </React.Fragment>
  );
}

export default DataTable2;
