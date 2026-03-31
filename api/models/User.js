import { Schema, models } from "mongoose";
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});
module.exports = model("User", userSchema);
