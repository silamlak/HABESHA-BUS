import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    passanger_info: {
        name: 'hello',
        email: 'man'
    },
    seat_selection:[],
    bagSelection: {},
    paymentOf: {}
}

export const pass_info = createSlice({
    name: 'passenger_information',
    initialState,
    reducers: {
        setPassInfo: (state, action) => {
            state.passanger_info.name = action.payload.name;
        }
    }
})

export const {setPassInfo} = pass_info.actions

export default pass_info.reducer