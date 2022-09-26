import { configureStore } from '@reduxjs/toolkit'
import doctorReducer from "./slices/doctorSlice"
import dateReducer from "./slices/dateSlice"
import pastReducer from "./slices/pastSlice"
import todayReducer from "./slices/todaySlice"
import upcomingReducer from "./slices/upcomingSlice"

export default configureStore({
  reducer: {
    doctor: doctorReducer,
    date: dateReducer,
    past: pastReducer,
    todays: todayReducer,
    upcoming: upcomingReducer
  },
})