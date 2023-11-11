import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import express, { Request, Response } from "express";
import { questionRouter } from "./routers/questionRouter";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;
const corsOpts = {
  origin: "*",
};

app.use(cors(corsOpts));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(express.json());

// set up routes
app.use("/questions", questionRouter);

// set up database
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("Connected to Mongoose");
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
