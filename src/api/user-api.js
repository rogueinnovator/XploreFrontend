import { useMutation, useQuery } from "react-query";
import { showToast } from "../utili/util-func";
const BASE_URL = import.meta.env.VITE_BASE_URL;
//END POINTS
const ENDPOINTS = {
  SIGNUP: "/user/signup",
  SIGNIN: "/user/signin",
  SEND_OTP: "/user/sendOTP",
  VERIFY_OTP: "/user/verifyOTP",
  RESET_PASSWORD: "/user/reset-password",
  GET_NEAR_HOTELS: "/user/near-hotels",
  POPULAR_HOTELS: "/user/popular-hotels",
  SPECIAL_DEALS: "/user/special-deals",
  SEARCH_HOTELS: "/user/search-hotels",
  USER_HOTEL_BY_ID: "/user/hotel",
  USER_BOOKING: "/user/booking/new",
  CURRENT_USER: "/user/userprofile",
};
//1.POST API REQUEST HELPER
const apiRequestPOST = async (endpoint, data) => {
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong.");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Network error occurred.");
  }
};
//2. GET API REQUEST HELPER
const apiRequestGET = async (endpoint, params = {}, token) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const queryString = new URLSearchParams(params).toString();
  const url = queryString
    ? `${BASE_URL}${endpoint}?${queryString}`
    : `${BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, { method: "GET", headers });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong.");
    }
    return response.json();
  } catch (error) {
    throw new Error(error.message || "Network error occurred.");
  }
};
//TOAST HANDLER
const successToast = (message) => () =>
  showToast("success", message || "Operation successful!");
const errorToast = (defaultMessage) => () =>
  showToast("error", defaultMessage || "Operation failed.");
//POST HOOKS FACTORY
export const useApiMutationPOST = (
  endpoint,
  successMessage,
  errorMessage,
  showToast = true
) => {
  return useMutation((data) => apiRequestPOST(endpoint, data), {
    onSuccess: showToast ? successToast(successMessage) : () => { },
    onError: showToast
      ? (error) => errorToast(error?.message || errorMessage)()
      : () => { },
  });
};
//GET HOOKS FACTORY
export const useApiMutationGET = (
  endpoint,
  query,
  keys = [],
  enabled = true
) => {
  const token = localStorage.getItem("token");
  return useQuery(keys, () => apiRequestGET(endpoint, query, token), {
    enabled: enabled,
  });
};
// POST REQUESTS__________
export const useRegisterUser = () =>
  useApiMutationPOST(
    ENDPOINTS.SIGNUP,
    "User Registered successfully!",
    "Failed to create a new user."
  );

export const useUserSignin = () =>
  useApiMutationPOST(
    ENDPOINTS.SIGNIN,
    "User logged in successfully!",
    "Invalid Credentials",
    false
  );
export const useResetPassword = () =>
  useApiMutationPOST(
    ENDPOINTS.RESET_PASSWORD,
    "Password updated successfully",
    "Unable to reset password"
  );

export const useRequestOTP = () =>
  useApiMutationPOST(
    ENDPOINTS.SEND_OTP,
    "OTP Sent successfully!",
    "Failed to send OTP."
  );

export const useVerifyOTP = () =>
  useApiMutationPOST(
    ENDPOINTS.VERIFY_OTP,
    "OTP verified successfully",
    "Unable to verify otp"
  );

export const useForgotPassword = () =>
  useApiMutationPOST(
    ENDPOINTS.SEND_OTP,
    "OTP Sent successfully!",
    "Failed to send OTP."
  );

export const useBookRoom = () =>
  useApiMutationPOST(
    ENDPOINTS.USER_BOOKING,
    "Bookeed Room Successfully",
    "Failed to book room"
  );

//GET-REQUESTS_____________
export const useGetNearHotels = (data) => {
  return useApiMutationGET(ENDPOINTS.GET_NEAR_HOTELS, data, ["near-hotels"]);
};
export const useGetPopularHotels = () => {
  return useApiMutationGET(ENDPOINTS.POPULAR_HOTELS, null, ["popular-hotels"]);
};
export const useGetSpecialDeals = () => {
  return useApiMutationGET(ENDPOINTS.SPECIAL_DEALS, null, ["special-deals"]);
};
export const useGetUserHotelById = (id, checkInDate, checkOutDate, guests) => {
  return useApiMutationGET(
    `${ENDPOINTS.USER_HOTEL_BY_ID}/${id}`,
    {
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      guests: guests,
    },
    ["user-hotel-by-id", id],
    false
  );
};
export const useGetSearchHotels = (query) =>
  useApiMutationGET(ENDPOINTS.SEARCH_HOTELS, query, ["search-hotels"]);
// this call is for booking page - where we need some hotel data and room data which is gooing to be booked.
export const useGetHotelRoom = (hotelId, roomId) =>
  useApiMutationGET(`/user/hotel-room/${hotelId}/${roomId}`, null, [
    "get-hotel-and-room",
    hotelId,
    roomId,
  ]);

export const useGetCurrentUser = () =>
  useApiMutationGET(ENDPOINTS.CURRENT_USER);

// //GET-REQUESTS____________
// export const useGetNearHotels = (query) =>
//   useApiMutationGET(ENDPOINTS.GET_NEAR_HOTELS, query, ["near-hotels"]);
// export const useGetPopularHotels = () =>
//   useApiMutationGET(ENDPOINTS.POPULAR_HOTELS, null, ["popular-hotels"]);
// export const useGetSpecialDeals = () =>
//   useApiMutationGET(ENDPOINTS.SPECIAL_DEALS, null, ["special-deals"]);
