import { Accessibility } from "lucide-react";
import { array, z } from "zod";

const ParkingSchema = z.object({
  isParkingAvailable: z
    .enum(["yes_free", "yes_paid", "no"], {
      message: "The Above field is required",
    })
    .default("no"),
  parkingCost: z.coerce.number().optional(),
  parkingCostType: z.enum(["per_day", "per_hour", "per_stay"]).optional(),
  parkingType: z.enum(["private", "public"]).optional(),
  parkingLocation: z.enum(["onsite", "offsite"]).optional(),
  needReservation: z
    .enum(["true", "false"])
    .transform((val) => val === "true" || val === true),
});

const BreakfastSchema = z.object({
  offersBreakfast: z
    .string()
    .refine((val) => val === "true" || val === "false", {
      message: "Invalid value for Breakfastoffer",
    })
    .transform((val) => val === "true"),
  isIncludedInPrice: z
    .string()
    .refine((val) => val === "true" || val === "false", {
      message: "Invalid value for isIncludedInPrice",
    })
    .transform((val) => val === "true"),
  breakfastType: z.array(z.string()).default([]),
  chargePerPerson: z.coerce
    .number()
    .min(0, { message: "Charge for a peron must not be zero or negative" })
    .optional(),
});
const NewHotelSchema = z.object({
  name: z.string().min(1, { message: "Hotel name is required" }),
  description: z.string().min(1, { message: "Hotel description is required" }),
  rating: z.coerce.number().min(5, { message: "Rating must be at least 5" }),
  contact: z.object({
    email: z.string().email("Please enter a valid email"),
    phone: z.string().min(1, { message: "Please enter a valid phone number" }),
    website: z.string().optional(),
    socialLinks: z.object({
      facebook: z.string().optional(),
      instagram: z.string().optional(),
      linkedin: z.string().optional(),
      twitter: z.string().optional(),
    }),
  }),
  location: z.object({
    country: z.string().min(1, { message: "Country is required." }),
    address: z.string().min(1, { message: "Address is required." }),
    city: z.string().min(1, { message: "City is required." }),
    state: z.string().min(1, { message: "State is required." }),
    zipcode: z.string().min(1, { message: "Zip code is required." }),
    coordinates: z.object({
      longitude: z
        .number({ invalid_type_error: "Longitude must be a number." })
        .min(-180, { message: "Longitude must be between -180 and 180." })
        .max(180, { message: "Longitude must be between -180 and 180." }),
      latitude: z
        .number({ invalid_type_error: "Latitude must be a number." })
        .min(-90, { message: "Latitude must be between -90 and 90." })
        .max(90, { message: "Latitude must be between -90 and 90." }),
    }),
  }),
  breakfastDetails: BreakfastSchema,
  /*ParkingDetails: ParkingSchema, */
  amenities: z
    .array(z.string())
    .min(1, { message: "Select at least one facility" }),
  /*pricePerNight: z.string().min(1, { message: "Price is required." }), */
  photos: z
    .array(
      z.instanceof(File).refine((file) => file.type.startsWith("image/"), {
        message: "Please select valid images",
      })
    )
    .min(2, { message: "At least 2 photos of your hotel are required" }),
  policies: z.object({
    checkIn: z.string().min(1, { message: "Check-in start time is required." }),
    checkOut: z.string().min(1, { message: "Check-out time is required." }),
    cancellation: z
      .string()
      .min(1, { message: "Cancellation policy is required." }),
  }),
  availability: z.object({
    startDate: z.string().min(1, { message: "Start date is required." }),
    endDate: z.string().min(1, { message: "End date is required." }),
    roomsAvailable: z
      .number()
      .min(1, { message: "Rooms available is required." }),
  }),
});
// ***************************************************************** //
const baseHotelInformationSchema = z.object({
  name: z.string().min(1, { message: "Hotel name is required" }),
  hotelType: z.string().min(1, { message: "Hotel type name is required" }),
  description: z.string().min(1, { message: "Hotel description is required" }),
  currency: z.string().min(1, "Currency is required"),
  rating: z.coerce
    .number()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating must be no more than 5" }),
  startingRoomNumber: z.coerce
    .number({
      required_error: "Starting  room number is required",
      invalid_type_error: "Starting  room number must be a number",
    })
    .int()
    .positive("Starting  room number must not be zero"),
  endingRoomNumber: z.coerce
    .number({
      required_error: "Ending  room number is required",
      invalid_type_error: "Ending  room number must be a number",
    })
    .int()
    .positive("Ending  room number must not be zero"),
  registrationDocs: z
    .array(
      z
        .instanceof(File)
        .refine(
          (file) =>
            file.type.startsWith("image/") ||
            file.type.startsWith("application/pdf"),
          {
            message: "Please select valid docs",
          }
        )
    )
    .min(1, { message: "At least 1 doc of your hotel are required" }),
});

