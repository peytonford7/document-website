import { Router } from 'express';
import { User, Panel } from '../models/index.js';
const router = Router();

router.get('/user/:user/panel/list', async (req, res) => {
    const username = req.params.user;
    const user = await User.findOne({ username });
    if (user) {
        const panelList = await Panel.find({ username });
        res.render('panel', { title: `${username}'s Panels`, user: user });
    } else {
        return res.status(404).send('User not found.');
    }
});
router.get('/user/:user/panel/:id', async (req, res) => {
    const username = req.params.user;
    const user = await User.findOne({ username });
    if (user) {
        const panelId = req.params.id;
        const panel = await Panel.findOne({ username, id: panelId }).populate('fileList');
        if (panel) {
            if (req.accepts('json')) return res.json(panel);
            res.render('panel', { title: panel.title, user: user });
        } else {
            return res.status(404).send('Panel not found.');
        }
    } else {
        return res.status(404).send('User not found.');
    }
});

export default router;
