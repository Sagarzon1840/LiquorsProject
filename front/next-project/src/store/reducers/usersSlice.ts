import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const usersReducer = createSlice({
  name: "users",
  initialState,
  reducers: {},
});
