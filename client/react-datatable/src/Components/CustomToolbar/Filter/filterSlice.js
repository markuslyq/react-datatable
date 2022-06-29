import { createSlice, createSelector } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    isFilterDialogOpen: false,
    isFilterAppliedClicked: false,
    isFilterApplied: false,
    filterCount: 0,
    filterObjArr: [],
    deleteFilterRowIndex: -1,
    filteredData: [],
  },
  reducers: {
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
    clearFilterObjArr: (state) => {
      state.filterObjArr = [];
    },
    pushFilterObjArr: (state, action) => {
      state.filterObjArr.push(action.payload);
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
  openFilterDialog,
  closeFilterDialog,
  setFilterCount,
  setIsFilterAppliedClicked,
  setIsFilterApplied,
  clearFilterObjArr,
  pushFilterObjArr,
  setDeleteFilterRowIndex,
  deleteFilterObj,
  setFilteredData,
} = filterSlice.actions;

export default filterSlice.reducer;