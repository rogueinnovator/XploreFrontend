import React, { useEffect, useState } from "react";
import {
  AlignJustify,
  Home,
  Building,
  Rocket,
  Mail,
  BadgeHelp,
} from "lucide-react";
import Logo from "/public/logo_1.svg";
import { Link, useLocation } from "react-router-dom";
import { useGetCurrentUser } from "../../api/user-api";
import { useOwnerContext } from "../../context/OwnerContext";

function Navbar() {
  const pathName = useLocation().pathname;
  const [showNav, setShowNav] = useState(false);
  const { data, isLoading } = useGetCurrentUser();
  const { user, setUser, logOut } = useOwnerContext();

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  const links = [
    { to: "/", label: "Home", icons: <Home /> },
    { to: "/hotels-page", label: "Hotels", icons: <Building /> },
    { to: "/about", label: "About", icons: <BadgeHelp /> },
    // { to: "/upcoming-features", label: "Upcoming features", icons: <Rocket /> },
    { to: "/contact", label: "Contact", icons: <Mail /> },
  ];

  return (
    <div className="relative flex justify-between w-full h-16 p-4 bg-white shadow-md">
      <div className="flex items-center gap-6">
        {/* MOBILE  */}
        <AlignJustify
          onClick={() => setShowNav(!showNav)}
          className="text-[#1570EF] size-8 cursor-pointer lg:hidden"
        />
        {showNav && (
          <div className="fixed left-0 z-50 flex flex-col items-start justify-start w-full h-screen gap-6 p-3 bg-white shadow-lg top-16">
            {links.map((link) => (
              <Link
                key={link.to}
                className={`${
                  pathName === link.to ? "decoration-blue-500" : ""
                } ${
                  pathName === link.to
                    ? "bg-gray-300 pt-2 pl-3 w-full rounded-lg"
                    : ""
                }`}
                to={link.to}
                onClick={() => setShowNav(false)}
              >
                <span className="inline-flex justify-around gap-2 items-end text-sm text-[#1570EF]">
                  {link.icons}{" "}
                  <span className="text-sm font-semibold text-black">
                    {link.label}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        )}
        <img src={Logo} alt="Logo" className="h-10" />

        {/* DESKTOP */}
        <nav className="hidden ml-5 text-sm font-medium text-gray-500 lg:flex gap-7">
          {links.map((link) => (
            <Link
              key={link.to}
              className={`${
                pathName === link.to
                  ? "underline underline-offset-8 decoration-blue-500"
                  : ""
              } font-medium decoration-2`}
              to={link.to}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-20 h-8 bg-gray-200 rounded-md animate-pulse" />
          <div className="w-20 h-8 bg-gray-200 rounded-md animate-pulse" />
        </div>
      ) : !user ? (
        <div className="flex gap-4">
          <Link
            to="/auth/signin"
            className="px-4 py-1 font-medium text-gray-500 border border-gray-400 rounded-md"
          >
            Login
          </Link>
          <Link
            to="/auth/signup"
            className="rounded-md px-4 py-1 border border-[#1570EF] text-[#1570EF] font-medium"
          >
            Signup
          </Link>
        </div>
      ) : (
        <button
          onClick={() => logOut()}
          className="px-4 py-1 font-medium text-gray-500 border border-gray-400 rounded-md"
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default Navbar;
