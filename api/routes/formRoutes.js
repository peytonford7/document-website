import { Router } from 'express';
const router = Router();

router.post('/form', (req, res) => {
    console.log(req.body);
    res.send('Post Form');
});

export default router;
