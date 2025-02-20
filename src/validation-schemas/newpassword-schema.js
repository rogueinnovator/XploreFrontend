import { z } from "zod";

const NewPasswordSchema = z
  .object({
    password: z.string().min(1, { message: "Password is required." }),
    confirmPassword: z.string().min(1, { message: "Password is required." }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Password and confirm must be same",
      });
    }
  });

export default NewPasswordSchema;
