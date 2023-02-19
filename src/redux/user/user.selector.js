import { createSelector } from "@reduxjs/toolkit";

const userReducer = (state) => state.user;

export const currentUserSelector = createSelector(
  [userReducer],
  (userSlice) => userSlice.currentUser
);
export const isLoadingSelector = createSelector(
  [userReducer],
  (userSlice) => userSlice.isLoading
);

