import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NewPassword from "./ResetPassword";
import { publicApi } from "./utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResetLink, setResetLink] = useState(false);
  const [param] = useSearchParams();

  // Check for reset token
  useEffect(() => {
    const token = param.get("token");
    if (token) {
      setResetLink(true);
    }
  }, [param]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await publicApi.get(`/forget-password/${email}`);
      if (response.status === 200) {
        toast.success("Password reset link sent to your email!", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong. Try again.",
        {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isResetLink) {
    return <NewPassword />;
  }

  return (
    <div className="min-h-screen  bg-[#152331] flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white animate-bounce">
            Forgot your password?
          </h2>
          <p className="mt-2 text-sm text-white">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
          action="#"
          method="POST"
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300"
                placeholder="Email address"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              aria-disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 transition-all duration-300"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isLoading ? (
                <span className="flex justify-center items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      d="M4 12a8 8 0 0116 0"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Send reset link"
              )}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <button
            className="text-indigo-600 hover:text-indigo-800 text-sm transition-all duration-300"
            onClick={() => (window.location.href = "/signin")}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
