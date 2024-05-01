import {configureStore} from '@reduxjs/toolkit'
import passangerReducer from './feature/passenger-info'
export const store = configureStore({
  reducer: {
    info: passangerReducer,
  },
});