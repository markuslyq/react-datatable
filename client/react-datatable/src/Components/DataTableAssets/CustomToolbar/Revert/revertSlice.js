import { createSlice } from "@reduxjs/toolkit";

const revertSlice = createSlice({
  name: "revert",
  initialState: {
    isRevertClicked: false,
  },
  reducers: {
    setIsRevertClicked: (state, action) => {
      state.isRevertClicked = action.payload;
    },
  },
});

export const { setIsRevertClicked } = revertSlice.actions;

export default revertSlice.reducer;
