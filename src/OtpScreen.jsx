import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { publicApi } from "./utils/api";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const OtpScreen = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [otpTime, setOtpTime] = useState(600);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setOtpTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleClick = async (otp, email) => {
    try {
      const res = await publicApi.get(`/auth/otp/verify/${email}/${otp}`);
      if (res.status === 200) {
        toast.success("OTP verified successfully!"); // Success Toast
        setTimeout(() => navigate("/"), 1000);
      }
    } catch (ex) {
      toast.error("Error verifying OTP, please try again."); // Error Toast
      console.error("Error verifying OTP:", ex);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#152331]">
      <ToastContainer></ToastContainer>
      <div className="p-10 rounded-md max-w-lg flex flex-col justify-center items-center">
        <h1 className="font-bold text-3xl text-white pb-8 animate-bounce">
          Verification Code
        </h1>
        <p className="text-zinc-400 text-center pb-5">
          Please enter the verification code sent to{" "}
          <span className="text-white">{email}</span>
        </p>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span className="text-zinc-400  w-[20px]">-</span>}
          renderInput={(props) => (
            <input
              {...props}
              className="outline-none text-center w-32 h-14 bg-[#1f1f1f] text-white text-2xl rounded-md border-2 border-white-700 focus:ring-2 focus:border-white transition-all duration-300"
              type="text"
              inputMode="numeric"
            />
          )}
          containerStyle={{
            fontSize: "50px",
            marginBottom: "20px",
            gap: "10px",
          }}
        />

        <p className="text-zinc-400 text-sm pb-5">
          OTP valid for{" "}
          <span className="text-white">{formatTime(otpTime)}</span>
        </p>
        <div className="w-full flex gap-2 pt-5">
          <button
            type="button"
            className="bg-green-600 w-full py-2 text-white font-semibold rounded-md hover:bg-green-700 transition-all duration-300"
            onClick={() => handleClick(otp, email)}
          >
            Verify OTP
          </button>
          <button
            type="button"
            className="bg-indigo-600 w-full py-2 text-white font-semibold rounded-md hover:bg-indigo-700 transition-all duration-300"
          >
            <Link
              to="#"
              onClick={() =>
                toast.info("Resend OTP functionality is under development.")
              }
            >
              Resend OTP
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpScreen;
