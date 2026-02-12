const {z} = require("zod");

//creating an object schema for registration validation
const signupSchema = z.object({
    username: z
     .string({required_error: "Username is required"})
     .trim()
     .min(3,{message: "Username must be at least 3 characters"})
     .max(255,{message: "Username must be less than 255 characters"}),
    email: z
     .string({required_error: "Email is required"})
     .trim()
     .email({message:"Invalid email address"})
     .min(3,{message: "Email must be at least 3 characters"})
     .max(255,{message: "Email must be less than 255 characters"}),
     phoneNumber: z
     .string({required_error: "PhoneNumber is required"})
     .trim()
     .min(10,{message: "Number must be at least 10 characters"})
     .max(20,{message: "PhoneNumber must be less than 20 characters"}),
     password: z
     .string({required_error: "Password is required"})
     .trim()
     .min(7,{message: "Password must be at least 7 characters"})
     .max(1024,{message: "Password must be less than 1024 characters"}),
   
});

//creating an object schema for login validation
const loginSchema = z.object({
    email: z
     .string({required_error: "Email is required"})
     .trim()
     .email({message:"Invalid email address"}),
    password: z
     .string({required_error: "Password is required"})
     .trim()

});

module.exports = {
    signupSchema,
    loginSchema
}