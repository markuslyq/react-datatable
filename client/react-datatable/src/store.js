import { configureStore } from '@reduxjs/toolkit'

import filterReducer from './Components/Filter/filterSlice'

export default configureStore({
  reducer: {
    filter : filterReducer,
  },
})