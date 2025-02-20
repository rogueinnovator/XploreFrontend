import React from "react";
import { userForgotSchema } from "../../validation-schemas/user-signin-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRequestOTP } from "../../api/user-api";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const backgroundImages = [
  "/mountain-1.jpg",
  "/mountain-2.jpg",
  "/mountain-3.jpg",
];

const ForgotPassword = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userForgotSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    mutateAsync: requestOTP,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useRequestOTP();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const forgotPasswordSubmitHandler = async (data) => {
    try {
      const response = await requestOTP(data);

      if (response.success) {
        navigate("/auth/otp", { state: data.email });
      }
    } catch (err) {
      console.error("Error signing in:", err);
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

      {/* Right Side: Forgot Password Form */}
      <div className="flex items-center justify-center w-full p-8 md:w-1/2">
        <div className="w-full max-w-md">
          {/* Logo and Heading */}
          <div className="flex flex-col items-center mb-6">
            <img src="/logo.png" alt="Explore Logo" className="h-20" />
            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
              Reset Password
            </h1>
            <p className="text-gray-600">
              Enter your email to receive an OTP for verification
            </p>
          </div>

          {/* Form */}
          <form
            className="space-y-4"
            onSubmit={handleSubmit(forgotPasswordSubmitHandler)}
          >
            {/* Email Input */}
            <div>
              <div className="relative">
                <Mail className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* Error Message */}
              {errors?.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Sending OTP..." : "Get OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
