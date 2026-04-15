import { Router } from 'express';
import { User, Board } from '../models/index.js';
const router = Router();

router.get('/user/:user/board/list', async (req, res) => {
    const username = req.params.user;
    const user = await User.findOne({ username });
    if (user) {
        const boardList = await Board.find({ username });
        res.render('board', { title: `${username}'s Boards`, user: user });
    } else {
        return res.status(404).send('User not found.');
    }
});
router.get('/user/:user/board/:id', async (req, res) => {
    const username = req.params.user;
    const user = await User.findOne({ username });
    if (user) {
        const boardId = req.params.id;
        const board = await Board.findOne({ username, id: boardId }).populate('panelList');
        if (board) {
            if (req.accepts('json')) return res.json(board);
            res.render('board', { title: board.title, user: user });
        } else {
            return res.status(404).send('Board not found.');
        }
    } else {
        return res.status(404).send('User not found.');
    }
});

export default router;
