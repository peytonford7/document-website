import dotenv from "dotenv";
import https from "https";
import express from "express";
import mongoose from "mongoose";
import fs from "fs";
import * as Router from "./routes/index.js";

const app = express();

const sslOptions = {
	key: fs.readFileSync("./certs/key.pem"),
	certs: fs.readFileSync("./certs/cert.pem")
};

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);

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

https.createServer(sslOptions, app).listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

