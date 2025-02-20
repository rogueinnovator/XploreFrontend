import { useQuery, useMutation } from "react-query";
import { useOwnerContext } from "../context/OwnerContext";
import { objectToFormData } from "../utili/util-func";
import { showToast } from "../utili/util-func";
const BASE_URL = import.meta.env.VITE_BASE_URL;
//1.CREATE HOTEL
export const useCreateNewHotel = () => {
  const { accessToken } = useOwnerContext();
  const request = async (data) => {
    const formData = objectToFormData(data);
    const response = await fetch(`${BASE_URL}/hotels/new`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to create a new hotel.");
    }

    return response.json();
  };
  BASE_URL;
  const {
    mutateAsync: createNewHotel,
    isError,
    error,
    isLoading,
  } = useMutation(request, {
    onSuccess: () => {
      showToast("success", "Hotel created successfully!");
    },
    onError: () => showToast("error", "Error creating the hotel."),
  });

  return {
    createNewHotel,
    isLoading,
    isError,
    error,
  };
};
//2.GET HOTEL BY ID
export const useGetHotelById = (id) => {
  const request = async () => {
    const response = await fetch(`${BASE_URL}/hotels/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch hotel details.");
    }
    return response.json();
  };

  const {
    data: hotelData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery(["getHotelById", id], request, {
    enabled: !!id, // Only fetch if id is provided
    retry: 2, // Retry twice on failure
  });

  return {
    hotelData: hotelData?.data,
    isLoading,
    isError,
    isSuccess,
  };
};
//3.UPDATE HOTEL
export const useUpdateHotel = () => {
  const request = async ({ hotelId, data, key }) => {
    const formData = objectToFormData(data);
    const response = await fetch(
      `${BASE_URL}/hotels/update/${hotelId}?key=${key}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update the hotel.");
    }

    return response.json();
  };

  const {
    mutateAsync: updateHotel,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(request, {
    onSuccess: () => showToast("success", "Hotel updated successfully!"),
    onError: () => showToast("error", "Error updating the hotel."),
  });

  return {
    updateHotel,
    isLoading,
    isError,
    isSuccess,
  };
};
//4.GET DASHBOARD STATS
export const useGetDashboardStats = ({
  bookingMonth,
  revenueDuration,
  revenueDurationType,
}) => {
  const { accessToken, logOut } = useOwnerContext();
  const request = async () => {
    const response = await fetch(
      `${BASE_URL}/hotels/dashboard-stats?bookingMonth=${bookingMonth}&revenueDuration=${revenueDuration}&revenueDurationType=${revenueDurationType}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || accessToken
            }`,
        },
      }
    );

    if (response.status === 401) {
      showToast("error", "Session expired, please login again");
      logOut();
    }

    if (!response.ok) {
      throw new Error("Failed Get Dashboard Stats");
    }
    return response.json();
  };

  const { data, isSuccess, isError, error, isLoading } = useQuery(
    ["dashboard-stats", bookingMonth, revenueDuration, revenueDurationType],
    request,
    {
      onError: (error) => {
        showToast("error", error.message || "Error Fetching Dashboard Stats.");
      },
    }
  );

  return {
    data,
    isSuccess,
    isLoading,
    isError,
    error,
  };
};