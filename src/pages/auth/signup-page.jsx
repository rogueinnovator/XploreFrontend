import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UserSchema from "../../validation-schemas/user-schema";
import { Link } from "react-router-dom";
import { useRegisterUser } from "../../api/user-api";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Phone, User } from "lucide-react";

const backgroundImages = ["/mountain-1.jpg", "/mountain-2.jpg", "/mountain-3.jpg"];

const SignUpPage = () => {
  const navigate = useNavigate();
  const { mutateAsync: createNewUser, isLoading } = useRegisterUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    watch,
  } = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const submitHandler = async (data) => {
    delete data.terms;
    delete data.confirmPassword; // No need to send confirmPassword to backend
    const response = await createNewUser(data);
    if (response?.user) {
      navigate("/auth/signin");
    }
  };

  const [currentImage, setCurrentImage] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen">
      <div
        className="hidden md:flex w-1/2 h-screen bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${backgroundImages[currentImage]})` }}
      ></div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-6">
            <img src="/logo.png" alt="Explore Logo" className="h-10" />
            <h1 className="mt-2 text-2xl font-bold">Join Explore</h1>
            <p className="text-gray-500">Start Your Adventure Today</p>
          </div>

          <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
            {[
              { label: "Full Name", name: "name", icon: <User className="w-5 h-5 text-gray-400" /> },
              { label: "Email", name: "email", icon: <Mail className="w-5 h-5 text-gray-400" /> },
              { label: "Phone (optional)", name: "phone", icon: <Phone className="w-5 h-5 text-gray-400" /> },
              { label: "Password", name: "password", icon: <Lock className="w-5 h-5 text-gray-400" />, type: "password" },
              { label: "Confirm Password", name: "confirmPassword", icon: <Lock className="w-5 h-5 text-gray-400" />, type: "password" },
            ].map((field) => (
              <div key={field.name} className="flex flex-col">
                <div className="relative">
                  <input
                    type={field.type || "text"}
                    {...register(field.name)}
                    placeholder={field.label}
                    className="w-full p-3 pl-10 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    {field.icon}
                  </div>
                </div>
                {errors[field.name] && isSubmitted && (
                  <span className="text-sm text-red-500">{errors[field.name]?.message}</span>
                )}
              </div>
            ))}

            <div className="flex items-center">
              <input {...register("terms")} type="checkbox" id="terms" className="w-4 h-4" />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-500">
                I agree to the <Link to="#" className="text-blue-500 underline">Terms</Link> and <Link to="#" className="text-blue-500 underline">Privacy Policy</Link>
              </label>
            </div>
            {errors.terms && isSubmitted && (
              <p className="text-sm text-red-500">{errors.terms?.message}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:cursor-not-allowed"
            >
              {isLoading ? "Loading..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-500">
            Already have an account?{" "}
            <Link to="/auth/signin" className="text-blue-500 underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
