import { Schema, model } from 'mongoose';
const fileSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
});
const File = model('File', fileSchema);
export default File;
