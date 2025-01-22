import { useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";
import { BACKEDNURL } from "./config/config";
import OtpScreen from "./OtpScreen";
import { publicApi } from "./utils/api";

function Signup() {
  const [displayOtpScreen, setDisplayOtpScrren] = useState(false);
  const { touched, handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      fullName: "",
      userName: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      fullName: yup
        .string()
        .min(2, "**fullname length must be atlest 2")
        .required("**Fullname is required"),
      userName: yup
        .string()
        .min(2, "**username length must be atlest 2")
        .required("**Username is required"),
      email: yup
        .string()
        .email("**Enter valid email")
        .required("**Email is required"),
      password: yup
        .string()
        .min(8, "**password length must be atlest 8")
        .required("**Password is required"),
    }),
    onSubmit: async (signUpData) => {
      console.log(signUpData);
      try {
        const res = await publicApi.post("/auth/sign-up", signUpData);
        if (res.status == 200) {
          console.log("sign-up");
          setDisplayOtpScrren(true);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Something went wrong. Try again."
        );
      }
    },
  });
  const handleOAuthLogin = async (OAuthId) => {
    window.location.href =
      BACKEDNURL+"/swetlox/v1/auth/oauth/login/" + OAuthId;
  };
  if (displayOtpScreen) {
    return <OtpScreen email={values.email}></OtpScreen>;
  }
  return (
    <>
      <div className="h-[100vh]  bg-[#152331]">
        <ToastContainer></ToastContainer>
        <div className="w-[500px]  h-[600px] bg-[#152331] absolute mt-10 ml-[550px] rounded-xl">
          <div className=" w-full h-[70px] ">
            <img
              src="src/image/logo2.png"
              alt="Logo"
              className=" w-[250px] mt-5 ml-[125px] hover:cursor-pointer "
            />
          </div>
          <div>
            <section class="rounded-md">
              <div class="flex items-center justify-center w-[100%]">
                <div class="">
                  <div className=" w-full items-center  mt-5">
                    <h2 class="text-2xl font-bold leading-tight   text-gray-300 text-center ">
                      Create account
                    </h2>
                    <div className="flex text-center mt-2 ml-12">
                      <h6 className="text-[#53abf3]  ml-[50px] mr-1">
                        Already have an account?
                      </h6>

                      <Link
                        to={"/signin"}
                        title=""
                        class="font-semibold text-[#00bcd4] transition-all duration-200 hover:underline text-center"
                      >
                        Sign In
                      </Link>
                    </div>
                  </div>

                  <form method="POST" onSubmit={handleSubmit} class="mt-8">
                    <div class="space-y-5 b">
                      <div className="flex flex-col space-y-4">
                        <div className="flex gap-5">
                          {/* Username Input */}
                          <div className="flex flex-col space-y-2 flex-1">
                            <label
                              htmlFor="Name"
                              className="text-base font-medium text-slate-300"
                            >
                              Name
                            </label>
                            <input
                              className="h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-gray-400"
                              type="text"
                              value={values.fullName}
                              name="fullName"
                              placeholder="Enter your Name"
                              onChange={handleChange}
                            />
                            <p className="text-sm text-red-600 font-semibold">
                              {errors.fullName &&
                                touched.fullName &&
                                errors.fullName}
                            </p>
                          </div>

                          <div className="flex flex-col space-y-2 flex-1">
                            <label className="text-base font-medium text-slate-300">
                              Username
                            </label>
                            <input
                              className="h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-gray-400"
                              type="text"
                              placeholder="Enter your Username"
                              name="userName"
                              value={values.userName}
                              onChange={handleChange}
                            />
                            <p className="text-sm text-red-600 font-semibold">
                              {errors.userName &&
                                touched.userName &&
                                errors.userName}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label
                          for=""
                          class="text-base font-medium text-slate-300"
                        >
                          Email address
                        </label>
                        <div class="mt-1">
                          <input
                            class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-gray-400"
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                          ></input>
                          <p className="text-sm text-red-600 font-semibold">
                            {errors.email && touched.email && errors.email}
                          </p>
                        </div>
                      </div>
                      <div>
                        <div class="flex items-center justify-between">
                          <label
                            for=""
                            class="text-base font-medium text-slate-300"
                          >
                            Password
                          </label>
                        </div>
                        <div class="mt-2">
                          <input
                            class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-gray-400"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                          ></input>
                          <p className="text-sm text-red-600 font-semibold">
                            {errors.password &&
                              touched.password &&
                              errors.password}
                          </p>
                        </div>
                      </div>

                      <div>
                        <button class="inline-flex bg-indigo-600 hover:bg-indigo-700 w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7 text-white">
                          Create account
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="ml-2"
                            className="mt-1 ml-1"
                          >
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </form>
                  <div class="mt-2 space-y-3 ">
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
                      Sign up with Google
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
                      Sign up with Github
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
export default Signup;
