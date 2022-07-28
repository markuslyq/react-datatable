import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    isOnInitialLoad: false,
    isFilterDialogOpen: false,
    isFilterAppliedClicked: false,
    isFilterApplied: false,
    isFilterSaveClicked: false,
    filterCount: 0,
    filterObjArr: [],
    deleteFilterRowIndex: -1,
    filteredData: [],
  },
  reducers: {
    setIsOnInitialLoad: (state, action) => {
      state.isOnInitialLoad = action.payload;
    },
    openFilterDialog: (state) => {
      state.isFilterDialogOpen = true;
    },
    closeFilterDialog: (state) => {
      state.isFilterDialogOpen = false;
    },
    setFilterCount: (state, action) => {
      state.filterCount = action.payload;
    },
    setIsFilterAppliedClicked: (state, action) => {
      state.isFilterAppliedClicked = action.payload;
    },
    setIsFilterApplied: (state, action) => {
      state.isFilterApplied = action.payload;
    },
    setIsFilterSaveClicked: (state, action) => {
      state.isFilterSaveClicked = action.payload;
    },
    clearFilterObjArr: (state) => {
      state.filterObjArr = [];
    },
    pushFilterObjArr: (state, action) => {
      state.filterObjArr.push(action.payload);
    },
    setFilterObjArr: (state, action) => {
      state.filterObjArr = action.payload;
    },
    setDeleteFilterRowIndex: (state, action) => {
      state.deleteFilterRowIndex = action.payload;
    },
    deleteFilterObj: (state, action) => {
      state.filterObjArr.splice(action.payload, 1);
    },
    setFilteredData: (state, action) => {
      state.filteredData = action.payload;
    },
  },
});

export const {
  setIsOnInitialLoad,
  openFilterDialog,
  closeFilterDialog,
  setFilterCount,
  setIsFilterAppliedClicked,
  setIsFilterApplied,
  setIsFilterSaveClicked,
  clearFilterObjArr,
  pushFilterObjArr,
  setFilterObjArr,
  setDeleteFilterRowIndex,
  deleteFilterObj,
  setFilteredData,
} = filterSlice.actions;

export default filterSlice.reducer;
