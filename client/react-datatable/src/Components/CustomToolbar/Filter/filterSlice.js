import { createSlice, createSelector } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filterUserID: -1,
    isFilterDialogOpen: false,
    isFilterAppliedClicked: false,
    isFilterApplied: false,
    filterCount: 0,
    filterObjArr: [],
    deleteFilterRowIndex: -1,
    filteredData: [],
  },
  reducers: {
    setFilterUserID: (state, action) => {
      state.filterUserID = action.payload;
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
  setFilterUserID,
  openFilterDialog,
  closeFilterDialog,
  setFilterCount,
  setIsFilterAppliedClicked,
  setIsFilterApplied,
  clearFilterObjArr,
  pushFilterObjArr,
  setFilterObjArr,
  setDeleteFilterRowIndex,
  deleteFilterObj,
  setFilteredData,
} = filterSlice.actions;

export default filterSlice.reducer;
