import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import CountriesDropdown from "../../components/hotel-forms/CountriesDropdown.jsx";
import LocationDetails from "../../components/hotel-forms/location-form.jsx";
import ParkingDetails from "../../components/hotel-forms/parking-form.jsx";
import BreakfastDetails from "../../components/hotel-forms/breakfast-form.jsx";
import { Loader2 } from "lucide-react";
import UpdateHotelSchema from "../../validation-schemas/update-hotel-schema.js";

import AboutHotel from "../../components/hotel-forms/about-hotel-form.jsx";
import ContactInformation from "../../components/hotel-forms/contact-information.jsx";
import HotelPhotos from "../../components/hotel-forms/hotel-photos.jsx";
import RoomsInformation from "../../components/hotel-forms/rooms-form.jsx";
import Policies from "../../components/hotel-forms/rooms-policy.jsx";
import GuestsFacilities from "../../components/hotel-forms/aminities.jsx";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import {
  useCreateNewHotel,
  useGetHotelById,
  useUpdateHotel,
} from "../../api/hotel-api.js";

const UpdateHotelPage = () => {
  const { id } = useParams();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UpdateHotelSchema),
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
      /*  houseRules: {
        allowChildrens: "true",
        allowPets: "false",
      }, */
    },
  });

  const {
    hotelData,
    isLoadingInitialData,
    isErrorInitialData,
    isSuccessInitialData,
  } = useGetHotelById(id);

  const {
    updateHotel,
    isLoadingUpdateHotel,
    isErrorUpdateHotel,
    isSuccessUpdateHotel,
  } = useUpdateHotel();

  useEffect(() => {
    if (hotelData && !isLoadingInitialData && !isErrorInitialData) {
      // console.log("hotel data is===>", hotelData.data);
      // const { photos, ...otherFields } = hotelData.data;

      setFormData({
        ...hotelData.data,
        photos: [],
        oldPhotos: hotelData.data.photos,
      });
      reset(hotelData.data);
      setValue("photos", []);
      setValue(
        "breakfastDetails.includedInPrice",
        hotelData.data.breakfastDetails.includedInPrice
      );
      setValue(
        "breakfastDetails.offersBreakfast",
        hotelData.data.breakfastDetails.offersBreakfast
      );

      setValue(
        "parkingDetails.needReservation",
        hotelData?.data?.parkingDetails?.needReservation ?? false // Use a default value if missing
      );

      setValue(
        "parkingDetails.isParkingAvailable",
        hotelData.data.parkingDetails.isParkingAvailable
      );

      /* setValue(
        "houseRules.allowChildrens",
        hotelData.data.houseRules.allowChildrens.toString()
      ); */

      /* setValue(
        "houseRules.allowPets",
        hotelData.data.houseRules.allowPets.toString()
      ); */
    }
  }, [hotelData, isLoadingInitialData, isErrorInitialData]);

  const submitHandler = async (data) => {
    // console.log(" Data:", data);
    // console.log(formData.oldPhotos);

    const oldPhotos = formData.oldPhotos || [];
    const newPhotos = data.photos || [];

    if (oldPhotos.length + newPhotos.length < 2) {
      setError("photos", { message: "Min 2 photos are required" });
      return;
    }

    data.oldPhotos = formData.oldPhotos;
    // console.log(data);
    await updateHotel({ hotelId: id, data: data });
  };

  if (!id) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl font-bold">Invalid or undefined id</p>
      </div>
    );
  }

  if (isLoadingInitialData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading</div>
      </div>
    );
  }
  return hotelData && !isLoadingInitialData && !isErrorInitialData ? (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex items-center justify-center bg-gray-200 "
    >
      <div className="flex flex-col items-center w-4/5 p-5 my-10 space-y-2 bg-white rounded-md shadow-md md:w-3/5">
        <h1 className="text-3xl font-bold">Update Your Hotel</h1>
        {/* Basic Details About Hotel */}
        <AboutHotel
          formData={formData}
          setFormData={setFormData}
          register={register}
          errors={errors}
        ></AboutHotel>

        {/* Contact Information*/}
        <ContactInformation
          formData={formData}
          setFormData={setFormData}
          register={register}
          errors={errors}
        ></ContactInformation>

        {/* Location */}
        {/* Include CountriesDropdown component */}

        {/* Location Details of hotel */}
        <LocationDetails
          formData={formData}
          setFormData={setFormData}
          register={register}
          errors={errors}
        ></LocationDetails>

        {/* RoomsInformation Details */}

        <RoomsInformation
          register={register}
          errors={errors}
        ></RoomsInformation>

        <Policies register={register} errors={errors}></Policies>

        <ParkingDetails
          formData={formData}
          setFormData={setFormData}
          register={register}
          errors={errors}
        ></ParkingDetails>

        {/* Breakfast Details */}
        <BreakfastDetails
          formData={formData}
          setFormData={setFormData}
          register={register}
          errors={errors}
          setValue={setValue}
        ></BreakfastDetails>

        <GuestsFacilities
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          register={register}
          setValue={setValue}
        ></GuestsFacilities>

        {/* TODO:  Additional breakfast fields conditionally shown */}
        <HotelPhotos
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          register={register}
          setValue={setValue}
          isUpdate={true}
        ></HotelPhotos>

        <button
          type="submit"
          disabled={isLoadingUpdateHotel}
          className="p-2 font-semibold text-white rounded-md bg-blue-950"
        >
          {isLoadingUpdateHotel ? "Loading" : "Update"}
        </button>
      </div>
    </form>
  ) : (
    <h1>Some thing went wrong</h1>
  );
};

export default UpdateHotelPage;
