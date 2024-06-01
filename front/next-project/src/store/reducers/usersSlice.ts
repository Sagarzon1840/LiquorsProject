import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface IUser {
  name: string;
  email: string;
}

const initialState: IUser = {
  name: "",
  email: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    createUsers(state, action) {},
    readUsers(state, action: PayloadAction<IUser>) {
      state = action.payload;
    },

    updateUsers(state, action) {},
    deleteUsers(state, action) {},
  },
});

export const { createUsers, readUsers, updateUsers, deleteUsers } =
  usersSlice.actions;

export default usersSlice;
