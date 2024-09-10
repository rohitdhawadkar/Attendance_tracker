import { z } from "zod";

const v = (schema) => {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is required" });
    }

    try {
      // Parse the request body with the schema
      schema.parse(req.body);
      next();
    } catch (error) {
      // Check if the error is an instance of ZodError
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Invalid request body",
          errors: error.errors, // zod-specific errors
        });
      }
      // Handle unexpected errors
      return res.status(500).json({
        message: "Server error validation.js",
        error: error.message, // Provide error details
      });
    }
  };
};

export default v;
