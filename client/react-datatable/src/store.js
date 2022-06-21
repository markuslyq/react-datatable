import { configureStore } from '@reduxjs/toolkit'

import filterReducer from './Components/CustomToolbar/Filter/filterSlice'

export default configureStore({
  reducer: {
    filter : filterReducer,
  },
})