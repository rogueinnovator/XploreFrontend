import { z } from "zod";

export const bookingSchema = z
  .object({
    guestName: z.string().min(1, "Guest Name is required"),
    contactNumber: z.string().min(1, "Contact Number is required"),
    numberOfGuests: z.coerce.number().min(1, "Number of guests can't be zero"),
    paymentStatus: z.string().min(1, "Payment Status is required"),
    bookingStatus: z.string().min(1, "Booking Status is required"),
    checkInDate: z.string().min(1, "Checkin Date is required"),
    checkOutDate: z.string().min(1, "Checkout Date  is required"),
    selectedRooms: z
      .array(z.coerce.number(), { message: "Please select at least one room" })
      .min(1, { message: "Please select at least one room" }),
  })
  .superRefine((data, ctx) => {
    if (
      new Date(data.checkOutDate).getTime() <
      new Date(data.checkInDate).getTime()
    ) {
      ctx.addIssue({
        path: ["checkOutDate"],
        message: "Chekout date can't be before then checkin date",
      });
    }
  });
