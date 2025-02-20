import { useMutation, useQuery } from "react-query";
import { showToast } from "../utili/util-func";
import { useOwnerContext } from "../context/OwnerContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useCreateBooking = () => {
  const { accessToken, logOut } = useOwnerContext();
  const request = async (data) => {
    // console.log("data  booking: ", data);
    const response = await fetch(`${BASE_URL}/booking/new`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") || accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(response?.message || "Failed to create Booking.");
    }

    return response.json();
  };

  const {
    mutateAsync: createNewBooking,
    isSuccess,
    isError,
    error,
    isLoading,
  } = useMutation(request, {
    onSuccess: () => {
      showToast("success", "Your Room is booked");
    },
    onError: (error) =>
      showToast("error", error?.message || "Error creating the hotel."),
  });

  return {
    createNewBooking,
    isSuccess,
    isError,
    error,
    isLoading,
  };
};

export const useGetBookedRooms = ({ roomId, checkInDate, checkOutDate }) => {
  const { accessToken } = useOwnerContext();
  const request = async () => {
    // console.log("data  booking: ", data);
    const response = await fetch(
      `${BASE_URL}/booking/${roomId}/bookings?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem("token") || accessToken
          }`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(response?.message || "Failed to create Booking.");
    }

    return response.json();
  };

  const { data, isSuccess, isError, error, isLoading, refetch } = useQuery(
    ["bookings", roomId],
    request,
    {
      enabled: false,
    }
  );

  return {
    data,
    isSuccess,
    isError,
    error,
    refetch,
    isLoading,
  };
};

export const useGetBookings = ({ page, limit, filterBy }) => {
  const { accessToken } = useOwnerContext();
  const request = async () => {
    // console.log("data  booking: ", data);
    const response = await fetch(
      `${BASE_URL}/booking?page=${page}&limit=${limit}&filterBy=${filterBy}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem("token") || accessToken
          }`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(response?.message || "Failed to get Bookings.");
    }

    return response.json();
  };

  const { data, isSuccess, isError, error, isLoading, refetch, isFetching } =
    useQuery(["bookings", page, limit, filterBy], request);

  return {
    data,
    isSuccess,
    isError,
    error,
    refetch,
    isFetching,
    isLoading,
  };
};

export const useGetBookingsStats = () => {
  const { accessToken } = useOwnerContext();
  const request = async () => {
    // console.log("data  booking: ", data);
    const response = await fetch(`${BASE_URL}/booking/booking-stats`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(response?.message || "Failed to get Bookings Stats.");
    }

    return response.json();
  };

  const { data, isSuccess, isError, error, isLoading, refetch, isFetching } =
    useQuery(["booking-stats"], request);

  return {
    data,
    isSuccess,
    isError,
    error,
    refetch,
    isFetching,
    isLoading,
  };
};
