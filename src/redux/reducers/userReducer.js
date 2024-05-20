import { createAction, createReducer } from "@reduxjs/toolkit";

export const saveUser = createAction("saveUser");
export const clearUser = createAction("clearUser");
const initialState = {
  user: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(saveUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(clearUser, (state) => {
      state.user = null;
    });
});
