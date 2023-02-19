import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {
    email: null,
    userName: null,
    userID: null,
  },
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Actions
    SET_ACTIVE_USER(state, action) {
      state.isLoading = true;
      if (action.payload) {
        const { currentUser } = action.payload;
        state.currentUser = { ...currentUser };
      }
      state.isLoading = false;
    },
    REMOVE_ACTIVE_USER: (state, action) => {
      state.isLoading = true;
      state.currentUser = null;
      state.isLoading = false;
    },
  },
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = userSlice.actions;
export default userSlice.reducer;
