import "global";
import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Fullchat from "./Chat/Fullchat.jsx";
import "./css/index.css";
import Middlepart from "./Middlepart/Middlepart.jsx";
import Profile from "./Profile/Profile.jsx";
import userReducer from "./reducer/userReducer.js";
import Reels from "./Reels.jsx";
import Signin from "./Signin.jsx";
import Signup from "./Signup.jsx";
import { webSocketReducer } from "./reducer/webSocketSlice.js";
import BookMark from "./BookMark.jsx";
import MidChatUser from "./Chat/MidChatUser.jsx";
import ForgotPassword from "./ForgetPassword";
import OtherProfile from "./otherProfile/OtherProfile.jsx";
import recentChatReducer from "./reducer/recentChatReducer.js";
const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      { path: "/profile", element: <Profile></Profile> },
      { path: "/", element: <Middlepart></Middlepart> },
      { path: "/reels", element: <Reels></Reels> },
      { path: "/chat", element: <Fullchat></Fullchat> },
      { path: "/collections", element: <BookMark></BookMark> },
      { path: "/message", element: <MidChatUser></MidChatUser> },
      { path: "/profile/:userId", element: <OtherProfile /> },
    ],
  },
  {
    path: "/signup",
    element: <Signup></Signup>,
  },
  {
    path: "/signin",
    element: <Signin></Signin>,
  },
  { path: "/forgetpassword", element: <ForgotPassword></ForgotPassword> },
]);

export const store = configureStore({
  reducer: {
    userDetails: userReducer,
    webSocket: webSocketReducer,
    recentChat: recentChatReducer,
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);
