import { Router } from "express";
import * as models from "../models/index.js";
import * as db from "../utils/database.js";
const router = Router();

router.get("/user/:user/board/list", async (req, res) => {
  const username = req.params.user;
  const user = await User.findOne({ username });
  if (user) {
    const boardList = await Board.find({ username });
    res.render("board", {
      title: `${username}'s Boards`,
      body: `Board List: ${boardList}`,
    });
  } else {
    return res.status(404).send("User not found.");
  }
});
router.get("/user/:user/board/:id", async (req, res) => {
  const username = req.params.user;
  const user = await User.findOne({ username });
  if (user) {
    const boardId = req.params.id;
    const board = await Board.findOne({ username, id });
    if (board) {
      res.render("board", { title: board.title, body: board });
    } else {
      return res.status(404).send("Board not found.");
    }
  } else {
    return res.status(404).send("User not found.");
  }
});

export default router;
