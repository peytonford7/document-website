import { Router } from 'express';
import { User } from '../models/index.js';
import * as db from '../utils/database.js';
import bcrypt from 'bcrypt';
const router = Router();

router.get('/admin', (req, res) => {
    res.render('admin', { title: 'Admin' });
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});
router.post('/login', async (req, res) => {
    if (req.body.username.length > 0 && req.body.password.length > 0) {
        const { username, password } = req.body;
        console.log(`Login attempt: ${username} - ${password}`);
        try {
            const existingUser = await User.findOne({ username, password });
            if (existingUser) {
                return res.send('Login successful!');
            }
            return res.send('Invalid username or password. Please try again.');
        } catch (error) {
            return res.status(500).send('Error during login. Please try again.');
        }
    } else {
        return res.send('* Fields Required. Please Try Again.');
    }
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});
router.post('/register', async (req, res) => {
    if (req.body.username.length > 0 && req.body.password.length > 0) {
        if (req.body.username.length <= 8 || req.body.password.length <= 8) {
            const { username, password } = req.body;
            console.log(`Registration attempt: ${username} - ${password}`);
            try {
                const existingUser = await User.findOne({ username });
                if (existingUser) {
                    return res.send('Username already exists. Please try again.');
                }
                const user = new User({ username, password });
                await user.save();
                return res.send('Successfully registered!');
            } catch (error) {
                return res.status(500).send('Error registering user. Please try again.');
            }
        } else {
            return res.send(
                'Username and password length must be atleast 8 characters. Please try again.'
            );
        }
    } else {
        return res.send('* Fields Required. Please Try Again.');
    }
});

router.get('/logout', (req, res) => {
    return res.send('Logged out successfully!');
});

export default router;
