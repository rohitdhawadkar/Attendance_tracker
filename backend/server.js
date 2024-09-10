import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Register from './Register.js';
import Login from './Login.js';



const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/register", Register);
app.use("/login", Login);

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
