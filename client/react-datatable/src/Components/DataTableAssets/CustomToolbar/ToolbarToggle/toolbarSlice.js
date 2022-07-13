import { createSlice, createSelector } from "@reduxjs/toolkit";

const toolbarSlice = createSlice({
  name: "toolbar",
  initialState: {
    isToolbarOpen: false,
  },
  reducers: {
    setIsToolbarOpen: (state, action) => {
      state.isToolbarOpen = action.payload;
    },
  },
});

export const { setIsToolbarOpen } = toolbarSlice.actions;

export default toolbarSlice.reducer;
