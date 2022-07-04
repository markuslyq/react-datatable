import { configureStore } from "@reduxjs/toolkit";

import filterReducer from "./Components/DataTableAssets/CustomToolbar/Filter/filterSlice";
import revertReducer from "./Components/DataTableAssets/CustomToolbar/Revert/revertSlice";
import snackbarReducer from "./Components/Notification/snackbarSlice";

export default configureStore({
  reducer: {
    filter: filterReducer,
    revert: revertReducer,
    snackbar: snackbarReducer,
  },
});
