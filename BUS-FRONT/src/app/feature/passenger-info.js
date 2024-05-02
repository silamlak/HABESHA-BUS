import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    passanger_info: {
        name: 'hello',
        email: 'man'
    },
    seat_selection:{
        route:'',
        seat_no: 0,
        status: ''
    },
    bagSelection: {},
    paymentOf: {},
    routOfId: ''
}

export const pass_info = createSlice({
  name: "passenger_information",
  initialState,
  reducers: {
    setPassInfo: (state, action) => {
      state.passanger_info = action.payload;
      // state.passanger_info.email = action.payload.email;
    },
    setPassSeat: (state, action) => {
      state.seat_selection = action.payload;
    },
    setRoutOfId: (state, action) => {
      state.routOfId = action.payload;
    },
  },
});

export const { setPassInfo, setPassSeat, setRoutOfId } = pass_info.actions;

export default pass_info.reducer