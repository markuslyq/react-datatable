import { createSlice } from "@reduxjs/toolkit";

const tableSlice = createSlice({
  name: "table",
  initialState: {
    isLoadingFromDB: true,
    isSorted: false,
  },
  reducers: {
    setIsLoadingFromDB: (state, action) => {
      state.isLoadingFromDB = action.payload;
    },
    setIsSorted: (state, action) => {
      state.isSorted = action.payload;
    },
  },
});

export const { setIsLoadingFromDB, setIsSorted } = tableSlice.actions;

export default tableSlice.reducer;