export const hotelInformationSchema = baseHotelInformationSchema.superRefine(
  (data, ctx) => {
    if (data.endingRoomNumber <= data.startingRoomNumber) {
      ctx.addIssue({
        path: ["endingRoomNumber"],
        message: "Ending number must be greater than starting number",
      });
    }
  }
);

export const locationSchema = z
  .object({
    address: z.string().min(1, { message: "address is required" }),
    city: z.string().min(1, { message: "city is required" }),
    gpsCoordinates: z.string().min(1, { message: "cordinates are required" }),
    accessibility: z.array(z.string()).optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.gpsCoordinates.includes(",")) {
      ctx.addIssue({
        path: ["gpsCoordinates"],
        message: "Please provide cordinates in form latitude,langitude ",
      });
    }
    const lat = Number(data.gpsCoordinates.split(",")[0]);

    if (lat > 90 || lat < -90) {
      ctx.addIssue({
        path: ["gpsCoordinates"],
        message: "please provide valid latitude",
      });
    }

    const lang = Number(data.gpsCoordinates.split(",")[1]);

    if (lang > 180 || lang < -180) {
      ctx.addIssue({
        path: ["gpsCoordinates"],
        message: "please provide valid langitude",
      });
    }
  });

export const contactInformationSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(1, { message: "Please enter a valid phone number" }),
  websiteUrl: z.string().optional(),
  socialLinks: z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    youtube: z.string().optional(),
    googleMapLocation: z.string().optional(),
  }),
});

const basePoliciesAndRulesSchema = z.object({
  checkInTime: z.string().min(1, "Checkin time is required "),
  checkOutTime: z.string().min(1, "Checkin time is required "),
  earlyCheckInFee: z.coerce
    .number({
      invalid_type_error: "Early checkin fee must be a number",
    })
    .int()
    .nonnegative("Early checkin fee must not be zero")
    .optional(),
  isPetAllowed: z.enum(["yes", "no", "upon_request"]),
  petPricePerNight: z.coerce
    .number({
      invalid_type_error: "price per pet must be a number",
    })
    .int()
    .nonnegative("price per pet must not be negative")
    .optional(),
  petsPerRoom: z.coerce
    .number({
      invalid_type_error: "pets per room must be a number",
    })
    .int()
    .nonnegative("pets per romm must not be negative")
    .optional(),
  freeChildrenPolicy: z.string().optional(),
  extraBedFee: z.coerce
    .number({
      invalid_type_error: "bed fee must be a number",
    })
    .int()
    .nonnegative("bed fee must not be negative")
    .optional(),
  freeCancellationPolicy: z.string().optional(),
  smokingPolicy: z.string().optional(),
  paymentMethods: z
    .array(z.string(), { message: "please select at least one payment method" })
    .min(1, { message: "please select at least one payment method" }),
});

export const policiesAndRulesSchema = basePoliciesAndRulesSchema;

export const facilitiesAndAmenitiesSchema = z.object({
  facilities: z
    .array(z.string(), { message: "Please select at least one aminity" })
    .min(1, { message: "Please select at least one aminity" }),
});

export const hotelImagesSchema = z.object({
  images: z
    .array(
      z.instanceof(File).refine((file) => file.type.startsWith("image/"), {
        message: "Please select valid image",
      }),
      { message: "At least 2 photos of your hotel are required" }
    )
    .min(2, { message: "At least 2 photos of your hotel are required" }),
});

export default NewHotelSchema;

// update schemas

export const hotelInformationUpdateSchema = baseHotelInformationSchema.extend({
  registrationDocs: z
    .array(
      z
        .instanceof(File)
        .refine(
          (file) =>
            file.type.startsWith("image/") ||
            file.type.startsWith("application/pdf"),
          {
            message: "Please upload valid documents (images or PDFs)",
          }
        )
    )
    .optional(), 
});

export const checkinoutPolicySchema = basePoliciesAndRulesSchema.pick({
  checkInTime: true,
  checkOutTime: true,
  earlyCheckInFee: true,
});

export const freeCancellationPolicySchema = basePoliciesAndRulesSchema.pick({
  freeCancellationPolicy: true,
});

export const petPolicySchema = basePoliciesAndRulesSchema.pick({
  isPetAllowed: true,
  petPricePerNight: true,
  petsPerRoom: true,
});

export const freeChildrenPolicySchema = basePoliciesAndRulesSchema.pick({
  freeChildrenPolicy: true,
  extraBedFee: true,
});

export const smokingPolicySchema = basePoliciesAndRulesSchema.pick({
  smokingPolicy: true,
});

export const paymentMethodsPolicySchema = basePoliciesAndRulesSchema.pick({
  paymentMethods: true,
});

export const updateHotelImagesSchema = z.object({
  images: z
    .array(
      z.instanceof(File).refine((file) => file.type.startsWith("image/"), {
        message: "Please select valid image",
      }),
      { message: "At least 2 photos of your hotel are required" }
    )
    .optional(),
});
