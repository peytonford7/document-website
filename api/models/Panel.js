import { Schema, model } from 'mongoose';
import { File } from './index.js';
const panelSchema = new Schema({
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    fileList: [
        {
            type: Schema.Types.ObjectId,
            ref: 'File',
        },
    ],
});
const Panel = model('Panel', panelSchema);
export default Panel;
