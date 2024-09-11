import express from "express";
import cors from "cors";
import registerUser from "./routes/registerRoute.js";
import login from "./routes/loginRoute.js";
import connectDB from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.post("/register", registerUser);
app.post("/login", login);

const port = 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
