import { z } from "zod";

const lectureSchema = z.object({
  classId: z.string().min(1, "Class ID is required."),
  topic: z.string().min(1, "Topic is required."),
  dayOfWeek: z.enum([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]),
  time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Time must be in HH:MM format"),
});

export default lectureSchema;
