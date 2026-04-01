import { Schema, models } from "mongoose";
const boardSchema = new mongoose.Schema({
  username: String,
  id: Number,
  title: String,
  contentType: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  data: {
    type: Number,
    required: true,
  },
});
module.exports = model("Board", boardSchema);
