import {z} from "zod";

const classValidation = z.object({
    className:z.string().min(1)
});

export default classValidation;

