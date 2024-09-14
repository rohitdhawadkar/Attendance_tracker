import { z } from "zod";

const attendanceSchema = z.object({
  status: z.enum(["present", "absent"]), // Validating status as either "present" or "absent"
});

export default attendanceSchema;
