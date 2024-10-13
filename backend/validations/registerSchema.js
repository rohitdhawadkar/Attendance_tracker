// registerSchema.js
import { z } from "zod";

const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  classId: z.string().length(24, "Invalid class ID format"), // Validate class ID format
});

export default registerSchema;
