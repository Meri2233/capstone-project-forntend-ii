import { createSlice } from '@reduxjs/toolkit'

export const todaySlice = createSlice({
    name: 'today',
    initialState: {
        todaysconsultations: [],
    },
    reducers: {
        addTodaysConsultation: (state, action) => {
            state.todaysconsultations = action.payload
        }
    },
})

export const { addTodaysConsultation } = todaySlice.actions

export default todaySlice.reducer