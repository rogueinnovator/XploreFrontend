import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UpdateHotelPage from "./pages/hotel/update-hotel_booking.jsx";
import HomePage from "./pages/user/HomePage.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import SignUpPage from "./pages/auth/signup-page.jsx";
import Signin from "./pages/auth/signin-page.jsx";
import EnterOTP from "./pages/auth/OTP.jsx";
import EnterNewPassword from "./pages/auth/EnterNewPassword.jsx";
import RoomInformation from "./pages/dashboard/RoomInformation.jsx";
import RoomDetails from "./pages/dashboard/RoomDetails.jsx";
import DashBoard from "./components/DashBoard/DashBoard.jsx";
import OwnerWrapper from "./pages/wrappers/OwnerWrapper.jsx";
import HotelProfileMain from "./pages/hotelProfile/HotelProfileMain.jsx";
import AboutHotel from "./pages/hotelProfile/AboutHotel.jsx";
import Rooms from "./pages/hotelProfile/Rooms.jsx";
import LocationDetails from "./pages/hotelProfile/LocationDetails.jsx";
import ContactInformation from "./pages/hotelProfile/ContactInformation.jsx";
import PoliciesAndRules from "./pages/hotelProfile/PoliciesAndRules.jsx";
import Facilities from "./pages/hotelProfile/Facilities.jsx";
import HotelImages from "./pages/hotelProfile/HotelImages.jsx";
import Reviews from "./pages/hotelProfile/Reviews.jsx";
import HotelOwnerDashBoard from "./components/DashBoard/HotelOwnerDashBoard.jsx";
import Booking from "./components/DashBoard/Booking.jsx";
import Main from "./pages/hotelOnBoarding/Main";
import SuperAdminDashBoard from "./pages/superAdmin/SuperAdminDashBoard";
import SuperAdminRooms from "./pages/superAdmin/SuperAdminRooms.jsx";
import SuperAdminBooking from "./pages/superAdmin/SuperAdminBooking";
import SuperAdminWrapper from "./pages/wrappers/SuperAdminWrapper.jsx";
import SuperAdminHotels from "./pages/superAdmin/SuperAdminHotels.jsx";
import SuperAdminHotelDetail from "./pages/superAdmin/SuperAdminHotelDetail.jsx";
import Support from "./components/superAdmin/Support.jsx";
import SuperAdminCustomers from "./pages/superAdmin/SuperAdminCustomers.jsx";
import SuperAdminSubscriptions from "./pages/superAdmin/SuperAdminSubscriptions.jsx";
import HotelsPage from "./pages/user/HotelsPage.jsx";
import ContactPage from "./pages/user/ContactPage.jsx";
import AboutPage from "./pages/user/AboutPage.jsx";
import UpcomingFeaturesPage from "./pages/user/UpcomingFeaturesPage";
import UserMainPage from "./pages/user/UserMainPage.jsx";
import HotelDetailPage from "./pages/user/HotelDetailPage.jsx";
import SearchContextProvider from "./context/SearchContext.jsx";
import BookingPage from "./pages/user/BookingPage.jsx";
import PrivacyPolicy from "./pages/user/PrivacyPolicy.jsx";
import CookiePolicy from "./pages/user/CookiePolicy.jsx";
import TermsAndConditions from "./pages/user/TermsAndConditions.jsx";
function App() {
  return (
    <div>
      <Toaster />

      <Routes>
        {/* HOMEPAGE */}
        <Route path="/" element={<UserMainPage />}>
          <Route index element={<HomePage />}></Route>
          <Route path="hotels-page"  element={<SearchContextProvider><HotelsPage /></SearchContextProvider>}></Route>
          <Route path="hotels" element={<HotelsPage />}></Route>
          <Route path="about" element={<AboutPage />}></Route>
          <Route
            path="upcoming-features"
            element={<UpcomingFeaturesPage />}
          ></Route>
          <Route path="contact" element={<ContactPage />}></Route>
          <Route path="hotel/:id" element={<HotelDetailPage />}></Route>
          <Route
            path="booking/:hotelId/:roomId"
            element={<BookingPage />}
          ></Route>
          <Route path="privacy-policy" element={<PrivacyPolicy />}></Route>
          <Route path="cookie-policy" element={<CookiePolicy />}></Route>
          <Route path="terms" element={<TermsAndConditions />}></Route>
        </Route>
        {/* AUTH SIGNIN*/}
        <Route path="/auth/signin" element={<Signin />}></Route>

        {/* AUTH SIGNUP*/}
        <Route path="/auth/signup" element={<SignUpPage />}></Route>
        {/* AUTH OTP */}
        <Route path="/auth/otp" element={<EnterOTP />}></Route>
        {/* NEW_PASSWORD */}
        <Route path="/auth/new-password" element={<EnterNewPassword />}></Route>
        {/* FORGOT PASSWORD */}
        <Route
          path="/auth/forgot-password"
          element={<ForgotPassword />}
        ></Route>
        {/* HOTEL_EDIT */}
        <Route path="/hotel/edit/:id" element={<UpdateHotelPage />}></Route>
        {/* NEW_HOTEL */}
        {/* <Route path="/hotel/new" element={<NewHotelPage />}></Route> */}
        {/* SUPER_ADMIN */}
        <Route path="/super-admin" element={<SuperAdminWrapper />}>
          <Route index element={<SuperAdminDashBoard />}></Route>
          <Route path="dashboard" element={<SuperAdminDashBoard />}></Route>
          <Route path="hotels-info" element={<SuperAdminHotels />}></Route>
          <Route
            path="hotel-detail/:hotelId"
            element={<SuperAdminHotelDetail />}
          ></Route>
          <Route path="rooms" element={<SuperAdminRooms />}></Route>
          <Route path="booking" element={<SuperAdminBooking />}></Route>
          <Route path="support" element={<Support />}></Route>
          <Route path="customers" element={<SuperAdminCustomers />}></Route>
          <Route path="subscriptions" element={<SuperAdminSubscriptions />}></Route>

        </Route>
        {/* HOTEL_OWNER */}
        <Route
          path="/dashboard"
          element={
            <OwnerWrapper>
              <DashBoard />{" "}
            </OwnerWrapper>
          }
        >
          <Route
            index
            element={
              <OwnerWrapper>
                <HotelOwnerDashBoard />
              </OwnerWrapper>
            }
          ></Route>
          <Route
            path="room-information"
            element={
              <OwnerWrapper>
                {" "}
                <RoomInformation />{" "}
              </OwnerWrapper>
            }
          ></Route>
          <Route
            path="booking"
            element={
              <OwnerWrapper>
                <Booking />
              </OwnerWrapper>
            }
          ></Route>
        </Route>
        {/* ROOMS DETAILS */}
        <Route
          path="/dashboard/:roomId/room-details"
          element={<RoomDetails />}
        ></Route>
        {/* HOTEL ONBOARDING */}
        <Route
          path="/hotel/onboarding"
          element={
            <OwnerWrapper>
              <Main />
            </OwnerWrapper>
          }
        ></Route>
        {/* HOTEL PROFILE */}
        <Route
          path="/dashboard/hotel-profile"
          element={
            <OwnerWrapper>
              <HotelProfileMain />
            </OwnerWrapper>
          }
        >
          <Route index element={<AboutHotel />}></Route>
          <Route path="about-hotel" element={<AboutHotel />}></Route>
          <Route path="rooms" element={<Rooms />}></Route>
          <Route path="location-details" element={<LocationDetails />}></Route>

          <Route
            path="contact-information"
            element={<ContactInformation />}
          ></Route>
          <Route path="policies" element={<PoliciesAndRules />}></Route>
          <Route path="facilities" element={<Facilities />}></Route>
          <Route path="hotel-images" element={<HotelImages />}></Route>
          <Route path="reviews" element={<Reviews />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
