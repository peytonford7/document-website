import { Schema, model } from 'mongoose';
<<<<<<< Updated upstream
import File from './File.js';
=======
import { File } from './index.js';
>>>>>>> Stashed changes
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
    contentType: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    fileList: [{
        type: Schema.Types.ObjectId,
        ref: 'File',
    }],
});
const Panel = model('Panel', panelSchema);
export default Panel;
