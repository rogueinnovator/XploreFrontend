import React from "react";
import NewPasswordSchema from "../../validation-schemas/newpassword-schema.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { useResetPassword } from "../../api/user-api.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LockKeyhole } from "lucide-react";

const backgroundImages = [
  "/mountain-1.jpg",
  "/mountain-2.jpg",
  "/mountain-3.jpg",
];

const EnterNewPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const {
    mutateAsync: resetPassword,
    isLoading,
    isSuccess,
    isError,
  } = useResetPassword();

  const newPasswordHandler = async (data) => {
    const response = await resetPassword({
      email: location.state.email,
      password: data.password,
      token: location.state.resetToken,
    });

    if (res.success) {
      navigate("/");
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

      {/* Right Side: New Password Form */}
      <div className="flex items-center justify-center w-full p-8 md:w-1/2">
        <div className="w-full max-w-md">
          {/* Logo and Heading */}
          <div className="flex flex-col items-center mb-6">
            <img src="/logo.png" alt="Explore Logo" className="h-20" />
            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
              Set New Password
            </h1>
            <p className="text-gray-600">
              Enter your new password to reset your account.
            </p>
          </div>

          {/* Form */}
          <form
            className="space-y-4"
            onSubmit={handleSubmit(newPasswordHandler)}
          >
            {/* Password Input */}
            <div>
              <div className="relative">
                <LockKeyhole className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  {...register("password")}
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {errors?.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <div className="relative">
                <LockKeyhole className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  {...register("confirmPassword")}
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {errors?.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Confirm"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnterNewPassword;
