import { createSlice } from '@reduxjs/toolkit'

export const dateSlice = createSlice({
    name: 'date',
    initialState: {
        dates: [],
    },
    reducers: {
        addDate: (state, action) => {
            state.dates = action.payload
        }
    },
})

export const { addDate } = dateSlice.actions

export default dateSlice.reducer