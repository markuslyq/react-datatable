import { configureStore } from "@reduxjs/toolkit";

import tableReducer from "./Components/DataTableAssets/DataTable/tableSlice";
import filterReducer from "./Components/DataTableAssets/CustomToolbar/Filter/filterSlice";
import revertReducer from "./Components/DataTableAssets/CustomToolbar/Revert/revertSlice";
import snackbarReducer from "./Components/Notification/snackbarSlice";

export default configureStore({
  reducer: {
    table: tableReducer,
    filter: filterReducer,
    revert: revertReducer,
    snackbar: snackbarReducer,
  },
});
