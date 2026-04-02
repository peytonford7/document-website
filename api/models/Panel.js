import { Schema, model } from "mongoose";
const panelSchema = new mongoose.Schema({
  username: String,
  id: Number,
  title: String,
  contentType: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  data: {
    type: String,
    required: true,
  },
});
module.exports = model("Panel", panelSchema);
