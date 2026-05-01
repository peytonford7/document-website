import { Router } from 'express';
import { User } from '../models/index.js';
import * as db from '../utils/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const router = Router();

router.get('/admin', (req, res) => {
    res.render('admin', { title: 'Admin', user: null });
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login', user: null });
});
router.post('/login', async (req, res) => {
    const { username = '', password = '' } = req.body || {};
    if (!username || !password) {
        return res.send('* Fields Required. Please Try Again.');
    }
    console.log(`Login attempt: ${username} - ${password}`);
    try {
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.send('Invalid username or password. Please try again.');
        }
        const foundUser = await bcrypt.compare(password, existingUser.password);
        if (!foundUser) {
            return res.send('Invalid username or password. Please try again.');
        }
        const token = jwt.sign(
            { username: existingUser.username }, 
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h'}
        );
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        });
        return res.redirect('/');
    } catch (error) {
        return res.status(500).send('Error during login. Please try again.');
    }
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register', user: null });
});
router.post('/register', async (req, res) => {
    const { username = '', password = '' } = req.body || {};
    if (!username || !password) {
        return res.status(400).send('* Fields Required. Please Try Again.');
    }
    if (username.length < 8 || password.length < 8) {
        return res.status(400).send('Username and password length must be at least 8 characters. Please try again.');
    }
    console.log(`Registration attempt: ${username} - ${password}`);
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('Username already exists. Please try again.');
        }
        const user = new User({ username, password });
        await user.save();
        return res.redirect('/login');
    } catch (error) {
        return res.status(500).send('Error registering user. Please try again.');
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.redirect('/');
});

export default router;
