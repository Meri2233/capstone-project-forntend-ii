import { createSlice } from '@reduxjs/toolkit'

export const pastSlice = createSlice({
    name: 'past',
    initialState: {
        pastconsultations: [],
    },
    reducers: {
        addPastConsultation: (state, action) => {
            state.pastconsultations = action.payload
        }
    },
})

export const { addPastConsultation } = pastSlice.actions

export default pastSlice.reducer