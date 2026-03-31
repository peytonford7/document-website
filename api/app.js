import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';

import router from "./routes/authRoutes.js";

const app = express();
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const mongoURI = process.env.MONGO_URI;
const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB.", error);
  }
};
connectToMongo();

app.set("view engine", "ejs");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
