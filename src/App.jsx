import React, { useEffect } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "./reducer/userReducer";
import { privateApi } from "./utils/api";
import { connect } from "./utils/webSocketConnection";
import Navbar from "./Navbar/Navbar";
import Lsidebar from "./Lsidebar/Lsidebar";
import Rsidebar from "./Rsidebar/Rsidebar";
import Signin from "./Signin";
import Loadder from "./loadder/Loadder";
import AdminDashboard from "./admin/AdminDashboard";
import { toast } from "react-toastify";
import { FRONTEDURL } from "./config/config";

function App() {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const isAuthenticated = useSelector(
    (state) => state.userDetails.isAuthenticated.payload
  );
  const isLoading = useSelector((state) => state.userDetails.loading);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("authToken");
  const navigate = useNavigate();
  // const isExist = localStorage.getItem("auth");

  useEffect(() => {
    // Handle token validation and login redirection
    if (token) {
      toast.success("Login success");
      localStorage.setItem("auth", token);
      setTimeout(() => {
        window.location.href = FRONTEDURL;
      }, 1000);
      // safer redirect method
    }
    const checkAuthStatus = async () => {
      try {
        // Checking authentication status
        const { data } = await privateApi.get("/user/auth-status");
        dispatch(userAction.setIsAuthenticated(true));
        dispatch(userAction.setUserDetails(data));
        dispatch(userAction.setLoading(false));
        console.log(data);
        connect(); // Establish WebSocket connection
      } catch (error) {
        // Handle API error
        dispatch(userAction.setIsAuthenticated(false));
        dispatch(userAction.setUserDetails(null)); // Clear user details
        dispatch(userAction.setLoading(false));
      }
    };
    checkAuthStatus();
  }, [token, dispatch]);
  console.log(userDetails);
  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loadder />
      </div>
    );
  }
  console.log(isAuthenticated);

  if (!isAuthenticated) {
    return <Signin />;
  }

  return (
    <>
      <Navbar />
      {userDetails.user.roleList[0].role !== "ADMIN" ? (
        <div className="flex">
          <Lsidebar />
          <Outlet />
          <Rsidebar />
        </div>
      ) : (
        <AdminDashboard />
      )}
    </>
  );
}

export default App;
