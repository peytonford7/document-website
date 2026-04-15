import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    res.render('home', { title: 'My App', user: { username: "peytonford22", password: "peytonford22"} });
});

router.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' });
});

export default router;
