import { z } from "zod";

const numberSchema = z.coerce.number();

const BaseRoomSchema = z.object({
  roomCategory: z.string().min(1, "Room category is required."),
  roomType: z.string().min(1, "Room type is required."),
  bedType: z.string().min(1, "Bed type is required."),
  chargePerNight: numberSchema.min(1, "charges per night can't be zero"),
  maximumOccupancy: numberSchema.min(1, "max occupency can't be zero"),
  roomSize: numberSchema.min(1, "Room size can't be zero"),
  numberOfRooms: numberSchema.min(1, "Number of rooms can't be zero"),
  roomView: z.string().min(1, "Room view is required."),
  additionalCharges: z.coerce.number().nonnegative(),
  discount: z.coerce.number().nonnegative().min(0).max(100),
  facilities: z
    .array(z.string(), { message: "At least one facility is required." })
    .min(1, "At least one facility is required."),
  roomImages: z
    .array(
      z.instanceof(File).refine(
        (file) =>
          file.type.startsWith("image/") || {
            message: "Please select valid images ",
          }
      ),
      { message: "At least 2 images of your hotel is required " }
    )
    .min(2, { message: "At least 2 images of your hotel is required " }),
  selectedRooms: z
    .array(z.coerce.number(), {
      message: "please select atleat one room for this category",
    })
    .min(1, { message: "please select atleat one room for this category" }),
});

const RoomSchema = BaseRoomSchema.superRefine((data, ctx) => {
  if (data.numberOfRooms !== data.selectedRooms.length) {
    ctx.addIssue({
      path: ["selectedRooms"],
      message: "Seleted rooms must be equal to number of rooms",
    });
  }
});

export const EditRoomSchema = BaseRoomSchema.extend({
  roomImages: z
    .array(
      z.instanceof(File).refine((file) => file.type.startsWith("image/"), {
        message: "Please select valid images",
      }),
      { message: "At least 2 photos of your hotel are required" }
    )
    .optional(),
}).superRefine((data, ctx) => {
  if (data.numberOfRooms !== data.selectedRooms.length) {
    ctx.addIssue({
      path: ["selectedRooms"],
      message: "Seleted rooms must be equal to number of rooms",
    });
  }
});

export default RoomSchema;
