import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useOwnerContext } from "../../context/OwnerContext";
import { LoaderCircle } from "lucide-react";
const OwnerWrapper = ({ children }) => {
  const pathName = useLocation().pathname;
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [accessToken, setAccessToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser, logOut } = useOwnerContext();

  const fetchUser = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user/userprofile`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            localStorage.getItem("token") || accessToken
          }`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await response.json();
      if (userData?.name) {
        setUser(userData);
        // navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setAccessToken(null);
      logOut();
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      if (user) {
        setIsLoading(false);
        return;
      }
      try {
        // setIsLoading(true);
        await fetchUser();
      } catch (error) {
        console.error("Error fetching user on app load:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [pathName]);

  if (isLoading) {
    return (
      <div className="relative flex items-center justify-center h-screen">
        <LoaderCircle className="w-20 h-20 animate-spin" />
      </div>
    );
  }
  if (user) {
    return <>{children}</>;
  }
  return <Navigate to="/auth/signin" />;
};
export default OwnerWrapper;
