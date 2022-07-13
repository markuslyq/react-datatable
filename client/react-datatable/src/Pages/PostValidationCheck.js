import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../App.css";
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { Button, Avatar } from "@mui/material";
import { amber } from "@mui/material/colors";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import tableTheme from "../Components/DataTableAssets/DataTable/tableTheme";

import FilterButton from "../Components/DataTableAssets/CustomToolbar/Filter/FilterButton";
import parseColumnSettings from "../Components/DataTableAssets/DataTable/HelperFunctions/parseColumnSettings";

import { setIsLoadingFromDB } from "../Components/DataTableAssets/DataTable/tableSlice";

export default function PostValidationCheck() {
  const dispatch = useDispatch();

  const location = useLocation();

  const userID = location.state.userID;
  const selectedData = location.state.selectedData;
  const columnDetails = JSON.parse(location.state.columns);
  const columns = parseColumnSettings(columnDetails, selectedData);
  const [columnOrder, setColumnOrder] = useState(location.state.columnOrder);

  const handleBackButton = () => {
    dispatch(setIsLoadingFromDB(true));
  };

  useEffect(() => {
    console.log("Current Page: Post Validation Check Page");
  }, []);

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
      return <FilterButton columns={columns} data={selectedData} />;
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
        <Link
          className="Link"
          to="/DataTable2"
          state={{ userID: userID }}
          onClick={handleBackButton}
        >
          <Button style={{ color: amber[800], fontSize: "16px" }}>
            <ArrowLeftIcon fontSize="large" />
            Back
          </Button>
        </Link>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Avatar sx={{ bgcolor: amber[800], height: 35, width: 35 }}>{userID}</Avatar>
          <label style={{ marginLeft: 5, fontFamily: "Roboto-Regular" }}>User {userID}</label>
        </div>
      </div>
      <ThemeProvider theme={tableTheme}>
        <MUIDataTable
          title={"Selected Rows"}
          data={selectedData}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </React.Fragment>
  );
}
