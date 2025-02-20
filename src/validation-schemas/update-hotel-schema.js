import { z } from "zod";

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
  needReservation: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        return val === "true";
      }
      return val; // Leave as-is if already a boolean
    },
    z.boolean() // Final validation ensures it's a boolean
  ),
    
});

const BreakfastSchema = z.object({
  offersBreakfast: z.preprocess(
    (val) => {
      if (val === "true" || val === true) return true;
      if (val === "false" || val === false) return false;
      return false; // Default to false if value is missing or invalid
    },
    z.boolean()
  ),
  
  isIncludedInPrice: z.preprocess(
    (val) => {
      if (val === "true" || val === true) return true;
      if (val === "false" || val === false) return false;
      return false; // Default to false if value is missing or invalid
    },
    z.boolean()
  ),
    
  breakfastType: z.array(z.string()).default([]),
  chargePerPerson: z.coerce
    .number()
    .min(0, { message: "Charge for a peron must not be zero or negative" })
    .optional(),
});

const UpdateHotelSchema = z
  .object({
    name: z.string().min(1, { message: "Hotel name is required." }),
    rating: z.coerce
      .number()
      .min(0, { message: "rating must not be less than 5" })
      .max(5, { message: "rating must not exceed 5" }),
      contact: z.object({
      email: z.string().email("Please enter valid email"),
      phone: z
        .string()
        .min(1, { message: "Please enter valid phone number" }),
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
   
      coordinates: z.object({
        longitude: z.coerce
          .number({ message: "Longitude is required." })
          .refine((value) => value !== undefined && value !== null, {
            message: "Longitude is required.",
          }),
        latitude: z.coerce
          .number({ message: "Latitude is required." })
          .refine((value) => value !== undefined && value !== null, {
            message: "Latitude is required.",
          }),
      }), 
      zipcode: z.string().min(1, { message: "Postal code is required." }),
    }), 
     parkingDetails: ParkingSchema,
    breakfastDetails: BreakfastSchema, 
     amenities: z
      .array(z.string(), { message: "select atleat one facility" })
      .min(1, { message: "select atleat one facility" }), 
       photos: z
      .array(
        z.instanceof(File).refine((file) => file.type.startsWith("image/"), {
          message: "Please select valid image",
        })
      )
      .optional(), 
      policies: z.object({
      checkIn: z
        .string()
        .min(1, { message: "Check-in start time is required." }),
      checkOut: z.string().min(1, { message: "Check-out time is required." }),
      cancellation: z
        .string()
        .min(1, { message: "Cancellation policy is required." }),
    }), 
      availability: z.object({
      startDate: z.string().min(1, { message: "Start date is required." }),
      endDate: z.string().min(1, { message: "End date is required." }),
      roomsAvailable: z.coerce
        .number()
        .min(1, { message: "Rooms available must be at least 1" }),
    }),  

    /*  houseRules: z.object({
      checkIn: z.object({
        from: z
          .string()
          .min(1, { message: "Check-in start time is required." }),
        until: z.string().min(1, { message: "Check-in end time is required." }),
      }),
      checkOut: z.object({
        from: z
          .string()
          .min(1, { message: "Check-out start time is required." }),
        until: z
          .string()
          .min(1, { message: "Check-out end time is required." }),
      }),
      allowChildrens: z
        .string()
        .refine((val) => val === "true" || val === "false", {
          message: "Invalid value for allowChildren",
        })
        .transform((val) => val === "true"),
      allowPets: z.enum(["true", "false"]).transform((val) => val === "true"),
      petsCharges: z.coerce.number().default(0),
    }), */
    description: z.string().min(1, { message: "Description is required." }),
  })
  .superRefine((data, ctx) => {
    // Parking refinements
    if (
      ["yes_free", "yes_paid"].includes(data.parkingDetails.isParkingAvailable)
    ) {
      if (!data.parkingDetails.parkingType) {
        ctx.addIssue({
          path: ["parkingDetails", "parkingType"],
          message: "Parking type is required when parking is available.",
        });
      }
      if (!data.parkingDetails.parkingLocation) {
        ctx.addIssue({
          path: ["parkingDetails", "parkingLocation"],
          message: "Parking location is required when parking is available.",
        });
      }
    }
    if (data.parkingDetails.isParkingAvailable === "yes_paid") {
      if (data.parkingDetails.parkingCost === undefined) {
        ctx.addIssue({
          path: ["parkingDetails", "parkingCost"],
          message: "Parking cost is required when parking is paid.",
        });
      }
      if (!data.parkingDetails.parkingCostType) {
        ctx.addIssue({
          path: ["parkingDetails", "parkingCostType"],
          message: "Parking cost type is required when parking is paid.",
        });
      }
    }

    // Breakfast refinements
    if (data.breakfastDetails.offersBreakfast) {
      if (
        !data.breakfastDetails.isIncludedInPrice &&
        data.breakfastDetails.chargePerPerson === undefined
      ) {
        ctx.addIssue({
          path: ["breakfastDetails", "chargePerPerson"],
          message:
            "Charge per person is required when breakfast is not included in price.",
        });
      }
      if (data.breakfastDetails.breakfastType.length === 0) {
        ctx.addIssue({
          path: ["breakfastDetails", "breakfastType"],
          message: "Breakfast type is required when breakfast is offered.",
        });
      }
    }
  });

export default UpdateHotelSchema;
