import { createSlice, createSelector } from "@reduxjs/toolkit";

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    isSnackbarOpen: false,
    variant: "success",
    duration: 3000,
    message: "",
  },
  reducers: {
    setIsSnackbarOpen: (state, action) => {
      state.isSnackbarOpen = action.payload;
    },
    setVariant: (state, action) => {
      state.variant = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { setIsSnackbarOpen, setVariant, setDuration, setMessage } =
  snackbarSlice.actions;

export default snackbarSlice.reducer;
