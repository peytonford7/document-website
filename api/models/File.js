import { Schema, model } from "mongoose";
const fileSchema = new Schema({
	username: String,
	fileName: String,
	contentType: String,
	uploadDate: {
		type: Date,
		default: Date.now
	},
	data: {
		type: Buffer,
		required: true
	}
});
module.exports = model("File", fileSchema);
