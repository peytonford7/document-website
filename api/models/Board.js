import { Schema, model } from 'mongoose';
import { Panel } from './index.js';
const boardSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    contentType: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    panelList: [{
	type: Schema.Types.ObjectId,
	ref: Panel,
	}]
});
const Board = model('Board', boardSchema);
export default Board;
