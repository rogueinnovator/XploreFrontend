import { useState } from "react";
import Stepper from "../../components/hotelOnboarding/stepper";
import Buttons from "../../components/hotelOnboarding/buttons";
import HotelInformation from "../../components/hotelOnboarding/hotelInformation";
import LocationDetails from "../../components/hotelOnboarding/locationDetails";
import ContactInformation from "../../components/hotelOnboarding/contactInformation";
import PoliciesAndRules from "../../components/hotelOnboarding/policiesAndRules";
import FacilitiesAndAmenities from "../../components/hotelOnboarding/facilitiesAndAmenities";
import RoomImages from "../../components/hotelOnboarding/hotelImages";
import { ArrowLeft } from "lucide-react";
import Logo from "../../../public/logo_1.svg";

import {
  contactInformationSchema,
  facilitiesAndAmenitiesSchema,
  hotelImagesSchema,
  hotelInformationSchema,
  locationSchema,
  policiesAndRulesSchema,
} from "../../validation-schemas/hotel-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateNewHotel } from "../../api/hotel-api";
import { useOwnerContext } from "../../context/OwnerContext";
import { Navigate, useNavigate } from "react-router-dom";

const Main = () => {
  const steps = [
    {
      title: "Hotel information",
      Component: HotelInformation,
      schema: hotelInformationSchema,
      key: "hotelInformation",
    },
    {
      title: "Location details",
      Component: LocationDetails,
      schema: locationSchema,
      key: "locationDetails",
    },
    {
      title: "Contact information",
      Component: ContactInformation,
      schema: contactInformationSchema,
      key: "contactInformation",
    },
    {
      title: "Policies and rules",
      Component: PoliciesAndRules,
      schema: policiesAndRulesSchema,
      key: "policiesAndRules",
    },
    {
      title: "Facilities",
      Component: FacilitiesAndAmenities,
      schema: facilitiesAndAmenitiesSchema,
      key: "facilitiesAndAmenities",
    },
    {
      title: "Hotel Images",
      Component: RoomImages,
      schema: hotelImagesSchema,
      key: "hotelImages",
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hotelInformation: {
      name: "",
      description: "",
      rating: 5,
      startingRoomNumber: 0,
      endingRoomNumber: 0,
      registrationDocs: [],
      currency: "USD",
    },
    locationDetails: {
      address: "",
      city: "",
      gpsCoordinates: "",
      accessibility: [],
    },
    contactInformation: {
      email: "",
      phone: "",
      websiteUrl: "",
      socialLinks: {
        facebook: "",
        instagram: "",
        linkedin: "",
        twitter: "",
        youtube: "",
        googleMapLocation: "",
      },
    },
    policiesAndRules: {
      checkInTime: "",
      checkOutTime: "",
      earlyCheckInFee: 0,
      isPetAllowed: "no",
      petPricePerNight: 0,
      petsPerRoom: 0,
      freeChildrenPolicy: "children under 12 stay free",
      extraBedFee: 0,
      freeCancellationPolicy: "",
      smokingPolicy: "no smoking allowed in rooms",
      paymentMethods: [],
    },
    facilitiesAndAmenities: {
      facilities: [],
    },
    hotelImages: {
      images: [],
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: zodResolver(steps[currentStep].schema), // Apply dynamic schema resolver
    defaultValues: formData[steps[currentStep].key],
  });

  const { user, setUser } = useOwnerContext();
  const { createNewHotel, isSuccess, isError, error, isLoading } =
    useCreateNewHotel();

  const submitHandler = async () => {
    const { hotelImages, facilitiesAndAmenities, ...rest } = formData;

    const data = {
      ...rest,
      hotelImages: hotelImages.images,
      facilities: facilitiesAndAmenities.facilities,
    };

    const response = await createNewHotel(data);

    if (response.success) {
      // update user to also set his hotel
      setUser((prev) => {
        return {
          ...user,
          hotelId: response.hotel._id,
        };
      });

      navigate("/dashbaord");
    }
  };

  const handleNextStep = () => {
    const currentKey = steps[currentStep].key;
    handleSubmit((data) => {
      setFormData((prev) => {
        return {
          ...prev,
          [currentKey]: data,
        };
      });

      if (currentStep === steps.length - 1) {
        submitHandler();
        return;
      }
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    })();
  };

  const handlePreviousStep = () => {
    if (currentStep !== 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const currentKey = steps[currentStep].key;

  if (user?.hotelId) {
    return <Navigate to="/dashboard"></Navigate>;
  }

  return (
    <div>
      <div className="h-[33.20px] justify-start items-end gap-6 inline-flex mt-[20px]">
        <div className="relative w-8 h-8 overflow-hidden" />
        <div className="w-[241px] flex-col justify-center items-start gap-[14.76px] inline-flex">
          <div className="justify-start items-center gap-[6.15px] inline-flex">
            <div className="text-black text-xl font-medium font-['Poppins'] leading-normal">
              <img className="w-[40.58px] h-[33.20px]" src={Logo} alt="Logo" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-10 mt-10">
        <Stepper steps={steps} currentStep={currentStep} />

        <div className="p-5 mt-10 mb-10 border border-gray-300 rounded-lg shadow-lg">
          <StepWrapper
            Component={steps[currentStep].Component}
            data={formData[currentKey]}
            setData={(newData) =>
              setFormData((prev) => ({ ...prev, [currentKey]: newData }))
            }
            errors={errors}
            control={control} // Pass control for React Hook Form
            setValue={setValue}
            clearErrors={clearErrors}
          />
          <Buttons
            handleNext={handleNextStep}
            handleBack={handlePreviousStep}
            isLoading={isLoading}
            isLastStep={currentStep === steps.length - 1}
          />
        </div>
      </div>
    </div>
  );
};

const StepWrapper = ({
  Component,
  data,
  setData,
  errors,
  control,
  setValue,
  clearErrors,
}) => {
  return (
    <Component
      data={data}
      setData={setData}
      errors={errors}
      control={control}
      setValue={setValue}
      clearErrors={clearErrors}
    />
  );
};

export default Main;
