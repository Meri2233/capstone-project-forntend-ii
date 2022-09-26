import { createSlice } from '@reduxjs/toolkit'

export const doctorSlice = createSlice({
    name: 'doctor',
    initialState: {
        doctors: [],
    },
    reducers: {
        addDoctors: (state, action) => {
            state.doctors = action.payload
        }
    },
})

export const { addDoctors } = doctorSlice.actions

export default doctorSlice.reducer