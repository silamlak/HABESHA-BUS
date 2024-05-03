import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  bookingId: "",
};

export const book_info = createSlice({
  name: "bookign info",
  initialState,
  reducers: {
    setBookId: (state, action) => {
      state.bookingId = action.payload;
    },
    bookIdClearOut: () => {
      return initialState
    },

  },
});

export const { setBookId, bookIdClearOut } = book_info.actions;

export default book_info.reducer