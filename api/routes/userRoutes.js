import { Router } from 'express';
import { User } from '../models/index.js';
import * as db from '../utils/database.js';
const router = Router();

router.get('/user/:user', async (req, res) => {
    const username = req.params.username;
    const user = await User.findOne({ username });
    if (user) {
        res.render('user', {
            title: 'User Details',
            body: `Username: ${username}`,
        });
    } else {
        return res.status(404).send('User not found.');
    }
});

export default router;
