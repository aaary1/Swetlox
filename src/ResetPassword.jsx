import React, { useState } from "react";
import { publicApi } from "./utils/api";

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (newPassword.length < 8) {
      setErrorMessage("Password length must be 8 or more");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const token = new URLSearchParams(window.location.search).get("token");
      const response = await publicApi.post("/reset-password", {
        token: token,
        newPassword: newPassword,
      });
      setIsSuccess(true);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#152331] flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white animate-bounce">
            Set a New Password
          </h2>
          <p className="mt-2 text-sm text-white">
            Enter your new password below.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
          action="#"
          method="POST"
        >
          <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-2">
            <div>
              <label htmlFor="new-password" className="sr-only">
                New Password
              </label>
              <input
                id="new-password"
                name="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300"
                placeholder="New password"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300"
                placeholder="Confirm password"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading
                  ? "bg-gray-500"
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
                  Saving...
                </span>
              ) : (
                "Save New Password"
              )}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {errorMessage && (
          <div className="mt-4 text-center text-red-500">
            <p className="text-lg font-semibold">{errorMessage}</p>
          </div>
        )}

        {/* Success Message */}
        {isSuccess && (
          <div className="mt-4 text-center text-green-500">
            <p className="text-lg font-semibold">
              Password reset successfully!
            </p>
            <p className="mt-2 text-sm">
              You can now{" "}
              <a href="/signin" className="text-indigo-600">
                login
              </a>{" "}
              with your new password.
            </p>
          </div>
        )}

        {/* Back to Login Button */}
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

export default NewPassword;
