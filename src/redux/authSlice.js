import { createSlice } from '@reduxjs/toolkit';
import { logOut, loginUser, refreshUser, registerUser } from './operations';
import { UserInitialState } from './initialState';

import { isAnyOf } from '@reduxjs/toolkit/dist';
const handelPending = state => {
  state.isLoading = true;
  state.error = null;
};
const handelRejected = (state, action) => {
  // console.log('action.payload: ', action.payload);
  state.isLoading = false;
  state.error = action.payload;
};
const handelFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: UserInitialState,
  extraReducers: builder =>
    builder
      // ----- REGISTER -----
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthorizated = true;
        //  action.payload.user тут прийде відповідь з бекенду обєкт юзера

        state.userData = action.payload.user;
        console.log(' action.payload.user: ', action.payload.user);
        state.token = action.payload.token;
        console.log('action.payload.token: ', action.payload.token);
      })

      // ----- LOGIN -----

      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthorizated = true;
        state.userData = action.payload.user;
        state.token = action.payload.token;
      })

      // ----- REFRESH -----

      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthorizated = true;
        state.userData = action.payload;
      })

      // ----- LOGOUT -----

      .addCase(logOut.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthorizated = false;
        state.userData = null;
        state.token = null;
      })
      .addMatcher(
        isAnyOf(
          registerUser.pending,
          loginUser.pending,
          refreshUser.pending
          //   addContact.pending,
          //   deleteContact.pending
        ),
        handelPending
      )
      .addMatcher(
        isAnyOf(
          registerUser.rejected,
          loginUser.rejected,
          refreshUser.rejected,
          logOut.rejected
        ),
        handelRejected
      )
      .addMatcher(
        isAnyOf(
          registerUser.fulfilled,
          loginUser.fulfilled,
          refreshUser.fulfilled,
          logOut.fulfilled
        ),
        handelFulfilled
      ),
});
export const authReducer = authSlice.reducer;
