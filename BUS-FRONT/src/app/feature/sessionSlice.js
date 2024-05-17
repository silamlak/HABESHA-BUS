import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timer: 0,
  expired: true,
};

export const sessionSlices = createSlice({
  name: "session timer",
  initialState,
  reducers: {
    startSession: (state) => {
    //   state.timer = Date.now();
      state.expired = false;
    },
    resetSessionTimer: (state) => {
      state.timer = Date.now();
    },
    endSession: (state) => {
      state.expired = true;
    //   state.timer = 0;
    },
  },
});

export const { startSession, resetSessionTimer, endSession } = sessionSlices.actions;

export default sessionSlices.reducer