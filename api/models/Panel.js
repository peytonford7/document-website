import mongoose from "mongoose";
import { default as User } from "./User.js";
const panelSchema = new mongoose.Schema({
  username: String,
  id: Number,
  content: String,
});
const Panel = mongoose.model("Panel", panelSchema);
export default Panel;