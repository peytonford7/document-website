import { Router } from 'express';
import multer from 'multer';
import { File, Panel } from '../models/index.js';
import * as db from '../utils/database.js';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.get('/upload', async (req, res) => {
    const panels = await Panel.find({ username: req.user.username }).sort({ id: 1 }).select('id title');
    res.render('upload', { title: 'Upload File', user: req.user || null, panels });
});
router.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('Error uploading file!');
    }
    const panelId = Number(req.body.panelId);
    if (!panelId) {
        return res.status(400).send('Panel ID is required.');
    }

    const panel = await Panel.findOne({ username: req.user.username, id: panelId });
    const date = Date.now();
    const nextId = await db.getNextId(File);
    await db.create(File, {
        username: req.user.username,
        id: nextId,
        fileName: req.file.originalname,
        uploadDate: date,
    });
    return res.send('File uploaded!');
});

export default router;
