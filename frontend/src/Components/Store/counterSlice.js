import { createSlice } from '@reduxjs/toolkit'
  

const initialState = {
  user:"",isloggedin:false
}

export const counterSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state){
        state.isloggedin = true;
    },
     logout(state) {
      state.isloggedin = false;
      state.user = "";
    }
   
  },
})


export const {login , logout} = counterSlice.actions

export default counterSlice.reducer