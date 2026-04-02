import { Schema, model } from "mongoose";
const boardSchema = new Schema({
  username: {
	type: String,
	required: true
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
  set: String
});
const Board = model("Board", boardSchema);
export default Board;
