import { z } from "zod";

const registerSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required") // Ensures username is not empty
    .max(50, "Username must be less than 50 characters"), // Optional: add max length constraint

  password: z
    .string()
    .min(6, "Password must be at least 6 characters") // Ensure password length
    .max(100, "Password must be less than 100 characters"), // Optional: add max length constraint
});

export default registerSchema;
