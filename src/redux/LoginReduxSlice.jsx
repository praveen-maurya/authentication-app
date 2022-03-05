import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    logIn: false
 }

const LoginReduxSlice = createSlice({
  name: 'loginRedux',
  initialState,
  reducers: {
    setLogIn(state, action) {
      state.logIn = action.payload;
    },
    resetState(state, action) {
        state.logIn= false;
    }
  },
})

export const LogInActions = LoginReduxSlice.actions;
export default LoginReduxSlice.reducer;