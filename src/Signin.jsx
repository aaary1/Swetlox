import * as yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { publicApi } from "./utils/api";
import { useState } from "react";
import Loadder from "./loadder/Loadder";
import { useDispatch } from "react-redux";
import { userAction } from "./reducer/userReducer";
import { toast, ToastContainer } from "react-toastify";
import { BACKEDNURL } from "./config/config";

function Signin() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { touched, handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("**Enter valid email")
        .required("**Email is required"),
      password: yup
        .string()
        .min(8, "**Password length must be at least 8 characters")
        .required("**Password is required"),
    }),
    onSubmit: async (loginData) => {
      setLoading(true);
      try {
        const { data } = await publicApi.post("/auth/sign-in", loginData);
        console.log(data);
        setLoading(false);
        localStorage.setItem("auth", data.message);
        toast.success("Successful login");
        navigate("/");
        window.location.reload();
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Something went wrong. Try again.",
          {
            position: "top-right",
            autoClose: 5000,
            theme: "colored",
          }
        );
        dispatch(userAction.setIsAuthenticated(false));
        setLoading(false);
      }
    },
  });

  const handleOAuthLogin = async (OAuthId) => {
    window.location.href =
      BACKEDNURL + "/swetlox/v1/auth/oauth/login/" + OAuthId;
  };

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loadder />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#152331]">
      <div className="w-[90%] max-w-[500px] bg-[#152331] rounded-xl p-6">
        <div className="w-full mb-5 flex justify-center">
          <img
            src="src/image/logo2.png"
            alt="Logo"
            className="w-[250px] hover:cursor-pointer"
          />
        </div>
        <h2 className="text-xl font-bold text-center text-white mb-4">
          Sign in to your account
        </h2>
        <div className="flex justify-center mb-4">
          <h6 className="text-[#53abf3] mr-1">Don't have an account?</h6>
          <Link
            to="/signup"
            className="font-semibold text-[#00bcd4] hover:underline"
          >
            Create a free account
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-base font-medium text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full h-10 rounded-md border  bg-transparent px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 text-gray-300 mt-2"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && touched.email && (
              <p className="text-sm text-red-600 font-semibold">
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="text-base font-medium text-gray-400">
                Password
              </label>
              <a
                href="/forgetpassword"
                className="text-sm font-semibold text-gray-400 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full h-10 rounded-md border  bg-transparent px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 text-gray-300 mt-2"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && touched.password && (
              <p className="text-sm text-red-600 font-semibold">
                {errors.password}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-md py-2 mt-4  flex items-center justify-center"
          >
            Get started
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </form>
        <div className="mt-4 space-y-4">
          <button
            type="button"
            onClick={() => handleOAuthLogin("GOOGLE")}
            className="w-full bg-[#1a1a1a] text-white border border-gray-500 rounded-md py-2.5 font-semibold flex items-center justify-center hover:bg-[#333] focus:bg-[#333]"
          >
            <svg
              className="h-6 w-6 text-rose-500 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
            </svg>
            Sign in with Google
          </button>
          <button
            type="button"
            onClick={() => handleOAuthLogin("GITHUB")}
            className="w-full bg-[#1a1a1a] text-white border border-gray-500 rounded-md py-2.5 font-semibold flex items-center justify-center hover:bg-[#333] focus:bg-[#333]"
          >
            <svg
              className="h-6 w-6 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0.296C5.372 0.296 0 5.67 0 12.296c0 5.303 3.438 9.8 8.205 11.387.6.11.82-.261.82-.578v-2.234c-3.338.726-4.04-1.61-4.04-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.744.083-.729.083-.729 1.204.084 1.837 1.23 1.837 1.23 1.07 1.833 2.809 1.304 3.493.997.107-.774.418-1.305.761-1.604-2.664-.305-5.466-1.332-5.466-5.933 0-1.311.469-2.384 1.235-3.226-.124-.303-.535-1.528.116-3.185 0 0 1.008-.322 3.302 1.23a11.493 11.493 0 0 1 3.004-.404c1.02.004 2.047.138 3.004.404 2.294-1.552 3.3-1.23 3.3-1.23.652 1.657.241 2.882.118 3.185.768.842 1.233 1.915 1.233 3.226 0 4.612-2.807 5.625-5.478 5.922.429.372.812 1.104.812 2.226v3.295c0 .32.218.693.825.576C20.565 22.092 24 17.598 24 12.296 24 5.67 18.627.296 12 .296z" />
            </svg>
            Sign in with Github
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signin;
