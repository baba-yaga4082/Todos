import { configureStore } from '@reduxjs/toolkit'
import counterSlice from '../Store/counterSlice'

export const store = configureStore({
  reducer: counterSlice
    

})