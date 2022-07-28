import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import MUIDataTable, { TableToolbar } from "mui-datatables";
import tableTheme from "./tableTheme";

import CustomSnackbar from "../../Notification/CustomSnackbar";

import parseColumnSettings from "./HelperFunctions/parseColumnSettings";
import parseTableOptions from "./HelperFunctions/parseTableOptions";
import getDefaultColumnOrder from "./HelperFunctions/getDefaultColumnOrder";

import { setIsToolbarOpen } from "../CustomToolbar/ToolbarToggle/toolbarSlice";
import { setIsRevertClicked } from "../CustomToolbar/Revert/revertSlice";
import {
  clearFilterObjArr,
  setIsOnInitialLoad,
  setIsFilterApplied,
  setIsFilterSaveClicked,
} from "../CustomToolbar/Filter/filterSlice";
import {
  setIsSnackbarOpen,
  setVariant,
  setDuration,
  setMessage,
} from "../../Notification/snackbarSlice";

export default function ReactDataTable(props) {
  const dispatch = useDispatch();

  //Filter Slice
  const isFilterApplied = useSelector((state) => state.filter.isFilterApplied);
  const isFilterSaveClicked = useSelector((state) => state.filter.isFilterSaveClicked);
  const filteredData = useSelector((state) => state.filter.filteredData);
  const filterSettings = useSelector((state) => state.filter.filterObjArr);

  //Toolbar Slice
  const isToolbarOpen = useSelector((state) => state.toolbar.isToolbarOpen);

  //Revert Slice
  const isRevertClicked = useSelector((state) => state.revert.isRevertClicked);

  const tableName = props.tableName ? props.tableName : "";
  const data = props.data ? props.data : [];
  const tableOptions = props.tableOptions ? props.tableOptions : {};

  const columnDetails = JSON.parse(
    JSON.stringify(props.defaultColumnDetails ? props.defaultColumnDetails : [])
  );
  const defaultColumnDetails = parseColumnSettings(columnDetails, data);

  const [columns, setColumns] = useState(
    props.columnDetails ? parseColumnSettings(props.columnDetails, data) : defaultColumnDetails
  );
  const [columnOrder, setColumnOrder] = useState(
    tableOptions.options.columnOrder
      ? tableOptions.options.columnOrder
      : getDefaultColumnOrder(columns)
  );

  const [numRowsPerPage, setNumRowsPerPage] = useState(
    tableOptions.options.rowsPerPage ? tableOptions.options.rowsPerPage : 10
  );

  const tableOptionsParams = {
    ...tableOptions,
    options: {
      ...tableOptions.options,
      search: isToolbarOpen,
      rowsPerPage: numRowsPerPage,
      columnOrder: columnOrder,
    },
    columns: columns,
    data: data,
    tableName: tableName,
    setColumns: setColumns,
    setColumnOrder: setColumnOrder,
    setNumRowsPerPage: setNumRowsPerPage,
  };

  //Insert customed functions into the table options
  const options = parseTableOptions(tableOptionsParams);

  const handleInitialLoad = () => {
    dispatch(clearFilterObjArr());
    dispatch(setIsFilterApplied(false));
    dispatch(setIsOnInitialLoad(true));
    dispatch(setIsToolbarOpen(false));
  };

  const handleRevertSettings = () => {
    setColumns(defaultColumnDetails);
    setColumnOrder(getDefaultColumnOrder(columns));
    setNumRowsPerPage(10);
    dispatch(setIsSnackbarOpen(true));
    dispatch(setVariant("success"));
    dispatch(setDuration(3000));
    dispatch(setMessage("Revert Successfully"));
    dispatch(setIsRevertClicked(false));
  };

  useEffect(() => {
    handleInitialLoad();
  }, []);

  //Update values of "columns", "columnOrder" and "numRowsPerPage"
  useEffect(() => {
    setColumns(parseColumnSettings(props.columnDetails, data));
    setColumnOrder(tableOptions.options.columnOrder);
    setNumRowsPerPage(tableOptions.options.rowsPerPage);
  }, [props.columnDetails, tableOptions.options.columnOrder, tableOptions.options.rowsPerPage]);

  //Revert back to the default table settings
  useEffect(() => {
    if (isRevertClicked) {
      handleRevertSettings();
    }
  }, [isRevertClicked]);

  useEffect(() => {
    if (
      isFilterSaveClicked &&
      options.onFilterSaveClick &&
      typeof options.onFilterSaveClick === "function"
    ) {
      console.log("ran");
      options.onFilterSaveClick(JSON.parse(JSON.stringify(filterSettings)));
      setIsFilterSaveClicked(false);
    }
  }, [isFilterSaveClicked]);

  //Return "columns" value to user
  useEffect(() => {
    if (options.onViewColumnChange && typeof options.onViewColumnChange === "function") {
      options.onViewColumnChange(JSON.parse(JSON.stringify(columns)));
    }
  }, [columns]);

  //Return "columnOrder" value to user
  useEffect(() => {
    if (options.onColOrderChange && typeof options.onColOrderChange === "function") {
      options.onColOrderChange(columnOrder);
    }
  }, [columnOrder]);

  //Return "numRowsPerPage" value to user
  useEffect(() => {
    if (options.onRowsPerPageChange && typeof options.onRowsPerPageChange === "function") {
      options.onRowsPerPageChange(numRowsPerPage);
    }
  }, [numRowsPerPage]);

  return (
    <ThemeProvider theme={tableTheme}>
      <CustomSnackbar />
      {columns !== null && columnOrder !== null && data !== [] ? (
        <MUIDataTable
          title={tableName}
          data={isFilterApplied ? filteredData : data}
          columns={columns}
          options={options}
        />
      ) : (
        <React.Fragment>
          <img src={require("../../../Images/loading.gif")} width="10%" />
        </React.Fragment>
      )}
    </ThemeProvider>
  );
}
