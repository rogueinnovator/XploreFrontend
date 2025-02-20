import { Navigate, Outlet, useLocation } from "react-router-dom";
import SuperAdminNavbar from "../../components/superAdmin/SuperAdminNavbar";
import SuperAdminSideBar from "../../components/superAdmin/SuperAdminSidebar";
import { useOwnerContext } from "../../context/OwnerContext";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

const SuperAdminWrapper = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [accessToken, setAccessToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser, logOut } = useOwnerContext();

  const fetchUser = async () => {
    try {
      // console.log("Fecthing user with token ");
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

      if (!response.ok) throw new Error("Failed to fetch user data");

      const userData = await response.json();
      if (userData?.name) {
        // console.log("user response : ", userData);
        setUser(userData);
        // navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setAccessToken(null);
      logOut();
    }
  };

  // console.log("user in super admin wrapper  ", user);

  useEffect(() => {
    // console.log("useEffect called in super admin Wrapper");
    const initializeAuth = async () => {
      if (user) {
        setIsLoading(false);
        return;
      }
      try {
        await fetchUser();
      } catch (error) {
        console.error("Error fetching user on app load:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="relative flex items-center justify-center h-screen">
        <LoaderCircle className="w-20 h-20 animate-spin" />
      </div>
    );
  }

  if (!user || user.role !== "super_admin") {
    return <Navigate to="/"></Navigate>;
  }
  return (
    <div className="flex h-screen overflow-auto">
      <div className="w-64 my-1 ml-1">
        <SuperAdminSideBar />
      </div>
      <div className="flex-1 px-4 pt-1">
        <SuperAdminNavbar />
        <Outlet />
      </div>
    </div>
  );
};

export default SuperAdminWrapper;
