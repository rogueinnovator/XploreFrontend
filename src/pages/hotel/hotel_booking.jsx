import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import CountriesDropdown from "../../components/hotel-forms/CountriesDropdown.jsx";
import LocationDetails from "../../components/hotel-forms/location-form.jsx";
import ParkingDetails from "../../components/hotel-forms/parking-form.jsx";
import BreakfastDetails from "../../components/hotel-forms/breakfast-form.jsx";
import NewHotelSchema from "../../validation-schemas/hotel-schema.js";
import AboutHotel from "../../components/hotel-forms/about-hotel-form.jsx";
import ContactInformation from "../../components/hotel-forms/contact-information.jsx";
import HotelPhotos from "../../components/hotel-forms/hotel-photos.jsx";
import RoomsInformation from "../../components/hotel-forms/rooms-form.jsx";
import Policies from "../../components/hotel-forms/rooms-policy.jsx";
import GuestsFacilities from "../../components/hotel-forms/aminities.jsx";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useCreateNewHotel } from "../../api/hotel-api.js";
import { useNavigate } from "react-router-dom";
const NewHotelPage = () => {
  const navigate = useNavigate();
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: {
      country: "",
      address: "",
      city: "",
      postalCode: "",
      cordinates: {
        longitude: "",
        latitude: "",
      },
    },
    parkingDetails: {
      isParkingAvailable: "no",
      parkingCost: "",
      parkingCostType: "",
      parkingType: "",
      parkingLocation: "",
      needReservation: false,
    },
    breakfastDetails: {
      offersBreakfast: false,
      breakfastOption: "",
      isIncludedInPrice: false,
      breakfastType: [],
      chargePerPerson: "",
    },
    houseRules: {
      checkIn: { from: "", until: "" },
      checkOut: { from: "", until: "" },
      allowChildrens: true,
      allowPets: "no",
    },
    languagesSpoken: [],
    amenities: [],
    description: "",
    rating: 0,
    photos: [],
    rooms: [],
    payment: "online",
  });

  const {
    createNewHotel,
    isErrorCreatingHotel,
    isSuccessCreatingHotel,
    errorNewHotel,
    isLoadingNewHotel,
  } = useCreateNewHotel();

  const {
    register,
    trigger,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(NewHotelSchema),
    defaultValues: {
      rating: 0,
      parkingDetails: {
        isParkingAvailable: "no",
        parkingType: "public",
        parkingLocation: "onsite",
        needReservation: "false",
        parkingCostType: "per_day",
      },
      breakfastDetails: {
        offersBreakfast: "false",
        isIncludedInPrice: "true",
      },
    },
  });

  const submitHandler = async (formData) => {
    // console.log(errors);
    // console.log("Form Data:", formData);

    const data = await createNewHotel(formData);

    // console.log("New hotel response :", data);
  };

  // Validate the token and update state
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsTokenValid(false);
        navigate("/auth/signin");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:8000/api/user/validate-token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Token validation failed");
        }

        const data = await response.json();
        // console.log("Token is valid", data);
        setIsTokenValid(true);
      } catch (error) {
        console.error(error.message);
        localStorage.removeItem("token");
        navigate("/auth/signin");
      }
    };

    checkToken();
  }, [navigate]);

  // Conditional rendering based on token validity
  if (!isTokenValid) {
    navigate("/auth/signin"); // Show a blank screen while validating or redirecting
  }

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex items-center justify-center bg-gray-200 "
    >
      <div className="flex flex-col items-center w-4/5 p-5 my-10 space-y-2 bg-white rounded-md shadow-md md:w-3/5">
        <h1 className="text-3xl font-bold">Register Your Hotel</h1>
        <AboutHotel
          formData={formData}
          setFormData={setFormData}
          register={register}
          errors={errors}
        />
        <ContactInformation
          formData={formData}
          setFormData={setFormData}
          register={register}
          errors={errors}
        />
        <LocationDetails
          formData={formData}
          setFormData={setFormData}
          register={register}
          errors={errors}
        />
        <RoomsInformation register={register} errors={errors} />
        <Policies register={register} errors={errors} />
        <ParkingDetails
          formData={formData}
          setFormData={setFormData}
          register={register}
          errors={errors}
        />
        <BreakfastDetails
          formData={formData}
          setFormData={setFormData}
          register={register}
          errors={errors}
          setValue={setValue}
        />
        <GuestsFacilities
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          register={register}
          setValue={setValue}
        />
        <HotelPhotos
          formData={formData}
          setFormData={setFormData}
          register={register}
          errors={errors}
          setValue={setValue}
        />
        <button
          type="submit"
          disabled={isLoadingNewHotel}
          className="p-2 font-semibold text-white rounded-md bg-blue-950"
        >
          {isLoadingNewHotel ? "Loading" : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default NewHotelPage;
