import { Schema, models } from "mongoose";
const boardSchema = new mongoose.Schema({
  username: String,
  id: Number,
  content: String
});
module.exports = model("Board", boardSchema);
