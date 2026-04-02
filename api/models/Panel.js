import { Schema, model } from "mongoose";
const panelSchema = new Schema({
  username: {
	type: String,
	required: true,
  },
  id: {
	type: Number,
	required: true,
	unique: true
  },
  title: {
	type: String,
	required: true
  },
  contentType: {
	type: String,
	required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  data: String
});
const Panel = model("Panel", panelSchema);
export default Panel;
