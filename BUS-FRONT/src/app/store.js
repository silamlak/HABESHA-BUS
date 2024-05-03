import {configureStore} from '@reduxjs/toolkit'
import passangerReducer from './feature/passenger-info'
import booking_info from './feature/booking_info';
export const store = configureStore({
  reducer: {
    info: passangerReducer,
    book: booking_info
  },
});