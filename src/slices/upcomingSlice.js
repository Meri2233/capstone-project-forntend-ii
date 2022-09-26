import { createSlice } from '@reduxjs/toolkit'

export const upcomingSlice = createSlice({
    name: 'upcoming',
    initialState: {
        upcomingconsultations: [],
    },
    reducers: {
        addUpcomingConsultation: (state, action) => {
            state.upcomingconsultations = action.payload
        }
    },
})

export const { addUpcomingConsultation } = upcomingSlice.actions

export default upcomingSlice.reducer