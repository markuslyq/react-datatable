import { configureStore } from '@reduxjs/toolkit'

import filterReducer from './Components/CustomToolbar/Filter/filterSlice'
import revertReducer from './Components/CustomToolbar/Revert/revertSlice'

export default configureStore({
  reducer: {
    filter : filterReducer,
    revert : revertReducer,
  },
})