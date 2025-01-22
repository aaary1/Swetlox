import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
  recentChatUser: [],
};
const recentChatSlice = createSlice({
  name: "recentChat",
  initialState: initialValues,
  reducers: {
    addUser: (state, payload) => {
      console.log("payload==========");
      console.log(payload);
      const existingUserIndex = state.recentChatUser.findIndex(
        (u) => u.userId === payload.payload.user.userId
      );

      // If user already exists, remove it from its current position
      if (existingUserIndex !== -1) {
        state.recentChatUser.splice(existingUserIndex, 1);
      }

      // Add the user at the first position
      state.recentChatUser.unshift(payload.payload.user);
    },
    addBulkUser: (state, payload) => {
      state.recentChatUser.push(...payload.payload)
    },
  },
});
export const recentChatAction = recentChatSlice.actions;
export default recentChatSlice.reducer;
