import { createSlice } from "@reduxjs/toolkit";

const tableSlice = createSlice({
  name: "table",
  initialState: {
    isLoadingFromDB: true,
  },
  reducers: {
    setIsLoadingFromDB: (state, action) => {
      state.isLoadingFromDB = action.payload;
    },
  },
});

export const { setIsLoadingFromDB } = tableSlice.actions;

export default tableSlice.reducer;
