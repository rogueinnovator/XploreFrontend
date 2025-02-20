import { z } from 'zod';
 
const userSigninSchema = z.object({
   email: z
    .string()
    .min(1, { message: "Email is a required field." })
    .email({ message: "Please enter a valid email address." }),
   password: z.string().min(1, { message: "Password is required." }),
});


const userForgotSchema = z.object({
   email:z.string().email({ message: "Please enter a valid email address." }),
})
export {
   userForgotSchema,
   userSigninSchema
} ;

