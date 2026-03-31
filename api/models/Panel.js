import { Schema, model } from "mongoose";
const panelSchema = new mongoose.Schema({
  username: String,
  id: Number,
  title: String,
  contentType: String,
  createdAt: {
	type: Date,
	default: Date.now
  }
});
module.exports = model("Panel", panelSchema);
