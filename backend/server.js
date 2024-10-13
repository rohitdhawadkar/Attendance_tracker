import express from "express";
import helmet from "helmet";
import crypto from "crypto";
import cors from "cors";
import registerUser from "./routes/registerRoute.js";
import login from "./routes/loginRoute.js";
import connectDB from "./config/db.js";
import classRoute from "./routes/classRoute.js";
import lectureRoute from "./routes/lectureRoute.js";
import logoutRoute from "./routes/logoutRoute.js";

import a from "./routes/AttendanceRoute.js";

const app = express();
app.use((req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString("hex");
  next();
});
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "http://localhost:3001"],
      fontSrc: ["'self'", "data:"],
      styleSrc: ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`],
    },
  }),
);

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    credentials: true, // Enable sending cookies
  }),
);

app.use(express.json());

connectDB();
app.use("/attendance", a);
app.post("/register", registerUser);
app.post("/login", login);
app.use("/class", classRoute);
app.post("/logout", logoutRoute);
app.use("/lectures", lectureRoute);

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
