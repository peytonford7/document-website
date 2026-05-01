import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const router = Router();

router.get('/', async (req, res) => {
    let user = null;
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            user = await User.findOne({ username: decoded.username });
        } catch (error) {
            res.clearCookie('token');
        }
    }
    res.render('home', { title: 'My App', user: user || null });
});

router.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' });
});

export default router;
