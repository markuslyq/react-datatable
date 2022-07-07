import { createSlice, createSelector } from "@reduxjs/toolkit";

const tableSlice = createSlice({
  name: "table",
  initialState: {
    tableName: "",
    tableColumns: [],
    tableColumnOrder: [],
    tableData: [],
    tableOptions: {},
    isLoadingFromDB: true,
  },
  reducers: {
    setTableName: (state, action) => {
      state.tableName = action.payload;
    },
    setTableColumns: (state, action) => {
      state.tableColumns = action.payload;
    },
    setTableColumnOrder: (state, action) => {
      state.tableColumnOrder = action.payload;
    },
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setTableOptions: (state, action) => {
      state.tableOptions = action.payload;
    },
    setIsLoadingFromDB: (state, action) => {
      state.isLoadingFromDB = action.payload;
    },
  },
});

export const {
  setTableName,
  setTableColumns,
  setTableColumnOrder,
  setTableData,
  setTableOptions,
  setIsLoadingFromDB,
} = tableSlice.actions;

export default tableSlice.reducer;
