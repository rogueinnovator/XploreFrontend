import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useVerifyOTP, useRequestOTP } from "../../api/user-api";
import { Link } from "react-router-dom";

const backgroundImages = [
  "/mountain-1.jpg",
  "/mountain-2.jpg",
  "/mountain-3.jpg",
];

const EnterOTP = ({ length = 6 }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state;

  const [currentImage, setCurrentImage] = useState(0);
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [canResend, setCanResend] = useState(false);

  const { mutateAsync: requestOTP } = useRequestOTP();

  const {
    mutateAsync: verifyOTP,
    isLoading,
    isSuccess,
    isError,
  } = useVerifyOTP();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const handleResendOTP = async () => {
    // Logic to resend OTP
    setTimer(300); // Reset timer to 5 minutes
    setCanResend(false);
    // console.log(email);
    await requestOTP({ email });
  };

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const combinedOtp = otp.join("");
    if (combinedOtp.length === 6) {
      const response = await verifyOTP({ email, otp: combinedOtp });
      if (response.success) {
        navigate("/auth/new-password", {
          state: {
            email: email,
            resetToken: response.resetToken,
          },
        });
      }
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side: Background Image */}
      <div
        className="relative hidden md:block md:w-1/2 bg-image"
        style={{
          backgroundImage: `url(${backgroundImages[currentImage]})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          transition: "background-image 1s ease-in-out",
        }}
      ></div>

      {/* Right Side: OTP Verification Form */}
      <div className="flex items-center justify-center w-full p-8 md:w-1/2">
        <div className="w-full max-w-md">
          {/* Logo and Heading */}
          <div className="flex flex-col items-center mb-6">
            <img src="/logo.png" alt="Explore Logo" className="h-20" />
            <h1 className="mt-2 text-2xl font-bold">Verify OTP</h1>
            <p className="text-center text-gray-600">
              We've sent a verification code to your email address. Please enter
              the code below to reset your password.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* OTP Input */}
            <div className="flex justify-center gap-4">
              {Array(6)
                .fill("-")
                .map((_, index) => (
                  <input
                    type="text"
                    ref={(input) => (inputRefs.current[index] = input)}
                    key={index}
                    onClick={(e) => handleClick(index)}
                    onChange={(e) => handleChange(index, e)}
                    onKeyDown={(e) => {
                      handleKeyDown(index, e);
                    }}
                    className="w-full p-3 text-center border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ))}
            </div>

            {/* Actions */}
            <div className="mt-10 space-y-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                {isLoading ? "Verifying OTP..." : "SUBMIT"}
              </button>

              <p
                onClick={canResend ? handleResendOTP : null}
                className={`text-center text-teal-700 font-semibold cursor-pointer ${
                  canResend
                    ? "hover:underline"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                Resend OTP {timer > 0 && `(${formatTime(timer)})`}
              </p>
            </div>
          </form>

          {/* Footer Links */}
          <p className="mt-2 text-sm text-center text-gray-500">
            Remember your password?{" "}
            <Link to="/auth/login" className="text-teal-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnterOTP;
