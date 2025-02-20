import { useMutation, useQuery } from "react-query";
import { useOwnerContext } from "../context/OwnerContext";
import { showToast } from "../utili/util-func";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useGetAllHotels = ({ page, dateRange }) => {
  const { accessToken } = useOwnerContext();
  const request = async () => {
    const response = await fetch(
      ` ${BASE_URL}/super-admin/all-hotels?page=${page}&dateRange=${dateRange}`,
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
      const data = await response.json();
      throw new Error(data?.message || "Failed to get all hotel.");
    }

    return response.json();
  };

  const { data, isSuccess, isError, error, isLoading, refetch, isFetching } =
    useQuery(["getallhotels"], request);

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

export const useGetAllBookings = ({ page, dateRange }) => {
  const { accessToken } = useOwnerContext();
  const request = async () => {
    const response = await fetch(
      ` ${BASE_URL}/super-admin/all-bookings?page=${page}&dateRange=${dateRange}`,
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
      const data = await response.json();
      throw new Error(data?.message || "Failed to get all bookings.");
    }

    return response.json();
  };

  const { data, isSuccess, isError, error, isLoading, refetch, isFetching } =
    useQuery(["getallbookings"], request);

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

export const useUpdateHotelStatus = () => {
  const { accessToken } = useOwnerContext();
  const request = async ({ hotelId, status, rejectionMessage }) => {
   // console.log("updateHotelStatus", hotelId, status);
    const response = await fetch(`${BASE_URL}/super-admin/status/${hotelId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") || accessToken}`,
      },
      body: JSON.stringify({ status, rejectionMessage }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data?.message || "Failed to update hotel status.");
    }

    return response.json();
  };

  const {
    mutateAsync: updateHotelStatus,
    isError,
    isLoading,
  } = useMutation(request, {
    onSuccess: () => showToast("success", "Hotel status updated successfully!"),
    onError: () => showToast("error", "Error updating the hotel status."),
  });

  return {
    updateHotelStatus,
    isLoading,
    isError,
  };
};

export const useSearchHotels = ({ searchQuery }) => {
  const { accessToken } = useOwnerContext();
  const request = async () => {
    const response = await fetch(
      ` ${BASE_URL}/super-admin/search-hotels?searchQuery=${searchQuery}`,
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
      const data = await response.json();
      throw new Error(data?.message || "Failed to get all bookings.");
    }

    return response.json();
  };

  const { data, isSuccess, isError, error, isLoading, refetch, isFetching } =
    useQuery(["searchHotels", searchQuery], request, {
      enabled: false,
    });

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

export const useSearchBookings = ({ searchQuery, page }) => {
  const { accessToken } = useOwnerContext();
  const request = async () => {
    const response = await fetch(
      `${BASE_URL}/super-admin/search-bookings?searchQuery=${searchQuery}&page=${page}`,
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
      const data = await response.json();
      throw new Error(data?.message || "Failed to get all bookings.");
    }

    return response.json();
  };

  const { data, isSuccess, isError, error, isLoading, refetch, isFetching } =
    useQuery(["searchBookings", searchQuery, page], request, {
      enabled: false,
    });

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

//search customers

export const useSearchCustomers = ({ searchQuery, page }) => {
  const { accessToken } = useOwnerContext();
  const request = async () => {
    const response = await fetch(
      `${BASE_URL}/super-admin/search-customers?searchQuery=${searchQuery}&page=${page}`,
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
      const data = await response.json();
      throw new Error(data?.message || "Failed to get all Customers.");
    }

    return response.json();
  };

  const { data, isSuccess, isError, error, isLoading, refetch, isFetching } =
    useQuery(["searchCustomers", searchQuery, page], request, {
      enabled: false,
    });

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

/////////////////////

export const useGetDashboardStats = () => {
  const { accessToken } = useOwnerContext();
  const request = async () => {
    const response = await fetch(`${BASE_URL}/super-admin/dashboard-stats`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || accessToken}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data?.message || "Failed to get all bookings.");
    }

    return response.json();
  };

  const { data, isError, isLoading } = useQuery(["dashboardStats"], request);
  return {
    data,
    isError,
    isLoading,
  };
};

export const useGetAllCustomers = ({ page, dateRange }) => {
  const { accessToken } = useOwnerContext();
  const request = async () => {
    const response = await fetch(
      `${BASE_URL}/super-admin/all-customers?page=${page}&dateRange=${dateRange}`,
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
      const data = await response.json();
      throw new Error(data?.message || "Failed to get all customers.");
    }

    return response.json();
  };

  const { data, isSuccess, isError, error, isLoading, refetch, isFetching } =
    useQuery(["getallcustomers"], request);

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
