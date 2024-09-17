import { z } from "zod";

const attendanceSchema = z.object({
  status: z.enum(["Present", "Absent"]), 
});

export default attendanceSchema;
