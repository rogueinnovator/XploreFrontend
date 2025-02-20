import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSigninSchema } from "../../validation-schemas/user-signin-schema";
import { useUserSignin } from "../../api/user-api";
import { LockKeyhole, Mail } from "lucide-react";
import { useOwnerContext } from "../../context/OwnerContext";

const backgroundImages = [
  "/mountain-1.jpg",
  "/mountain-2.jpg",
  "/mountain-3.jpg",
];

export default function SignIn() {
  const [currentImage, setCurrentImage] = useState(0);
  const { setUser } = useOwnerContext();
  const navigate = useNavigate();
  const { mutateAsync: loginUser, isLoading } = useUserSignin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitHandler = async (formData) => {
    try {
      const userData = await loginUser(formData);
      if (userData && userData.token) {
        localStorage.setItem("token", userData.token);
        setUser(userData.user);
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen">
      <div
        className="relative hidden md:block md:w-1/2 bg-image"
        style={{
          backgroundImage: `url(${backgroundImages[currentImage]})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          transition: "background-image 1s ease-in-out",
        }}
      ></div>

      <div className="flex items-center justify-center w-full p-8 md:w-1/2">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-6">
            <img src="/logo.png" alt="Explore Logo" className="h-10" />
            <h1 className="mt-2 text-2xl font-bold">Welcome Back</h1>
            <p className="text-gray-500">Login to Your Account</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(submitHandler)}>
            {[
              {
                label: "Email",
                name: "email",
                type: "email",
                icon: <Mail className="w-5 h-5 text-gray-400" />,
              },
              {
                label: "Password",
                name: "password",
                type: "password",
                icon: <LockKeyhole className="w-5 h-5 text-gray-400" />,
              },
            ].map((field) => (
              <div key={field.name}>
                <div className="relative">
                  <input
                    type={field.type}
                    {...register(field.name)}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Enter your ${field.label}`}
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    {field.icon}
                  </div>
                </div>
                {errors[field.name] && (
                  <p className="text-sm text-red-500">
                    {errors[field.name].message}
                  </p>
                )}
                {field.name === "password" && (
                  <div className="mt-1 text-right">
                    <Link
                      to="/auth/forgot-password"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                )}
              </div>
            ))}

            <button
              type="submit"
              className="w-full py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-2 text-sm text-center text-gray-500">
            By signing in, you agree to our{" "}
            <Link to="#" className="text-blue-600">
              Terms and Privacy Policy
            </Link>
          </p>
          <p className="mt-2 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/auth/signup" className="text-blue-600">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
