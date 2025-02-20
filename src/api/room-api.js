import { useMutation, useQuery } from "react-query";
import { showToast } from "../utili/util-func";
import { objectToFormData } from "../utili/util-func";
import { useOwnerContext } from "../context/OwnerContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useCreateRoom = () => {
  const request = async ({ data, hotelId }) => {
    console.log("data: ", data, "hotelId: ", hotelId);

    const formData = objectToFormData(data);
    const response = await fetch(`${BASE_URL}/hotels/${hotelId}/rooms/new`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Unable to create room");
    }
    return response.json();
  };
  const {
    mutateAsync: createNewRoom,
    isSuccess,
    isError,
    error,
    isLoading,
  } = useMutation(request, {
    onSuccess: (data) =>
      showToast("success", data?.message || "Room Created Successfully"),
    onError: (error) =>
      showToast("error", error?.message || "Error creating room."),
  });

  return {
    createNewRoom,
    isLoading,
    isError,
    error,
  };
};

export const useGetSelectedRooms = (hotelId) => {
  const request = async () => {
    const response = await fetch(
      `${BASE_URL}/hotels/${hotelId}/selected-rooms`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Unable to create room");
    }
    return response.json();
  };
  const { data, isSuccess, isError, error, isLoading } = useQuery(
    ["selectedrooms", hotelId],
    request
  );

  return {
    data,
    isSuccess,
    isLoading,
    isError,
    error,
  };
};

export const useGetAllRooms = (hotelId) => {
  const request = async () => {
    const response = await fetch(`${BASE_URL}/hotels/${hotelId}/all`, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Unable to Get rooms");
    }
    return response.json();
  };
  const { data, isSuccess, isError, error, isLoading, refetch } = useQuery(
    ["allrooms", hotelId],
    request
  );

  return {
    data,
    isSuccess,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export const useUpdateRoom = () => {
  const request = async ({ data, roomId }) => {
    // console.log("data: ", data, "hotelId: ", hotelId);

    const formData = objectToFormData(data);
    const response = await fetch(`${BASE_URL}/hotels/${roomId}`, {
      method: "PATCH",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Unable to create room");
    }
    return response.json();
  };
  const {
    mutateAsync: updateRoom,
    isSuccess,
    isError,
    error,
    isLoading,
  } = useMutation(request, {
    onSuccess: (data) =>
      showToast("success", data?.message || "Room Updated Successfully"),
    onError: (error) =>
      showToast("error", error?.message || "Error updating room."),
  });

  return {
    updateRoom,
    isLoading,
    isError,
    error,
  };
};

// {
//   onError: (error) =>
//     showToast("error", error?.message || "Error creating getting rooms."),
// }
