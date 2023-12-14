import { connectDB } from "./db/connnectDb";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
dotenv.config;

import UserRoute from "./routes/User/index";

connectDB();

const app = express();
const port = 5005;
const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use(morgan("dev"));
app.use(bodyParser.json());

app.get("/health", (req, res) => {
  res.send("Api is Working Fine");
});


app.use("/user", UserRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
