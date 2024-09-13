import express from "express";
import cors from "cors";
import registerUser from "./routes/registerRoute.js";
import login from "./routes/loginRoute.js";
import connectDB from "./config/db.js";
// import attendanceRoute from "./routes/attendanceRoute.js";
import classRoute from "./routes/classRoute.js";
// import lectureRoute from "./routes/lectureRoute.js";
import createStudent from "./controller/studentCOntroller.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.post("/register", registerUser);
app.post("/login", login);
// app.post("/markAttendance", attendanceRoute);
app.post("/addClass", classRoute);
app.post("/createStudent", createStudent);
// app.post("/addlecture", lectureRoute);

const port = 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
