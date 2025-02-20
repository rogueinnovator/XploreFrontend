import { z } from "zod";

const UserSchema = z
  .object({
    name: z.string().min(1, { message: "Name is a required field." }),
    email: z
      .string()
      .min(1, { message: "Email is a required field." })
      .email({ message: "Please enter a valid email address." }),
    phone: z.string().min(1, { message: "Phone is a required field." }),
    password: z.string().min(1, { message: "Password is required." }),
    confirmPassword: z.string().min(1, { message: "Password is required." }),
    terms: z.boolean().refine((val) => val === true, {
      message: "Please accept terms and conditions",
    }),

    // terms: z
    //   .string()
    //   .refine((val) => (val === "false" ? false : true), {
    //     message: "please accept terms and conditions",
    //   })
    //   .transform((val) => val === "true"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Password and confirm must be same",
      });
    }
  });

export default UserSchema;
